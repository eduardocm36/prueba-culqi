import { httpClient } from "@/composables/httpClient";
import { useAuthStore } from "@/store/auth";

export const axiosInterceptor = () => {
  httpClient.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("authToken");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
