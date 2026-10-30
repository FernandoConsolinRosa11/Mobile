import { useState, useEffect } from "react";
import Icon from "../icons/Icon";
import { useApp } from "../../context/AppContext";

export default function Header({ onOpenMenu, showMenuButton = true }) {
  const { showToast } = useApp();
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app-header">
      {showMenuButton && (
        <button className="icon-btn" onClick={onOpenMenu} aria-label="Abrir menu">
          <Icon name="menu" />
        </button>
      )}
      <div className="logo-badge">
        <span className="logo-text">SENSUS</span>
        <span className="tag">AGRO</span>
      </div>
      <span className="clock-badge">{clock}</span>
      <button className="icon-btn" onClick={() => showToast("4 alertas não lidos")} aria-label="Notificações">
        <Icon name="bell" />
        <span className="bell-badge">4</span>
      </button>
    </div>
  );
}
