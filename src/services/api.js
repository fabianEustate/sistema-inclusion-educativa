import axios from "axios";
import Cookies from "js-cookie";
import { refreshTokenService } from "./auth/auth_service";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" }
});

// ➤ 1. Agregar automáticamente el Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ➤ 2. Manejar expiración del token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && 
        !originalRequest._retry) {

      originalRequest._retry = true;

      try {
        const newTokens = await refreshTokenService();
        Cookies.set("accessToken", newTokens.token_acceso, { path: "/" });

        originalRequest.headers.Authorization = `Bearer ${newTokens.token_acceso}`;

        return api(originalRequest);

      } catch (e) {
        // Token definitivamente inválido
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userRole");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


export default api;
