import { useState } from "react";
import type { Distribucion } from "../../Types/Distribucion";
import { CambiarEstadoDistribucion } from "./CambiarEstadoDistribucion";
import { BotonFuncion } from "../Atoms/BotonFuncion";

type Props = {
  distribuciones: Distribucion[];
  loading: boolean;
  error: string | null;
  onUpdate?: () => void;
};

export function DistribucionesTable({ distribuciones, loading, error, onUpdate }: Props) {
  const [selectedDistribucion, setSelectedDistribucion] = useState<Distribucion | null>(null);
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="ms-3 text-muted">Cargando distribuciones...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error: {error}
      </div>
    );
  }

  if (distribuciones.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        No hay distribuciones registradas.
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getEstadoBadge = (estado: string) => {
    const estados: { [key: string]: string } = {
      espera: "warning",
      Espera: "warning",
      completado: "success",
      Completado: "success",
      entregado: "info",
      Entregado: "info",
    };
    const color = estados[estado] || "secondary";
    return `badge bg-${color}`;
  };

  const handleSuccess = () => {
    if (onUpdate) {
      onUpdate();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      {selectedDistribucion && (
        <CambiarEstadoDistribucion
          distribucion={selectedDistribucion}
          onSuccess={handleSuccess}
          onClose={() => setSelectedDistribucion(null)}
        />
      )}
      <div className="border rounded p-4">
        <h5 className="mb-3">Distribuciones de Leche</h5>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Empleado</th>
                <th>Fecha</th>
                <th>Litros Entregados</th>
                <th>Destino</th>
                <th>Estado</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {distribuciones.map((distribucion) => (
                <tr key={distribucion.distribucionID}>
                  <td>{distribucion.distribucionID}</td>
                  <td>{distribucion.empleadoNombre}</td>
                  <td>{formatDate(distribucion.fecha)}</td>
                  <td>{distribucion.litrosEntregados.toFixed(2)} L</td>
                  <td>{distribucion.destino}</td>
                  <td>
                    <span className={getEstadoBadge(distribucion.estado)}>
                      {distribucion.estado}
                    </span>
                  </td>
                  <td>{formatDate(distribucion.fechaRegistro)}</td>
                  <td>
                    {distribucion.estado !== "completado" && distribucion.estado !== "Completado" && distribucion.estado !== "entregado" && distribucion.estado !== "Entregado" && (
                      <BotonFuncion
                        nombre="Marcar Completado"
                        onClick={() => setSelectedDistribucion(distribucion)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

