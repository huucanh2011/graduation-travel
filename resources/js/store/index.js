import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import category from "./modules/category";
import dashboard from "./modules/dashboard";
import feedback from "./modules/feedback";
import permission from "./modules/permission";
import rating from "./modules/rating";
import role from "./modules/role";
import slide from "./modules/slide";
import tour from "./modules/tour";
import user from "./modules/user";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth,
    category,
    dashboard,
    feedback,
    permission,
    rating,
    role,
    slide,
    tour,
    user
  },
  strict: debug
});
