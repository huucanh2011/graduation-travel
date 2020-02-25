import globalAuth from "./global-auth";
import guest from "./guest";
import auth from "./auth";
import admin from "./admin";

export default router => {
  globalAuth(router);
  guest(router);
  auth(router);
  admin(router);
};
