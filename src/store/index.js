import { createStore } from "vuex";
import { auth } from "./auth.module";
import { product } from "./product";
import { bill } from "./bill";

const store = createStore({
  modules: {
    auth,
    product,
    bill
  },
});

export default store;
