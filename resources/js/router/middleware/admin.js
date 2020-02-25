import store from "@/store";
import { vp } from "@/helpers/tools";

export default function RedirectIfAuthenticated(router) {
  router.beforeEach((to, from, next) => {
    let meta = to.matched.some(record => record.meta.admin);
    let user = store.state.auth.user;

    if (meta && !user) {
      next({ name: "login" });
    } else {
      if (meta && user && user.role_slug !== "admin") {
        next({ name: "home" });
        vp.$message.error("This page requires you is admin");
      } else {
        next();
      }
    }
  });
}
