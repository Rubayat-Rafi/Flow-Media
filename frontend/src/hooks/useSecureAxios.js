import axios from "axios";
import { useEffect } from "react";

const secureAxios = axios.create({
  baseURL: import.meta.env.VITE_FLOW_MRDIA_API,
  withCredentials: true,
});

let interceptorsAdded = false;

const useSecureAxios = () => {
  useEffect(() => {
    if (!interceptorsAdded) {
      secureAxios.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("access-token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      secureAxios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            console.warn("Unauthorized - maybe redirect to login?");
            // Optional: toast.error("Please login again");
          }
          return Promise.reject(error);
        }
      );

      interceptorsAdded = true; // Prevent multiple setup
    }
  }, []);

  return secureAxios;
};

export default useSecureAxios;
