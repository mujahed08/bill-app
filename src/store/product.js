import ProductService from '../services/product-service'
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  productList : {
    'data' : [],
    'page' : 0,
    'total' : 0
  },
  product : {},
  searchList : {
    'data' : [],
    'page' : 0,
    'total' : 0
  }
}

export const product = {
  namespaced: true,
  state: initialState,
  actions: {
    list({ commit }, page) {
      return ProductService.list(page).then(
        pg => {
          commit('listSuccess', pg);
          return Promise.resolve(pg);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    create({ commit }, payload) {
      return ProductService.create(payload).then(
         res => {
            commit('httpSuccess', res)
            return Promise.resolve(res);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    get({ commit }, id) {
      return ProductService.get(id).then(
         res => {
            commit('getSuccess', res.data)
            return Promise.resolve(res);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    update({ commit }, payload) { 
      return ProductService.update(payload).then(
         res => {
            commit('httpSuccess', res)
            return Promise.resolve(res);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    _delete({ commit }, id) {
      return ProductService._delete(id).then(
         res => {
            commit('httpSuccess', res.data)
            return Promise.resolve(res);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    searchList({ commit }, page) {
      return ProductService.list(page).then(
        pg => {
          commit('searchSuccess', pg);
          return Promise.resolve(pg);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    listSuccess(state, pg) {
      state.productList = pg.data;
    },
    getSuccess(state, data) {
      state.product = data;
    },
    httpSuccess(res) {
      console.log(user)
      console.log(res)
    },
    searchSuccess(state, pg) {
      state.searchList = pg.data;
    }
  },
  getters : {
    productList(state) {
      return state.productList
    },
    product(state) {
      return state.product
    },
    searchList(state) {
      return state.searchList
    }
  }
};