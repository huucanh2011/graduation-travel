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
import { dateFilter, statusFilter, upperCaseFilter, tagColorFilter } from "./helpers/filters";

Vue.filter("date", dateFilter);
Vue.filter("status", statusFilter);
Vue.filter("upperCase", upperCaseFilter);
Vue.filter("tagColor", tagColorFilter);

window.eventBus = new Vue();

Vue.prototype.$actionWithLoading = async function (action, loadingVariable = 'loading', ...arg) {
  this[loadingVariable] = true
  try {
    await action(...arg)
  } catch (e) {
    throw e // so that the error can be caught above
  } finally {
    this[loadingVariable] = false
  }
}

const app = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

export default app;
