<template>
    <div class="d-flex mb-3">
        <div class="col-lg-5 d-flex flex-column align-items-start p-0">
            <label for="client1" class="form-label fw-bold">Search Product</label>
            <input type="text" placeholder="Search Product" class="form-control" id="client1">
        </div>
        <div class="d-flex align-items-end">
            <button @click="search" type="button" class="btn btn-primary mx-2">Search</button>
        </div>
    </div>
    <table class="table border">
        <thead>
            <tr>
            <th scope="col"><input v-model="all" @click="select(searchList.data)" type="checkbox" class="form-check-inputx"></th>
            <th scope="col">Product Name</th>
            <th scope="col">Code</th>
            <th scope="col">Packing</th>
            <th scope="col">Unit Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in searchList.data" v-bind:key="item.id">
                <th scope="row"><input v-model="selected" v-bind:value="item" type="checkbox" class="form-check-inputx"></th>
                <td>{{item.name}}</td>
                <td>{{item.code}}</td>
                <td>{{item.packing}}</td>
                <td>{{item.unitPrice}}</td>
            </tr>
        </tbody>
    </table>
    <Pagination :page="searchList.page + 1" :limit="searchList.size" :total="searchList.total"></Pagination>
</template>

<script>
import { ref, computed } from 'vue'
import Pagination from '../components/Pagination.vue'
import { mapGetters, useStore } from 'vuex';

export default {
    name : 'ProductSearch',
    components : {
        Pagination
    },
    mounted() {
        this.fetchPatientList()
    },
    computed: {
        ...mapGetters({
            searchList : 'product/searchList',
            userCurr : 'auth/userCurr'
        })
    },
    methods: {
        fetchPatientList() {
            this.$store.dispatch('product/searchList', {size : 20, pageNo : 1})
        }
    },
    setup() {
        const selected = ref([])
        //const ids = ref([])
        const ids = computed(() => selected.value.map(({ id }) => id))
        const all = ref(false)

        const select = (list) => {
            selected.value = [];
			if (!all.value)
                selected.value = list
        }
        

        const store = useStore()
        const search = () => {
            if(selected.value.length >= 1) {
                store.dispatch('product/searchList', {size : 20, pageNo : 1})
                selected.value = []
            }
        }

        const selectOk = (action) => {
            let arr = JSON.parse(JSON.stringify(selected.value))//[...selected.value]
            console.log(arr)
            console.log(action)
            //store.dispatch(action, arr)
            selected.value = []
            return arr;
        }
        
        return { selected, ids, all, select, search, selectOk }
    }
}
</script>