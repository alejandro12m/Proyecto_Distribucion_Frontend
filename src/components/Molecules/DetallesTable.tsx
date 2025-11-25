import type { DetalleProducto } from "../../Types/Envio";

type Props = {
  detalles: DetalleProducto[];
};

export function DetallesTable({ detalles }: Props) {
  const total = detalles.reduce(
    (sum, detalle) => sum + detalle.cantidad * detalle.precioUnitarioVenta,
    0
  );

  return (
    <div className="mt-3">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Código Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td>{detalle.codigoProducto}</td>
              <td>{detalle.cantidad}</td>
              <td>${detalle.precioUnitarioVenta.toFixed(2)}</td>
              <td>${(detalle.subtotal).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="fw-bold">
            <td colSpan={3}>Total</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

