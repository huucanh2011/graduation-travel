export default [
  {
    path: "",
    name: "home",
    component: () => import("@/pages/user/Home")
  },
  {
    path: "/tours",
    name: "tour.index",
    component: () => import("@/pages/user/Tour")
  },
  {
    path: "/companies",
    name: "company.index",
    component: () => import("@/pages/user/Company")
  }
];
