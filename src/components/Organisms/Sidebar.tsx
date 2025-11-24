import { useEffect, useState } from "react";
import { Pages } from "../Molecules/Pages";
import { Perfil } from "../Molecules/Perfil";

type Ventanas = "Dashboard" | "GestionEnvios" | "Rutas";

interface ListarPages {
  titulo: string;
  nombres: string[];
  links: string[];
  setVentana?: (ventana: Ventanas) => void;
  ventanaActual?: string;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export function Sidebar({ titulo, nombres, links, setVentana, ventanaActual, sidebarOpen, setSidebarOpen }: ListarPages) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const items = nombres.map((n, i) => ({
    nombres: n,
    links: links[i],
    onClick: () => {
      setVentana && setVentana(n as Ventanas);
      // Cerrar sidebar en móvil al seleccionar
      if (!isDesktop && setSidebarOpen) {
        setSidebarOpen(false);
      }
    },
  }));

  const shouldShow = isDesktop || sidebarOpen;
  const transform = shouldShow ? "translateX(0)" : "translateX(-100%)";

  return (
    <div 
      className="bg-white border-end d-flex flex-column position-fixed h-100"
      style={{
        width: "280px",
        padding: "24px 16px",
        left: 0,
        top: 0,
        zIndex: 1000,
        transition: "transform 0.3s ease",
        transform: transform,
        boxShadow: !isDesktop ? "2px 0 8px rgba(0,0,0,0.1)" : "none"
      }}
    >
      <Perfil titulo={titulo} />
      <Pages items={items} ventanaActual={ventanaActual} />
      
      {/* Configuración al final */}
      <div className="mt-auto pt-4">
        <button
          onClick={() => {}}
          className="btn w-100 text-start d-flex align-items-center gap-3 p-3 border-0 rounded"
          style={{
            backgroundColor: "transparent",
            color: "#333",
            fontSize: "15px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <i className="bi bi-gear fs-5"></i>
          <span>Configuración</span>
        </button>
      </div>
    </div>
  );
}
