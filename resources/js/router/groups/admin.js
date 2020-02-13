export default [
  {
    path: "dashboard",
    name: "admin.dashboard",
    component: () => import("@/pages/admin/Dashboard")
  },
  {
    path: "permission",
    name: "admin.permission",
    component: () => import("@/pages/admin/Permission")
  },
  {
    path: "roles",
    name: "admin.roles",
    component: () => import("@/pages/admin/Role")
  },
  {
    path: "users",
    name: "admin.users",
    component: () => import("@/pages/admin/User")
  },
  {
    path: "ratings",
    name: "admin.ratings",
    component: () => import("@/pages/admin/Rating")
  },
  {
    path: "feedbacks",
    name: "admin.feedbacks",
    component: () => import("@/pages/admin/Feedback")
  },
  {
    path: "slides",
    name: "admin.slides",
    component: () => import("@/pages/admin/Slide")
  },
  {
    path: "settings",
    name: "admin.settings",
    component: () => import("@/pages/admin/Setting")
  }
];
