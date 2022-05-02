import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import ProductList from "./components/ProductList.vue";
import ProductCreate from "./components/ProductCreate.vue";
import ProductEdit from "./components/ProductEdit.vue";
import BillCreate from './components/BillCreate.vue'
import BillList from './components/BillList.vue'
import BillEdit from './components/BillEdit.vue'
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/product/list/:page",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/product/create",
    name: "ProductCreate",
    component: ProductCreate,
  },
  {
    path: "/product/edit/:id",
    name: "ProductEdit",
    component: ProductEdit,
  },
  {
    path: "/bill/create",
    name: "BillCreate",
    component: BillCreate,
  },
  {
    path: "/bill/list/:page",
    name: "BillList",
    component: BillList,
  },
  {
    path: "/bill/edit/:id",
    name: "BillEdit",
    component: BillEdit,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;