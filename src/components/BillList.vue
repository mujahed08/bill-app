<template>
    <div class="d-flex my-2">
        <router-link to="/bill/create" role="button" class="btn btn-success mx-2">Create</router-link>
        <button @click="edit" type="button" class="btn btn-primary mx-2">Edit</button>
        <button @click="_delete" type="button" class="btn btn-danger mx-2">Delete</button>
    </div>
    <table class="table border">
        <thead>
            <tr>
                <th scope="col"><input v-model="all" @click="select(billList.data)" type="checkbox" class="form-check-inputx"></th>
                <th scope="col">Vendor</th>
                <th scope="col">Name</th>
                <th scope="col">Mobile No</th>
                <th scope="col">Discount</th>
                <th scope="col">Gross Price</th>
                <th scope="col">Net Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in billList.data" v-bind:key="item.id">
            <th scope="row"><input v-model="selected" v-bind:value="item" type="checkbox" class="form-check-inputx"></th>
            <td>{{item.name}}</td>
            <td>{{item.client}}</td>
            <td>{{item.mobileNo}}</td>
            <td>{{item.discount}}</td>
            <td>{{item.gross}}</td>
            <td>{{item.net}}</td>
            </tr>
        </tbody>
    </table>
    <Pagination :page="billList.page + 1" :limit="billList.size" :total="billList.total"></Pagination>
</template>

<script>
import { ref, computed } from 'vue'
import Pagination from '../components/Pagination.vue'
import { mapGetters, useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'

export default {
    name : 'BillList',
    components : {
        Pagination
    },
    mounted() {
        this.fetchBillList()
    },
    computed: {
        ...mapGetters({
            billList : 'bill/billList',
            userCurr : 'auth/userCurr'
        })
    },
    methods: {
        fetchBillList() {
            this.$store.dispatch('bill/list', {size : 20, pageNo : this.$route.params.page})
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
                router.push(`/bill/edit/${selected.value[0]['id']}`);
            }
        }

        const store = useStore()
        const route = useRoute()
        const _delete = () => {
            if(selected.value.length === 1) {
                //const payload = {id : ids.value[0], page : store.getters['patientList']['page']}
                let id = selected.value[0]['id']
                let page = route.params.page
                store.dispatch('bill/_delete', id).then(
                    () => {
                        store.dispatch('bill/list', {size : 20, pageNo : page})
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