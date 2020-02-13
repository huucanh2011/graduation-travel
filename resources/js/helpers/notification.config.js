import { vp } from "./prototype";

vp.$notification.config({
  placement: "bottomLeft",
  bottom: "25px",
  duration: 4
});

window.notification = vp.$notification;
