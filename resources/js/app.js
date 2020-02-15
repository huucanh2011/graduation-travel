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
import "./helpers/notifications";
import DateFilter from "./helpers/filter-date";

Vue.filter("date", DateFilter);
Vue.use(Vuex);

//global components
import AppDrawer from "./components/admin/AppDrawer";
Vue.component("app-drawer", AppDrawer);

window.eventBus = new Vue();

const app = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

export default app;
