import axios from "axios";
import { getJWT } from "./utils/handleJWT";

const configureInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getJWT();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default configureInterceptor
