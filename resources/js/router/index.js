import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",

  linkActiveClass: "active",

  routes: [
    {
      path: "/admin/",
      component: () => import("../layouts/AdminLayout"),
      children: [
        {
          path: "dashboard",
          name: "admin.dashboard",
          component: () => import("../pages/admin/Dashboard")
        },
        {
          path: "permission",
          name: "admin.permission",
          component: () => import("../pages/admin/Permission")
        },
        {
          path: "roles",
          name: "admin.roles",
          component: () => import("../pages/admin/Role")
        },
        {
          path: "partners",
          name: "admin.partners",
          component: () => import("../pages/admin/Partner")
        },
        {
          path: "users",
          name: "admin.users",
          component: () => import("../pages/admin/User")
        },
        {
          path: "ratings",
          name: "admin.ratings",
          component: () => import("../pages/admin/Rating")
        },
        {
          path: "settings",
          name: "admin.settings",
          component: () => import("../pages/admin/Setting")
        },
      ]
    }
  ]
});

async function checkInfo(to, from, next) {
  await store.dispatch("authentication/CHECK_AUTH");
  next();
}
