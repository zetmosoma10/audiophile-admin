import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/admin`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token-audio-admin");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      //* No response means network issue or server is completely down
      toast.error("Cannot connect to the server. Please check your internet.");
    } else if (error.response.status >= 500) {
      //* Server returned a 5xx error
      toast.error("Server is down. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
