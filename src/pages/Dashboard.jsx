import { useEffect } from "react";
import { useMachines } from "../hooks/useMachines";
import { useApp } from "../context/AppContext";
import Gauge from "../components/dashboard/Gauge";
import MachineSelector from "../components/dashboard/MachineSelector";
import TileGrid from "../components/dashboard/TileGrid";
import { getMachineDiagnostics } from "../utils/machineDiagnostics";

export default function Dashboard() {
  const { machines, loading } = useMachines();
  const { selectedMachineId, setSelectedMachineId } = useApp();

  // se ninguém foi selecionado ainda (ex.: entrou direto pelo menu), usa a primeira
  useEffect(() => {
    if (!selectedMachineId && machines.length) setSelectedMachineId(machines[0].id);
  }, [machines, selectedMachineId, setSelectedMachineId]);

  if (loading) return <p>Carregando…</p>;

  const machine = machines.find((m) => String(m.id) === String(selectedMachineId)) || machines[0];
  if (!machine) return <p>Nenhuma máquina cadastrada.</p>;
  const diagnostics = getMachineDiagnostics(machine);

  return (
    <section>
      <div className="eyebrow">Diagnóstico em Tempo Real</div>
      <h1 className="title">Dashboard</h1>

      <MachineSelector machines={machines} selected={machine} onSelect={setSelectedMachineId} />

      <div className={`machine-condition condition-${diagnostics.status}`} role="status">
        <span className="condition-indicator" />
        <div>
          <strong>{diagnostics.status === "critico" ? "Condição crítica" : diagnostics.status === "alerta" ? "Atenção necessária" : "Boas condições"}</strong>
          <p>{diagnostics.message}</p>
        </div>
      </div>

      <div className="card-box">
        <div className="kicker">SENSORES ATIVOS</div>
        <div className="gauge-row">
          <Gauge value={`${machine.temp}°`} label="Temperatura" pct={machine.temp / machine.tempMax} status={diagnostics.sensors.temp.status} message={diagnostics.sensors.temp.message} />
          <Gauge value={machine.vib} label="Vibração" pct={machine.vib / machine.vibMax} status={diagnostics.sensors.vib.status} message={diagnostics.sensors.vib.message} />
          <Gauge value={machine.rpm} label="RPM Motor" pct={machine.rpm / 100} status={diagnostics.sensors.rpm.status} message={diagnostics.sensors.rpm.message} />
        </div>
      </div>

      <TileGrid machine={machine} sensors={diagnostics.sensors} />

      <div className="card-box">
        <div className="chart-wrap">
          <div className="chart-limit">
            <span className="l1">TEMPERATURA</span>
            <span className="l2">Hoje — Limite: <span>90°C</span></span>
          </div>
          <svg viewBox="0 0 300 90" width="100%" height="90" preserveAspectRatio="none">
            <line x1="0" y1="14" x2="300" y2="14" stroke="var(--warning)" strokeWidth="1" strokeDasharray="4 4" />
            <polyline points="0,70 40,66 80,60 120,44 160,26 200,20 240,30 280,40" fill="none" stroke="var(--warning)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="chart-axis"><span>06h</span><span>08h</span><span>10h</span><span>12h</span><span>14h</span><span>16h</span><span>18h</span></div>
        </div>
      </div>
    </section>
  );
}
