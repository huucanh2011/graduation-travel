import store from "@/store";

export default router => {
  router.beforeEach((to, from, next) => {
    let meta = to.matched.some(record => record.meta.guest);
    let user = store.getters.auth.user;

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
};
