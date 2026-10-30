const API_URL = "http://10.10.14.88:3000";

export default async function getDadosMaquina() {
  const response = await fetch(`${API_URL}/api/vibracao`);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API");
  }

  return response.json();
}