import type { PedidoPorRuta } from "../../Types/Ruta";
import { Titulo } from "../Atoms/Titulo";

type PropPedido = {
  datos: PedidoPorRuta[];
  onSelectPedido?: (pedido: PedidoPorRuta) => void | Promise<void>;
};

export function PedidosRutaCard({ datos, onSelectPedido }: PropPedido) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEstadoBadge = (estado: string) => {
    const estados: { [key: string]: string } = {
      "en proceso": "warning",
      "entregado": "success",
      "cancelado": "danger",
      "Pendiente": "warning",
      "Entregado": "success",
      "Cancelado": "danger",
    };
    const color = estados[estado] || "secondary";
    return `badge bg-${color}`;
  };

  if (datos.length === 0) {
    return (
      <div className="alert alert-info mt-3" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        No hay pedidos para esta ruta.
      </div>
    );
  }

  return (
    <div className="mt-3">
      {datos.map((pedido, index) => (
        <div
          key={index}
          className="card mb-3 shadow-sm"
          style={{
            cursor: onSelectPedido ? "pointer" : "default",
          }}
          onClick={() => onSelectPedido?.(pedido)}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Titulo titulo={`Pedido #${pedido.codigoPedido}`} />
                <p className="mb-1">
                  <strong>Dirección:</strong> {pedido.direccion}
                </p>
                <p className="mb-1">
                  <strong>Fecha:</strong> {formatDate(pedido.fechaPedido)}
                </p>
              </div>
              <span className={getEstadoBadge(pedido.estadoPedido)}>
                {pedido.estadoPedido}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

