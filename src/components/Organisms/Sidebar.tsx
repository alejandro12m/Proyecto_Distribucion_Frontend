import { Pages } from "../Molecules/Pages";
import { Perfil } from "../Molecules/Perfil";

type Ventanas = "Dashboard" | "GestionEnvios";

interface ListarPages {
  titulo: string;
  nombres: string[];
  links: string[];
  setVentana?: (ventana: Ventanas) => void;
  ventanaActual?: string;
}

export function Sidebar({ titulo, nombres, links, setVentana, ventanaActual }: ListarPages) {
  const items = nombres.map((n, i) => ({
    nombres: n,
    links: links[i],
    onClick: () => setVentana && setVentana(n as Ventanas),
  }));

  return (
    <div style={{
      width: "280px",
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      padding: "24px 16px",
      borderRight: "1px solid #e0e0e0",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 1000
    }}>
      <Perfil titulo={titulo} />
      <Pages items={items} ventanaActual={ventanaActual} />
      
      {/* Configuración al final */}
      <div style={{ marginTop: "auto", paddingTop: "24px" }}>
        <button
          onClick={() => {}}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            border: "none",
            backgroundColor: "transparent",
            color: "#333",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
            textAlign: "left",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <i className="bi bi-gear" style={{ fontSize: "20px" }}></i>
          <span>Configuración</span>
        </button>
      </div>
    </div>
  );
}
