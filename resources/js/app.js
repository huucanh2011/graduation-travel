import "./bootstrap";

import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import store from "./store";

import App from './App.vue'
//layouts
// import User from "./layouts/User";
// import Admin from "./layouts/Admin";

//plugins
import "./plugins/antdesign";

Vue.use(Vuex);

window.eventBus = new Vue()

const app = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

export default app;
