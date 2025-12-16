import api from "@/services/api";

const geonamesService = {
  // devuelve res.data (ej. { tipos_via: [...] })
 getTiposVia: async () => {
  const res = await api.get("/geonames/tipos-via");
  return res.data;
    },

    getTiposLugar: async () => {
    const res = await api.get("/geonames/tipos-lugar");
    return res.data;
 },


  // devuelve array de países (res.data o res.data.paises según API)
  getPaises: async () => {
    const res = await api.get("/geonames/paises");
    return res.data;
  },

  getDepartamentos: async (geonameId) => {
    const res = await api.get(`/geonames/departamentos/${geonameId}`);
    return res.data;
  },

  getCiudades: async (countryCode, adminCode) => {
    const res = await api.get(`/geonames/ciudades/${countryCode}/${adminCode}`
    );
    return res.data;
  },

  buscarCiudad: async (query) => {
    const res = await api.get("/geonames/buscar/ciudad", {
      params: { nombre: query },
    });
    return res.data;
  },

  // opciones administrativas:
  clearCache: async () => {
    const res = await api.delete("/geonames/cache/clear");
    return res.data;
  },
};

export default geonamesService;

