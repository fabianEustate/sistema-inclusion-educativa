// services/eventos/eventos_service.js
import api from "@/services/api";

const eventosService = {
  crearEvento: async (data) => {
    const res = await api.post("/eventos/", data);
    return res.data;
  },

  getEventos: async () => {
    const res = await api.get("/eventos/");
    return res.data;
  },

  getEventoById: async (id) => {
    const res = await api.get(`/eventos/${id}`);
    return res.data;
  },

  actualizarEvento: async (id, data) => {
    const res = await api.put(`/eventos/${id}`, data);
    return res.data;
  },

  eliminarEvento: async (id_evento) => {
    const res = await api.delete(`/eventos/${id_evento}`);
    return res.data;
  },

};

export default eventosService;
