// services/eventos/eventos_service.js
import api from "@/services/api";

const estudianteService = {
 

  getEstudiantes: async () => {
    const res = await api.get("/estudiantes/listar-todos");
    return res.data;
  },

};

export default estudianteService;
