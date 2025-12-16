import api from "../api";

export const getUserProfile = async () => {
  const { data } = await api.get("/auth/perfil");
  return data;
};
