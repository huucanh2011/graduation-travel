import AdminLayout from "@/layouts/AdminLayout";
import UserLayout from "@/layouts/UserLayout";
import PageNotFound from "@/pages/exception/404";

import admin from "./groups/admin";
import user from "./groups/user";

export default [
  {
    path: "/admin/",
    component: AdminLayout,
    children: [...admin]
  },
  {
    path: "/",
    component: UserLayout,
    children: [...user]
  },
  {
    path: "*",
    component: PageNotFound
  }
];
