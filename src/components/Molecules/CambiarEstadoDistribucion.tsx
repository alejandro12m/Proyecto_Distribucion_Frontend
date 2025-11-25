import { BotonFuncion } from "../Atoms/BotonFuncion";
import { Titulo } from "../Atoms/Titulo";
import { useUpdateDistribucionEstado } from "../../Hooks/useUpdateDistribucionEstado";
import type { Distribucion } from "../../Types/Distribucion";

type Props = {
  distribucion: Distribucion;
  onSuccess?: () => void;
  onClose: () => void;
};

export function CambiarEstadoDistribucion({ distribucion, onSuccess, onClose }: Props) {
  const { updateEstadoEntregado, loading, error } = useUpdateDistribucionEstado();

  const handleCambiarEstado = async () => {
    try {
      await updateEstadoEntregado(distribucion);
      if (onSuccess) {
        onSuccess();
      }
      onClose();
      alert("Estado actualizado a entregado exitosamente");
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Titulo titulo="Cambiar Estado de Distribución" />
        
        <div className="mt-3">
          <p>
            <strong>ID:</strong> {distribucion.distribucionID}
          </p>
          <p>
            <strong>Empleado:</strong> {distribucion.empleadoNombre}
          </p>
          <p>
            <strong>Estado actual:</strong> {distribucion.estado}
          </p>
          <p className="text-muted">
            ¿Desea cambiar el estado a <strong>"completado"</strong>?
          </p>
        </div>

        {error && (
          <div className="alert alert-danger mt-3 mb-0" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Error: {error}
          </div>
        )}

        <div className="mt-3 d-flex justify-content-end gap-2">
          <BotonFuncion
            nombre="Cancelar"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCambiarEstado}
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Cambiar a Completado"}
          </button>
        </div>
      </div>
    </div>
  );
}

