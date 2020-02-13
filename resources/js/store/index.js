import Vue from "vue";
import Vuex from "vuex";

import role from "./modules/role";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    role
  },
  strict: debug
});
