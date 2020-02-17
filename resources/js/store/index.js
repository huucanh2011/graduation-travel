import Vue from "vue";
import Vuex from "vuex";

import role from "./modules/role";
import user from "./modules/user";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    role,
    user
  },
  strict: debug
});
