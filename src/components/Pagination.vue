<template>
    <nav aria-label="...">
        <ul class="pagination justify-content-center pagination-lg">
            <li class="page-item" :class="{'disabled': page === 1}">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true" @click="paginate(page - 1)">Previous</a>
            </li>
            <li class="page-item" v-if="page != 1"><a  @click="paginate(page - 1)" class="page-link">{{page - 1}}</a></li>
            <li class="page-item active" aria-current="page">
            <a class="page-link">{{page}}</a>
            </li>
            <li class="page-item" v-if="page != last"><a @click="paginate(page + 1)" class="page-link">{{page + 1}}</a></li>
            <li class="page-item" :class="{'disabled': page === last}">
                <a @click="paginate(page + 1)" class="page-link">Next</a>
            </li>
        </ul>
    </nav>
</template>
<style>
a:hover {
  cursor:pointer;
 }
</style>

<script>
export default {
    name : 'Pagination',
    props : ['page', 'total', 'limit'],
    computed : {
        last() {
            var n = Math.trunc(this.total / this.limit) + 1
            console.log(n)
            return n;
        }
    },
    methods: {
        paginate(page) {
            this.$router.push({ params: {page : page} })
        }
    }
}
</script>