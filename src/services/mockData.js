// Dados de exemplo — usados como fallback enquanto o backend/BD não
// estiverem no ar (ex.: durante o desenvolvimento do front sozinho).
export const MOCK_MACHINES = [
  { id: 1, name: "Colheitadeira X9", model: "John Deere X9 1100", status: "operando", updatedAt: new Date(),
    temp: 88, tempMax: 120, vib: 2.4, vibMax: 5, rpm: 72, oil: 3.2, belt: "NORMAL", filtro: 82, horimetro: "2.847 h" },
  { id: 2, name: "Trator 8R 410", model: "John Deere 8R 410", status: "alerta", updatedAt: new Date(),
    temp: 92, tempMax: 120, vib: 3.1, vibMax: 5, rpm: 65, oil: 2.8, belt: "ATENCAO", filtro: 68, horimetro: "4.120 h" },
  { id: 3, name: "Plantadeira ExactEmerge", model: "John Deere DB60", status: "operando", updatedAt: new Date(),
    temp: 75, tempMax: 120, vib: 1.8, vibMax: 5, rpm: 58, oil: 3.4, belt: "NORMAL", filtro: 90, horimetro: "1.560 h" },
  { id: 4, name: "Pulverizador R4045", model: "John Deere R4045", status: "critico", updatedAt: new Date(),
    temp: 135, tempMax: 120, vib: 4.6, vibMax: 5, rpm: 80, oil: 2.1, belt: "CRITICO", filtro: 55, horimetro: "3.298 h" },
];

export const MOCK_ALERTS = [
  { id: 1, machine: "Trator 8R 410", level: "atencao", label: "Atenção",
    message: "Temperatura acima de 90°C detectada no motor principal. Verifique o sistema de arrefecimento.",
    sensor: "Sensor TMP-02", when: new Date() },
  { id: 2, machine: "Pulverizador R4045", level: "critico", label: "Crítico",
    message: "Vibração excessiva detectada no eixo traseiro. Possível folga nos parafusos de fixação.",
    sensor: "Sensor VIB-05", when: new Date() },
  { id: 3, machine: "Colheitadeira X9", level: "resolvido", label: "Resolvido",
    message: "Pressão do óleo voltou ao nível normal após troca de filtro.",
    sensor: "Sensor OIL-01", when: new Date() },
  { id: 4, machine: "Trator 8R 410", level: "info", label: "Info",
    message: "Manutenção preventiva recomendada em 50 horas de operação.",
    sensor: "Sistema", when: new Date() },
];

export const MOCK_REPORT = {
  stats: { eficiencia: "89%", horas: "47h", alertas: 3 },
  chartLabel: "Colheitadeira X9 — Semana",
  bars: [
    { day: "Seg", pct: 64 }, { day: "Ter", pct: 78 }, { day: "Qua", pct: 70 },
    { day: "Qui", pct: 88 }, { day: "Sex", pct: 92 }, { day: "Sáb", pct: 74 }, { day: "Dom", pct: 40 },
  ],
  items: [
    { title: "Relatório Diário — hoje", subtitle: "4 máquinas · 3 alertas", when: "Hoje", today: true },
  ],
};
