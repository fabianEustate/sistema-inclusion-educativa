import api from "@/services/api";

const noticiasService = {
  crearNoticia: async (data) => {
    const res = await api.post("/noticias/", data);
    return res.data;
  },

  getNoticias: async () => {
    const res = await api.get("/noticias/");
    console.log("Respuesta cruda de noticias:", res.data);

    return res.data;
  },

  getNoticiaById: async (id) => {
    const res = await api.get(`/noticias/${id}`);
    return res.data;
  },

  actualizarNoticia: async (id, data) => {
    const res = await api.put(`/noticias/${id}`, data);
    return res.data;
  },

  eliminarNoticia: async (id_noticia) => {
    const res = await api.delete(`/noticias/${id_noticia}`);
    return res.data;
  },
};

export default noticiasService;
