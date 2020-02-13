import "./bootstrap";
import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import store from "./store";

import App from "./App.vue";

//plugins
import "./plugins/antdesign";
import "./plugins/vue-progressbar";

//helpers
import "./helpers/notification.config";
import DateFilter from "./helpers/filterdate";

Vue.filter("date", DateFilter);
Vue.use(Vuex);

window.eventBus = new Vue();

const app = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

export default app;
