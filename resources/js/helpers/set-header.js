import axios from "axios";
import { getToken } from "./jwt.service";

export const setHeader = () => {
  axios.defaults.headers.common["Content-Type"] = "application/json";

  axios.defaults.headers.common["Accept"] = "application/json";

  axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
};
