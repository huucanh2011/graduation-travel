import "./bootstrap";
import Vue from "vue";
import router from "./router";
import store from "./store";

import App from "./App.vue";

//plugins
import "./plugins/antdesign";
import "./plugins/vue-progressbar";

//helpers
import "./helpers/notifications";
import { dateFilter, statusFilter, upperCaseFilter } from "./helpers/filters";

Vue.filter("date", dateFilter);
Vue.filter("status", statusFilter);
Vue.filter("upperCase", upperCaseFilter);

//global components
// import AppDrawer from "./components/admin/AppDrawer";
// Vue.component("app-drawer", AppDrawer);

window.eventBus = new Vue();

const app = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

export default app;
