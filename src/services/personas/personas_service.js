import api from "@/services/api";

export const crearPersona = async (personaData) => {
  try {
    const { data } = await api.post("/personas/", personaData);
    return data;
  } catch (error) {
    console.error("Error creando persona:", error);
    throw error;
  }
};

export const buscarRoles = async () => {
  try {
    const { data } = await api.get("/roles/");
    return data;
  } catch (error) {
    console.error("Error cargando roles:", error);
    throw error;
  }
};

export const buscarTiposDocumento = async () => {
  const res = await api.get("/tipos-documento/");
  return res.data;
};

