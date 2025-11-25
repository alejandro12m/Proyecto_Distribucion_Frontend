import type { GetMovimientoInventario } from "../../Types/MovimientoInventario";

type Props = {
  movimientos: GetMovimientoInventario[];
  loading: boolean;
  error: string | null;
};

export function MovimientosTable({ movimientos, loading, error }: Props) {
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="ms-3 text-muted">Cargando movimientos...</span>
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

  if (movimientos.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        No hay movimientos de inventario registrados.
      </div>
    );
  }

  return (
    <div className="border rounded p-4">
      <h5 className="mb-3">Movimientos de Inventario</h5>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Código</th>
              <th>Código Producto</th>
              <th>Cantidad Buena</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((movimiento, index) => (
              <tr key={index}>
                <td>{movimiento.codigo}</td>
                <td>{movimiento.codigoProducto}</td>
                <td>{movimiento.cantidadBuena}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

