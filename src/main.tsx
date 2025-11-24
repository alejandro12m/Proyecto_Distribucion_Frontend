import { useEffect, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {Dashboard} from "./components/Pages/Dashboard";
import GestionEnvios from "./components/Pages/GestionEnvios";
import { Sidebar } from "./components/Organisms/Sidebar";
import { Rutas } from "./components/Pages/Rutas";

type Ventanas = "Dashboard" | "GestionEnvios" | "Rutas";

export function Root() {
  const [ventanaActual, setVentanaActual] = useState<Ventanas>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 992;
      setIsDesktop(desktop);
      if (desktop) {
        setSidebarOpen(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar
        titulo="Lácteos del Sur"
        nombres={["Dashboard", "GestionEnvios","Rutas"]}
        links={["/dashboard", "/gestion-envios","/rutas"]}
        setVentana={setVentanaActual}
        ventanaActual={ventanaActual}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main 
        className="flex-grow-1" 
        style={{ 
          marginLeft: isDesktop ? "280px" : "0",
          transition: "margin-left 0.3s ease",
          width: isDesktop ? "calc(100% - 280px)" : "100%"
        }}
      >
        {/* Botón para abrir sidebar en móvil */}
        <button
          className="btn btn-primary d-lg-none"
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ 
            position: "fixed", 
            zIndex: 999, 
            top: "15px", 
            left: "15px",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <i className="bi bi-list fs-5"></i>
        </button>

        {/* Overlay para cerrar sidebar en móvil */}
        {sidebarOpen && !isDesktop && (
          <div
            className="position-fixed w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 998, top: 0, left: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="">
          {ventanaActual === "Dashboard" && <Dashboard />}
          {ventanaActual === "GestionEnvios" && <GestionEnvios />}
          {ventanaActual === "Rutas" && <Rutas />}

        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
