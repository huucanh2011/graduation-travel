import admin from "./groups/admin";
import user from "./groups/user";

export default [
  {
    path: "/admin/",
    component: () => import("@/layouts/AdminLayout"),
    meta: { auth: true },
    children: [...admin]
  },
  {
    path: "/",
    component: () => import("@/layouts/UserLayout"),
    children: [...user]
  },
  {
    path: "/login",
    name: "login",
    meta: { guest: true },
    component: () => import("@/components/auth/Login")
  },
  {
    path: "/register",
    name: "register",
    meta: { guest: true },
    component: () => import("@/components/auth/Register")
  },
  {
    path: "/forgot-password",
    name: "forgotpassword",
    meta: { guest: true },
    component: () => import("@/components/auth/ForgotPassword")
  },
  {
    path: "/response-password-reset/token=:token",
    name: "resetpassword",
    meta: { guest: true },
    component: () => import("@/components/auth/ResetPassword")
  },
  {
    path: "*",
    component: () => import("@/pages/exception/404")
  }
];
