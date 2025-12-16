import api from "@/services/api";

export const crearUsuario = async (usuarioData) => {
  try {
    const { data } = await api.post("/usuarios/", usuarioData);
    return data;
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};

export const getUsuarios = async () => {
  const res = await api.get("/usuarios/");
  return res.data;
};
