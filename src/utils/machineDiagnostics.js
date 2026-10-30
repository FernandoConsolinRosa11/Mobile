const STATUS_RANK = { operando: 0, alerta: 1, critico: 2 };

function condition(status, message) {
  return { status, message };
}

function rangeCondition(value, unit, { lowCritical, lowWarning, highWarning, highCritical }) {
  if (value === null || value === undefined || value === "" || !Number.isFinite(Number(value))) {
    return condition("alerta", "Leitura indisponível. Verifique o sensor.");
  }

  const reading = Number(value);
  const formattedReading = `${reading} ${unit}`;
  if (lowCritical !== undefined && reading < lowCritical) {
    return condition("critico", `Leitura de ${formattedReading}, abaixo do limite crítico de ${lowCritical} ${unit}.`);
  }
  if (highCritical !== undefined && reading > highCritical) {
    return condition("critico", `Leitura de ${formattedReading}, acima do limite crítico de ${highCritical} ${unit}.`);
  }
  if (lowWarning !== undefined && reading < lowWarning) {
    return condition("alerta", `Leitura de ${formattedReading}, abaixo do esperado (${lowWarning} ${unit}).`);
  }
  if (highWarning !== undefined && reading > highWarning) {
    return condition("alerta", `Leitura de ${formattedReading}, acima do esperado (${highWarning} ${unit}).`);
  }
  return condition("operando", "Dentro da faixa esperada.");
}

function beltCondition(value) {
  const belt = String(value || "").toUpperCase();
  if (belt === "NORMAL") return condition("operando", "Correia operando normalmente.");
  if (belt === "ATENCAO" || belt === "ATENÇÃO") return condition("alerta", "Correia abaixo da condição ideal. Inspecione o componente.");
  if (belt === "CRITICO" || belt === "CRÍTICO") return condition("critico", "Condição crítica da correia. Verifique o componente imediatamente.");
  return condition("alerta", "Condição da correia indisponível ou não reconhecida.");
}

export function getMachineDiagnostics(machine) {
  const sensors = {
    temp: rangeCondition(machine.temp, "°C", {
      lowCritical: 40,
      lowWarning: 60,
      highWarning: 90,
      highCritical: 120,
    }),
    vib: rangeCondition(machine.vib, "mm/s", { highWarning: 4, highCritical: 5 }),
    rpm: rangeCondition(machine.rpm, "%", { lowWarning: 50, highCritical: 100 }),
    oil: rangeCondition(machine.oil, "bar", {
      lowCritical: 2,
      lowWarning: 3,
      highWarning: 5,
      highCritical: 7,
    }),
    belt: beltCondition(machine.belt),
    filtro: rangeCondition(machine.filtro, "%", {
      lowCritical: 50,
      lowWarning: 70,
      highWarning: 100,
      highCritical: 120,
    }),
  };

  const sensorStatus = Object.values(sensors).reduce(
    (highest, sensor) => Math.max(highest, STATUS_RANK[sensor.status]),
    0,
  );
  const reportedStatus = STATUS_RANK[machine.status];
  const reportedSeverity = reportedStatus ?? (machine.status == null ? 0 : 1);
  const statusSeverity = Math.max(sensorStatus, reportedSeverity);
  const status = Object.keys(STATUS_RANK).find((key) => STATUS_RANK[key] === statusSeverity);
  const hasSensorWarning = Object.values(sensors).some((sensor) => sensor.status === "alerta");
  const hasSensorCritical = Object.values(sensors).some((sensor) => sensor.status === "critico");

  let message = "Todos os indicadores estão dentro das faixas esperadas.";
  if (status === "critico") {
    message = hasSensorCritical
      ? "Há indicador(es) fora do limite crítico. Verifique a máquina imediatamente."
      : "A máquina foi reportada em estado crítico pelo sistema. Verifique-a imediatamente.";
  } else if (status === "alerta") {
    message = hasSensorWarning
      ? "Há indicador(es) fora da faixa ideal. Acompanhe a operação."
      : "A máquina foi reportada com alerta pelo sistema. Verifique os indicadores.";
  }

  return { sensors, status, message };
}
