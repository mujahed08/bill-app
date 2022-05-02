<template>
<div class="my-3 font-monospace card">
  <h3 class="text-start card-header">Bill </h3>
<div class="card-body">
<h5 class="text-start card-title">Edit Bill </h5>
<div class="container">
    <form @submit.prevent="submit" class="needs-validation row g-5" novalidate>
      
        <div class="col-lg-6 d-flex flex-column align-items-start mb-3">
            <label for="name" class="form-label fw-bold">Vendor</label>
            <input  v-model="state.name" :class="{ 'is-invalid' : v$.name.$error}" type="text" placeholder="Vendor" class="form-control" id="name">
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback text-start" v-if="v$.name.$error">Vendor is required</div>
        </div>

        <div class="col-lg-4 d-flex flex-column align-items-start">
            <label for="client" class="form-label fw-bold">Name</label>
            <input  v-model="state.client" type="text" placeholder="Name" class="form-control" id="client">
        </div>

        <div class="col-lg-3 d-flex flex-column align-items-start">
            <label for="client" class="form-label fw-bold">Mobile No</label>
            <input  v-model="state.mobileNo" type="text" placeholder="Client Name" class="form-control" id="client">
        </div>

        <div class="col-lg-1 d-flex flex-column align-items-start">
            <label for="discount" class="form-label fw-bold">Discount</label>
            <input  v-model="state.discount"  type="number" placeholder="discount" class="form-control" id="discount">
        </div>

        <div class="col-lg-2 d-flex flex-column align-items-start">
            <label for="gross" class="form-label fw-bold">Gross Price</label>
            <input  :value="state.gross" type="number" readonly="readonly" placeholder="discount" class="form-control" id="gross">
        </div>

        <div class="col-lg-2 d-flex flex-column align-items-start">
            <label for="net" class="form-label fw-bold">Net Price</label>
            <input  :value="state.net" type="number" readonly="readonly" placeholder="Net" class="form-control" id="net">
        </div>

        <div class="col-12 mt-4 d-flex p-1" v-for="(input, index) in state.products" :key="index"
          :set="v = v$.products.$each.$response.$data[index]" >
            <div class="col-lg-4 d-flex flex-column align-items-start">
                <label :for="'name_' + index" class="form-label fw-bold">Product Name</label>
                <input type="text" readonly="readonly" :value="input.name + '-' + input.code" placeholder="Product Name" class="form-control" :id="'name_' + index">
            </div>

            <div class="col-lg-2 d-flex flex-column align-items-start">
                <label :for="'qty_' + index" class="form-label fw-bold">Quantity</label>
                <input type="number" v-model="input.qty" :class="{ 'is-invalid' : v.qty.$error && v$.products.$dirty}" placeholder="Quantity" class="form-control" :id="'qty_' + index">
                <div v-if="v.qty.$error  && v$.products.$dirty" class="invalid-feedback text-start">Quantity is required</div>
            </div>

            <div class="col-lg-2 d-flex flex-column align-items-start">
                <label :for="'packing_' + index" class="form-label fw-bold">Packing</label>
                <input type="text" :value="input.packing" readonly="readonly" placeholder="Packing" class="form-control" :id="'packing_' + index">
            </div>

            <div class="col-lg-2 d-flex flex-column align-items-start">
                <label :for="'unitPrice_' + index" class="form-label fw-bold">Unit Price</label>
                <input type="number" v-model="input.unitPrice" :class="{ 'is-invalid' : v.unitPrice.$error && v$.products.$dirty}" placeholder="Unit Price" class="form-control" :id="'unitPrice_' + index">
                <div v-if="v.unitPrice.$error  && v$.net.$dirty" class="invalid-feedback text-start">Unit Price is required</div>
            </div>

            <div class="col-lg-2 d-flex flex-column align-items-start">
                <label :for="'net_' + index" class="form-label fw-bold">Amount</label>
                <input type="number" :value="input.net" readonly="readonly" placeholder="Net Price" class="form-control" :id="'net_' + index">
            </div>
            <div class="col-lg-1 d-flex align-items-end">
              <a class="py-2 text-danger" @click="removeProduct(index)"><font-awesome-icon icon="trash-alt" /></a>
            </div>
        </div>

        <div class="col-12 p-0 d-flex">
          <a class="nav-link active" @click="modalJquery">
            <font-awesome-icon icon="sign-in-alt" /> Add Products 
          </a>
          
        </div>
    
        <div class="col-12 mt-4">
            <div class="row">
                <div class="col-6 d-flex flex-column align-items-end"><button class="btn btn-primary" type="submit">Submit form</button></div>
                <div class="col-6 d-flex flex-column align-items-start"><button class="btn btn-danger" type="button">Cancel</button></div>
            </div>
        </div>
    </form>
</div>
</div>
</div>
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <!-- <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> -->
      <div class="modal-body">
        <ProductSearch ref="productSearch"></ProductSearch>
      </div>
      <div class="modal-footer">
        <button type="button" @click="xmodalJquery" class="btn btn-primary">Select</button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import { reactive, ref, watch, onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { mapGetters, useStore } from 'vuex';
import { useRoute } from 'vue-router'
import ProductSearch from './ProductSearch.vue'
import $ from 'jquery'

export default {
  name : 'BillCreate',
  components : {
    ProductSearch
  },
  computed: {
    ...mapGetters({
            bill : 'bill/bill',
            selected : 'bill/selected',
        })
  },
  setup () {
    const state = reactive({
      name: '',
      client: '',
      discount : 0.0,
      gross : 0.0,
      net : 0.0,
      products : []
    })
    const rules = {
      name: { required },
      products : {
        $each : helpers.forEach({
          qty: { required },
          unitPrice: { required },
          net : {required}
        })
      }
    }

    const v$ = useVuelidate(rules, state)

    const setState = newstate => {
        state.id = newstate.id
        state.updatedAt = newstate.updatedAt
        state.name =  newstate.name
        state.client = newstate.client
        state.discount = newstate.discount
        state.gross = newstate.gross
        state.net = newstate.net
        state.products = newstate.products
    }

    const store = useStore()
    const route = useRoute()
    onMounted(() => {
      console.log('mounted!')
      store.dispatch('bill/get', route.params.id)
    })

    watch(() => store.getters['bill/bill'], function() {
      console.log('value changes detected');
      setState(store.getters['bill/bill'])
    });

    watch(() => state.discount, function(discount) {
      console.log('value changes detected in state.discount');
      state.net = state.gross - (state.gross * discount / 100)
    });

    watch(() => state.products, function(changed) {
      console.log('value changes detected in state.products');
      let gross = 0;
      changed.forEach(prd => {
        if(prd.qty * prd.unitPrice != prd.net) {
          prd.net = prd.qty * prd.unitPrice
        }
        gross = gross + Number(prd.net)
      })
      state.gross = gross;
      state.net = gross - (gross * state.discount / 100)
    }, { deep: true });


    const removeProduct = (index) => {
      state.products.splice(index, 1)
    } 

    const modalJquery = () => {
        console.log('Modal invoked')
        var options = {
        'backdrop' : 'static'
        }
        $('#staticBackdrop').modal(options);
    }

    const xmodalJquery = () => {
        console.log('Modal Close')
        var selections = productSearch.value.selectOk('bill/selectProduct');
        console.log(selections);
        $('#staticBackdrop').modal('toggle');
        let existingIds = state.products.map(({ id }) => id)
        selections.forEach(prd => {
          if(existingIds.indexOf(prd.id) === -1) {
            state.products.push(prd);
          }
        })
        //state.products.push(...selections)

        console.log(state.products);
    }

    const productSearch = ref(null)

    return { state, v$, modalJquery, xmodalJquery, productSearch, removeProduct }
  },
  methods: {
    async submit () {
      const result = await this.v$.$validate()
      console.log(result)
      if (!result) {
        return
      }
      // console.log(this.$v)
      this.$store.dispatch('bill/update', {...this.state}).then(
        () => {
          this.$router.push("/bill/list/1");
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }
}
</script>