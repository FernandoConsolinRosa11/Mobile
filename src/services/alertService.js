import  api  from "./api";
import { MOCK_ALERTS } from "./mockData";

export const alertService = {
  async list() {
    try {
      const { data } = await api.get("/alertas");
      return data;
    } catch (err) {
      console.warn("[alertService] /alertas indisponível, usando mock:", err.message);
      return MOCK_ALERTS;
    }
  },
};
