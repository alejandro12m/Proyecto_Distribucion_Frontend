interface PageItem {
  nombres: string;
  links: string;
  onClick?: () => void;
  icon?: string;
  isActive?: boolean;
}

interface PagesProps {
  items: PageItem[];
  ventanaActual?: string;
}

export function Pages({ items, ventanaActual }: PagesProps) {
  const getIconForPage = (nombre: string): string => {
    const iconMap: Record<string, string> = {
      "Dashboard": "bi-grid-3x3-gap",
      "GestionEnvios": "bi-truck",
      "Rutas": "bi-signpost-split",
      "Clientes": "bi-people",
      "Inventario": "bi-box-seam",
      "Reportes": "bi-file-earmark-bar-graph",
      "Configuración": "bi-gear"
    };
    return iconMap[nombre] || "bi-circle";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {items.map((item, idx) => {
        const isActive = ventanaActual === item.nombres;
        const icon = item.icon || getIconForPage(item.nombres);
        
        return (
          <button
            key={idx}
            onClick={item.onClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              border: "none",
              backgroundColor: isActive ? "#e3f2fd" : "transparent",
              color: isActive ? "#1976d2" : "#333",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: isActive ? "500" : "400",
              textAlign: "left",
              width: "100%",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <i className={`bi ${icon}`} style={{ fontSize: "20px" }}></i>
            <span>{item.nombres}</span>
          </button>
        );
      })}
    </div>
  );
}
