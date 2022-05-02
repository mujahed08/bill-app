<template>
    <div class="d-flex my-2">
        <router-link to="/product/create" role="button" class="btn btn-success mx-2">Create</router-link>
        <button @click="edit" type="button" class="btn btn-primary mx-2">Edit</button>
        <button @click="_delete" type="button" class="btn btn-danger mx-2">Delete</button>
    </div>
    <table class="table border">
        <thead>
            <tr>
                <th scope="col"><input v-model="all" @click="select(productList.data)" type="checkbox" class="form-check-inputx"></th>
                <th scope="col">Product Name</th>
                <th scope="col">Code</th>
                <th scope="col">Packing</th>
                <th scope="col">unitPrice</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in productList.data" v-bind:key="item.id">
            <th scope="row"><input v-model="selected" v-bind:value="item" type="checkbox" class="form-check-inputx"></th>
            <td>{{item.name}}</td>
            <td>{{item.code}}</td>
            <td>{{item.packing}}</td>
            <td>{{item.unitPrice}}</td>
            </tr>
        </tbody>
    </table>
    <Pagination :page="productList.page + 1" :limit="productList.size" :total="productList.total"></Pagination>
</template>

<script>
import { ref, computed } from 'vue'
import Pagination from '../components/Pagination.vue'
import { mapGetters, useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'

export default {
    name : 'ProductList',
    components : {
        Pagination
    },
    mounted() {
        this.fetchPatientList()
    },
    computed: {
        ...mapGetters({
            productList : 'product/productList',
            userCurr : 'auth/userCurr'
        })
    },
    methods: {
        fetchPatientList() {
            this.$store.dispatch('product/list', {size : 20, pageNo : this.$route.params.page})
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
        
        const router = useRouter()
        const edit = () => {
            if(selected.value.length === 1) {
                router.push(`/product/edit/${selected.value[0]['id']}`);
            }
        }

        const store = useStore()
        const route = useRoute()
        const _delete = () => {
            if(selected.value.length === 1) {
                //const payload = {id : ids.value[0], page : store.getters['patientList']['page']}
                let id = selected.value[0]['id']
                let page = route.params.page
                store.dispatch('product/_delete', id).then(
                    () => {
                        store.dispatch('product/list', {size : 20, pageNo : page})
                    },
                    (error) => {
                        console.log(error)
                    }
                );
                selected.value = []
            }
        }
        
        return { selected, ids, all, select, edit, _delete }
    }
}
</script>