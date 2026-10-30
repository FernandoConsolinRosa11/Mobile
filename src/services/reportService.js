import  api  from "./api";
import { MOCK_REPORT } from "./mockData";

export const reportService = {
  async getByPeriod(periodo = "diario") {
    try {
      const { data } = await api.get(`/relatorios?periodo=${periodo}`);
      return data;
    } catch (err) {
      console.warn("[reportService] /relatorios indisponível, usando mock:", err.message);
      return MOCK_REPORT;
    }
  },
};
