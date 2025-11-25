import type { GetDevolucionProducto } from "../../Types/DevolucionProducto";

type Props = {
  devoluciones: GetDevolucionProducto[];
  loading: boolean;
  error: string | null;
};

export function DevolucionesTable({ devoluciones, loading, error }: Props) {
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="ms-3 text-muted">Cargando devoluciones...</span>
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

  if (devoluciones.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        No hay devoluciones registradas.
      </div>
    );
  }

  const getEstadoBadge = (estado: string) => {
    const estados: { [key: string]: string } = {
      Activo: "success",
      Inactivo: "secondary",
    };
    const color = estados[estado] || "secondary";
    return `badge bg-${color}`;
  };

  return (
    <div className="border rounded p-4">
      <h5 className="mb-3">Productos Devueltos</h5>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Código Producto</th>
              <th>Código</th>
              <th>Cantidad Buena</th>
              <th>Estado</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {devoluciones.map((devolucion, index) => (
              <tr key={index}>
                <td>{devolucion.codigoProducto}</td>
                <td>{devolucion.codigo}</td>
                <td>{devolucion.cantidadBuena}</td>
                <td>
                  <span className={getEstadoBadge(devolucion.estado)}>
                    {devolucion.estado}
                  </span>
                </td>
                <td>{devolucion.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

