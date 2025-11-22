import { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./components/Pages/Dashboard";
import GestionEnvios from "./components/Pages/GestionEnvios";
import { Sidebar } from "./components/Organisms/Sidebar";

type Ventanas = "Dashboard" | "GestionEnvios";

export function Root() {
  const [ventanaActual, setVentanaActual] = useState<Ventanas>("Dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Sidebar
        titulo="Lácteos del Sur"
        nombres={["Dashboard", "GestionEnvios"]}
        links={["/dashboard", "/gestion-envios"]}
        setVentana={setVentanaActual}
        ventanaActual={ventanaActual}
      />

      <main style={{
        marginLeft: "280px",
        flex: 1,
        padding: "24px",
        width: "calc(100% - 280px)",
        minHeight: "100vh"
      }}>
        {ventanaActual === "Dashboard" && <Dashboard />}
        {ventanaActual === "GestionEnvios" && <GestionEnvios />}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
