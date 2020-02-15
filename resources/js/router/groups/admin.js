const Dashboard = () => import("@/pages/admin/Dashboard");
const Permission = () => import("@/pages/admin/Permission");
const Role = () => import("@/pages/admin/Role");
const User = () => import("@/pages/admin/User");
const Rating = () => import("@/pages/admin/Rating");
const Feedback = () => import("@/pages/admin/Feedback");
const Slide = () => import("@/pages/admin/Slide");
const Setting = () => import("@/pages/admin/Setting");

export default [
  {
    path: "dashboard",
    name: "admin.dashboard",
    component: Dashboard
  },
  {
    path: "permission",
    name: "admin.permission",
    component: Permission
  },
  {
    path: "roles",
    name: "admin.roles",
    component: Role
  },
  {
    path: "users",
    name: "admin.users",
    component: User
  },
  {
    path: "ratings",
    name: "admin.ratings",
    component: Rating
  },
  {
    path: "feedbacks",
    name: "admin.feedbacks",
    component: Feedback
  },
  {
    path: "slides",
    name: "admin.slides",
    component: Slide
  },
  {
    path: "settings",
    name: "admin.settings",
    component: Setting
  }
];
