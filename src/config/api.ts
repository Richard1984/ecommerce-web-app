import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
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
