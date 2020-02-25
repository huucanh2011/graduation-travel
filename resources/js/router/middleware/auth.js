import store from "@/store";
import { vp } from "@/helpers/tools";

export default function RedirectIfAuthenticated(router) {
  router.beforeEach((to, from, next) => {
    let meta = to.matched.some(record => record.meta.auth);
    let user = store.state.auth.user;

    if (meta && !user) {
      next({ name: "login" });
      vp.$message.error("This page requires authentication");
    } else {
      next();
    }
  });
}
