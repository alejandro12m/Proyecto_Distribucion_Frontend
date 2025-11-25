import { Titulo } from "../Atoms/Titulo";
import { DistribucionesManagement } from "../Organisms/DistribucionesManagement";

export function GestionDistribuciones() {
  return (
    <div style={{ padding: "24px" }}>
      <Titulo titulo="Gestión de Distribuciones de Leche" />
      <DistribucionesManagement />
    </div>
  );
}

