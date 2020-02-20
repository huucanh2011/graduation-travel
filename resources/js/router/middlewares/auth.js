import store from "@/store";
import { vp } from "@/helpers/tools";

export default router => {
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
};
