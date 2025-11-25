import { useState } from "react";
import { Titulo } from "../Atoms/Titulo";
import { CardsRoutes } from "../Organisms/CardsRoutes";
import { GestionPedidosRutas } from "./GestionPedidosRutas";
import { useGetRutas } from "../../Hooks/useGetRutas";

export function Rutas() {
  const [selectedRuta, setSelectedRuta] = useState<string | undefined>(undefined);
  const { rutas, loading, error } = useGetRutas();

  const handleSelectRuta = (codigo: string) => {
    setSelectedRuta(codigo);
  };

  const handleVolver = () => {
    setSelectedRuta(undefined);
  };

  // Si hay una ruta seleccionada, mostrar GestionPedidosRutas
  if (selectedRuta) {
    return <GestionPedidosRutas codigoRuta={selectedRuta} onVolver={handleVolver} />;
  }

  // Mostrar lista de rutas
  return (
    <>
      <div style={{ paddingLeft: "2%" }} className="">
        <Titulo titulo={"Rutas"}></Titulo>
        {loading && (
          <div className="d-flex align-items-center justify-content-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <span className="ms-3 text-muted">Cargando rutas...</span>
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Error: {error}
          </div>
        )}
        {!loading && !error && rutas && (
          <CardsRoutes
            rutas={rutas || []}
            onSelectCodigo={handleSelectRuta}
          />
        )}
      </div>
    </>
  );
}