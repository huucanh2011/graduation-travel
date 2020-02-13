import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import routes from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes
});

export default router

async function checkInfo(to, from, next) {
  await store.dispatch("authentication/CHECK_AUTH");
  next();
}
