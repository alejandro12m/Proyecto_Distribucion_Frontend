import { Titulo } from "../Atoms/Titulo";
import { InventarioManagement } from "../Organisms/InventarioManagement";

export function GestionInventario() {
  return (
    <div style={{ padding: "24px" }}>
      <Titulo titulo="Gestión de Devoluciones de Productos" />
      <InventarioManagement />
    </div>
  );
}

