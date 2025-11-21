import { BotonFuncion } from "../Atoms/BotonFuncion";
import type { TipoFiltroEnvio } from "../../Types/Envio";

type FilterBarProps = {
  onFilterChange: (tipo: TipoFiltroEnvio) => void;
};

export function FilterBar({ onFilterChange }: FilterBarProps) {
  return (
    <>
      <div>
        <BotonFuncion
          nombre="Todos"
          onClick={() => onFilterChange("todos")}
        />
        <BotonFuncion
          nombre="Pendientes"
          onClick={() => onFilterChange("pendientes")}
        />
        <BotonFuncion
          nombre="Entregados"
          onClick={() => onFilterChange("entregados")}
        />
        <BotonFuncion
          nombre="Cancelados"
          onClick={() => onFilterChange("cancelados")}
        />
      </div>
    </>
  );
}