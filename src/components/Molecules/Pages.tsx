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
    <div className="d-flex flex-column gap-1">
      {items.map((item, idx) => {
        const isActive = ventanaActual === item.nombres;
        const icon = item.icon || getIconForPage(item.nombres);
        
        return (
          <button
            key={idx}
            onClick={item.onClick}
            className={`btn w-100 text-start d-flex align-items-center gap-3 p-3 border-0 rounded ${isActive ? 'active' : ''}`}
            style={{
              backgroundColor: isActive ? "#e3f2fd" : "transparent",
              color: isActive ? "#1976d2" : "#333",
              fontSize: "15px",
              fontWeight: isActive ? "500" : "400",
              transition: "all 0.2s ease",
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
            <i className={`bi ${icon} fs-5`}></i>
            <span>{item.nombres}</span>
          </button>
        );
      })}
    </div>
  );
}
