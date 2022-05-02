import BillService from '../services/bill-service'
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  selected : [],
  bill : {},
  billList : {
    'data' : [],
    'page' : 0,
    'total' : 0
  }
}

export const bill = {
  namespaced: true,
  state: initialState,
  actions: {
    list({ commit }, page) {
      return BillService.list(page).then(
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
      return BillService.create(payload).then(
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
      return BillService.get(id).then(
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
      return BillService.update(payload).then(
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
      return BillService._delete(id).then(
         res => {
            commit('httpSuccess', res.data)
            return Promise.resolve(res);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    selectProduct({ commit }, selection) {
      return new Promise(resolve => {
          console.log(selection)
          commit('selected', selection)
          resolve(selection)
      })
    }
  },
  mutations: {
    listSuccess(state, pg) {
      state.billList = pg.data;
    },
    getSuccess(state, data) {
      state.bill = data;
    },
    httpSuccess(res) {
      console.log(user)
      console.log(res)
    },
    selected(state, selection) {
      state.selected = selection;
    }
  },
  getters : {
    billList(state) {
      return state.billList
    },
    bill(state) {
      return state.bill
    },
    selected(state) {
      return state.selected
    }
  }
};