import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
import { vp } from "@/helpers/tools";
// import "./middlewares/auth";
// import "./middlewares/guest";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes
});

router.beforeEach(async (to, from, next) => {
  let token = store.state.auth.token;
  let user = store.state.auth.user;

  try {
    !user && token && (await store.dispatch("auth/me"));
  } catch (e) {
    console.error(e);
  }

  next();
});

router.beforeEach((to, from, next) => {
  let meta = to.matched.some(record => record.meta.auth);
  let user = store.state.auth.user;

  if (meta && !user) {
    next({ name: "login" });
    vp.$message.warning("This page requires authentication");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  let meta = to.matched.some(record => record.meta.guest);
  let user = store.state.auth.user;

  if (meta && user) {
    if (from.fullPath) {
      next(false);
    } else {
      next({ name: "home" });
    }
  } else {
    next();
  }
});

export default router;
