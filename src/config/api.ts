import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: DEVELOPMENT ? "http://localhost:3000" : "/api/",
  timeout: 10000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const logError = (error: any) => {
  if (error?.response?.data?.message) {
    toast.error(error.response.data.message);
  } else if (error?.response?.data?.error) {
    toast.error(error.response.data.error);
  }
};

api.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (!["account", "users/login"].includes(error.response?.config.url)) {
        toast.error("Non si detengono i privilegi necessari.");
        // return Promise.reject(error);
      } else {
        logError(error);
      }
    } else if (error.response?.status === 403) {
      if (!["account"].includes(error.response?.config.url)) {
        toast.error("Non si detengono i privilegi necessari.");
        // return Promise.reject(error);
      }
    } else if (error?.response?.status === 404) {
      toast.error("Not found");
    } else {
      logError(error);
    }

    return Promise.reject(error);
  }
);

export default api;
