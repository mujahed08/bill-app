<template>
<div class="my-3 font-monospace card">
  <h3 class="text-start card-header">Product</h3>
  <div class="card-body">
    <h5 class="text-start card-title">Edit Product </h5>
    <div class="container">
    <form @submit.prevent="submit" class="needs-validation row g-5" novalidate>
        <div class="col-lg-6 d-flex flex-column align-items-start">
            <label for="name" class="form-label fw-bold">Product Name</label>
            <input  v-model="state.name" :class="{ 'is-invalid' : v$.name.$error}" type="text" placeholder="Product Name" class="form-control" id="name">
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback text-start" v-if="v$.name.$error">Name is required</div>
        </div>

        <div class="col-lg-6 d-flex flex-column align-items-start">
            <label for="code" class="form-label fw-bold">Product Code</label>
            <input  v-model="state.code" :class="{ 'is-invalid' : v$.code.$error}" type="text" placeholder="Product Code" class="form-control" id="code">
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback text-start" v-if="v$.name.$error">Product Code is required</div>
        </div>

        <div class="col-lg-6 col-md-4 col-sm-6 d-flex flex-column align-items-start">
            <label for="packing" class="form-label fw-bold">Packing</label>
            <select v-model="state.packing" :class="{ 'is-invalid' : v$.packing.$error}" class="form-control" id="packing">
                <option selected disabled value="">Select...</option>
                <option>Box</option>
                <option>Unit</option>
                <option>Bag</option>
                <option>Carton</option>
                <option>Dozen</option>
            </select>
            <div class="invalid-feedback text-start" v-if="v$.packing.$error">
                Please select packing
            </div>
        </div>

        <div class="col-lg-3 d-flex flex-column align-items-start">
            <label for="qty" class="form-label fw-bold">Quantity</label>
            <input  v-model="state.qty" :class="{ 'is-invalid' : v$.qty.$error}" type="number" placeholder="Quantity" class="form-control" id="qty">
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback text-start" v-if="v$.qty.$error">Quantity is required</div>
        </div>

        <div class="col-lg-3 d-flex flex-column align-items-start">
            <label for="unitPrice" class="form-label fw-bold">Unit Price</label>
            <input  v-model="state.unitPrice" :class="{ 'is-invalid' : v$.unitPrice.$error}" type="number" placeholder="unitPrice" class="form-control" id="unitPrice">
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback text-start" v-if="v$.unitPrice.$error">unitPrice is required</div>
        </div>

        <div class="col-lg-3 d-flex flex-column align-items-start">
            <label for="discount" class="form-label fw-bold">Discount</label>
            <input  v-model="state.discount" :class="{ 'is-invalid' : v$.discount.$error}" type="number" placeholder="discount" class="form-control" id="discount">
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback text-start" v-if="v$.discount.$error">discount is required</div>
        </div>

        <div class="col-lg-3 d-flex p-4">
            <input  v-model="state.enableDiscount" type="checkbox" placeholder="enableDiscount" class="form-check-inputx m-3" id="enableDiscount">
            <label for="enableDiscount" class="form-check-labelx fw-bold my-2 py-1">Enable Discount</label>
        </div>

        <!-- <div class="col-lg-3 d-flex flex-column align-items-start">
            <label for="gross" class="form-label fw-bold">Gross Price</label>
            <input  v-model="state.gross" type="number" placeholder="discount" class="form-control" id="gross">
        </div>

        <div class="col-lg-3 d-flex flex-column align-items-start">
            <label for="net" class="form-label fw-bold">Net Price</label>
            <input  v-model="state.net" type="number" placeholder="discount" class="form-control" id="net">
        </div> -->
    
        <div class="col-12">
            <div class="row">
                <div class="col-6 d-flex flex-column align-items-end"><button class="btn btn-primary" type="submit">Submit form</button></div>
                <div class="col-6 d-flex flex-column align-items-start"><button class="btn btn-danger" type="button">Cancel</button></div>
            </div>
        </div>
    
    </form>
</div>
</div>
</div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapGetters } from 'vuex';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name : 'ProductEdit',
  computed: {
    ...mapGetters({
            product : 'product/product',
            userCurr : 'auth/userCurr'
        })
  },
  setup () {
    const state = ref({})
    const rules = {
      name: { required },
      code: { required },
      packing: {required},
      qty : {required},
      unitPrice : {required},
      discount : {required}
    }

    const v$ = useVuelidate(rules, state)

    const setState = newstate => {
      state.value = newstate
    }

    const store = useStore()
    const route = useRoute()
    onMounted(() => {
      console.log('mounted!')
      store.dispatch('product/get', route.params.id)
    })

    watch(() => store.getters['product/product'], function() {
      console.log('value changes detected');
      setState(store.getters['product/product'])
    });

    return { state, v$ }
  },
  methods: {
    async submit () {
      const result = await this.v$.$validate()
      console.log(result)
      if (!result) {
        return
      }
      // console.log(this.$v)
      this.$store.dispatch('product/update', {...this.state}).then(
        () => {
          this.$router.push("/product/list/1");
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }
}
</script>