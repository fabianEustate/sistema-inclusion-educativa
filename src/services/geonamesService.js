import api from "@/services/api";

const geonamesService = {
  getDirecciones: () => api.get("/api/v1/geonames/direcciones"),

  getTiposVia: () => api.get("/geonames/tipos-via"),

  getTiposLugar: () => api.get("/api/v1/geonames/tipos-lugar"),

  getPaises: () => api.get("/api/v1/geonames/paises"),

  getDepartamentos: (geonameId) =>
    api.get(`/api/v1/geonames/departamentos/${geonameId}`),

  getCiudades: (countryCode, adminCode) =>
    api.get(`/api/v1/geonames/ciudades/${countryCode}/${adminCode}`),

  buscarCiudad: (query) =>
    api.get("/api/v1/geonames/buscar/ciudad", {
      params: { nombre: query },
    }),
};

export default geonamesService;
