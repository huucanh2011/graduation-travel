import Vue from "vue";
import VueRouter from "vue-router";
import { sync } from "vuex-router-sync";
import routes from "./routes";
import store from "@/store";
import globalMiddleware from "./middleware/global-middleware";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes
});

sync(store, router);
globalMiddleware(router);

export default router;
