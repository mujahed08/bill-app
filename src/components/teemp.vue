<template>
<div class="my-3 font-monospace card">
  <h3 class="text-start card-header">Product </h3>
<div class="card-body">
<h5 class="text-start card-title">Create Product </h5>
<div class="container">
    <form @submit.prevent="submit" class="needs-validation row g-5" novalidate>
      <div class="col-lg-6 d-flex flex-column align-items-start">
        <label for="summary" class="form-label fw-bold">Summary</label>
        <input  v-model="state.summary" :class="{ 'is-invalid' : v$.name.$error}" type="text" placeholder="Patient Name" class="form-control" id="name">
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback text-start" v-if="v$.summary.$error">Summary is required</div>
      </div>

      
    
    <div class="col-lg-3 col-md-4 col-sm-6 d-flex flex-column align-items-start">
      <label for="age_in" class="form-label fw-bold">Age In</label>
      <select v-model="state.age_in" :class="{ 'is-invalid' : v$.age_in.$error}" class="form-select" id="age_in">
        <option selected disabled value="">Choose...</option>
        <option>Days</option>
        <option>Months</option>
        <option>Years</option>
      </select>
      <div class="invalid-feedback text-start" v-if="v$.age_in.$error">
        Please select a valid Age In
      </div>
    </div>

    <div class="col-lg-2 col-md-4 col-sm-4 d-flex flex-column align-items-start">
      <label for="gender" class="form-label fw-bold">Gender</label>
      <select v-model="state.gender" class="form-select" id="gender" >
        <option selected disabled value="">Choose...</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <div class="invalid-feedback">
        Please select Gender
      </div>
    </div>

    <div class="col-lg-2 col-md-2 col-sm-3 d-flex flex-column align-items-start">
      <label for="country_code" class="form-label fw-bold">India</label>
      <input v-model="state.country_code" type="text" placeholder="Code" class="form-control" id="country_code">
    </div>
    <div class="col-lg-3 col-md-4 col-sm-5 d-flex flex-column align-items-start">
      <label for="mobile_no" class="form-label fw-bold">Mobile No</label>
      <div class="input-group has-validation">
        <span class="input-group-text" id="inputGroupPrepend">@</span>
        <input v-model="state.mobile_no" type="text" placeholder="Mobile Number" class="form-control" id="mobile_no" aria-describedby="inputGroupPrepend">
        
      </div>
    </div>
    
    
    <div class="col-lg-5 col-md-6 d-flex flex-column align-items-start">
      <label for="address" class="form-label fw-bold">Address</label>
      <textarea v-model="state.address" placeholder="Address" class="form-control" id="address"></textarea>
    </div>

    <div class="col-lg-3 col-md-4 col-sm-6 d-flex flex-column align-items-start">
        <label for="age" class="form-label fw-bold">Age</label>
        <input v-model="state.age" :class="{ 'is-invalid' : v$.age.$error}" type="text" placeholder="Age" class="form-control" id="age">
        <div class="invalid-feedback text-start" v-if="v$.age.$error">
            Age is required
        </div>
      </div>
    
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
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name : 'ProductCreate',
  setup () {
    const state = reactive({
      name: '',
      age: '',
      age_in: '',
      gender: '',
      conutry_code : '+91',
      mobile_no : '',
      address : ''
    })
    const rules = {
      name: { required }, // Matches state.firstName
      age: { required }, // Matches state.lastName
      age_in: {required},
      gender : {required}
    }

    const v$ = useVuelidate(rules, state)

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
      this.$store.dispatch('CREATE_PATIENT', {...this.state, app_id:100});
    }
  }
}
</script>