import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
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

api.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (["account"].includes(error.response.config.url)) {
      return Promise.reject(error);
    }

    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error?.response?.data?.error) {
      toast.error(error.response.data.error);
    } else if (error?.response?.status === 404) {
      toast.error("Not found");
    }

    return Promise.reject(error);
  }
);

export default api;
