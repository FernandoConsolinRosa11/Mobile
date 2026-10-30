import Icon from "../icons/Icon";

export default function TileGrid({ machine, sensors }) {
  const tiles = [
    { key: "oil", label: "Pressão Óleo", icon: "oil", value: `${machine.oil} bar` },
    { key: "belt", label: "Correia", icon: "pulse", value: machine.belt },
    { key: "filtro", label: "Filtro Ar", icon: "filter", value: `${machine.filtro}%` },
  ];

  return (
    <div className="tile-grid">
      {tiles.map(({ key, label, icon, value }) => (
        <div className={`tile condition-${sensors[key].status}`} key={key}>
          <div className="top"><Icon name={icon} size={14} />{label}</div>
          <div className="v">{value}</div>
          <div className="condition-message">{sensors[key].message}</div>
        </div>
      ))}
      <div className="tile">
        <div className="top"><Icon name="clock" size={14} />Horímetro</div>
        <div className="v">{machine.horimetro}</div>
      </div>
    </div>
  );
}
