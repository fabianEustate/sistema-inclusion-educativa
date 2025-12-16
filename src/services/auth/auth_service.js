import Cookies from "js-cookie";
import api from "../api";

export const loginService = async (email, password) => {
  const { data } = await api.post("/auth/login", {
    nombre_usuario: email,
    contrasenia: password,
  });
  console.log("LOGIN RESPONSE:", data); // 🔥 AGREGA ESTO

  if (!data?.token_acceso) {
    throw new Error("No se pudo obtener el token de autenticación.");
  }
  // Guardar tokens en cookies accesibles por middleware
  Cookies.set("accessToken", data.token_acceso, { path: "/" });
  Cookies.set("refreshToken", data.token_renovacion, { path: "/" });
  Cookies.set("userRole", data.rol_usuario, { path: "/" });

  return data;
};


// OBTENER PERFIL AUTENTICADO
export const getPerfil = async () => {
  const { data } = await api.get("/auth/perfil").catch(err => console.log("ERROR PERFIL:", err));
//api.get("/auth/perfil");
  return data;
};

// LOGOUT
export const logoutService = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  Cookies.remove("accessToken");
  Cookies.remove("userRole");

  window.location.href = "/login";
};

// Renovar token (opcional si el backend lo soporta)
export const refreshTokenService = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const { data } = await api.post("/auth/refresh", {
    token_renovacion: refreshToken,
  });

  localStorage.setItem("accessToken", data.token_acceso);

  return data;
};
