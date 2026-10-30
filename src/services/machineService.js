import  api  from "./api";
import { MOCK_MACHINES } from "./mockData";

// "Model" — única camada que sabe conversar com o backend sobre Máquinas.
export const machineService = {
  async list() {
    try {
      const { data } = await api.get("/maquinas");
      return data;
    } catch (err) {
      console.warn("[machineService] /maquinas indisponível, usando mock:", err.message);
      return MOCK_MACHINES;
    }
  },

  async getById(id) {
    try {
      const { data } = await api.get(`/maquinas/${id}`);
      return data;
    } catch (err) {
      console.warn("[machineService] /maquinas/:id indisponível, usando mock:", err.message);
      return MOCK_MACHINES.find((m) => String(m.id) === String(id)) || null;
    }
  },
};
