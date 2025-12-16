import api from "@/services/api";

const programasService = {
    getProgramas: async () => {
        const res = await api.get("/programas/");
        return res.data;
    },

};

export default programasService;

