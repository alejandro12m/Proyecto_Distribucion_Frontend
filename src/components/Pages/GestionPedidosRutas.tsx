import { ShippingDetailsManagement } from "../Organisms/ShippingDetailsManagement";
import { ShippingManagementRutas } from "../Organisms/ShippingManagementRutas";
import { useState } from "react";
import type { PedidoPorRuta } from "../../Types/Ruta";
import { useRutaData, useDetallePedidoRuta } from "../../Hooks/useRutaData";

type Props = {
  codigoRuta: string;
  onVolver: () => void;
};

export function GestionPedidosRutas({ codigoRuta, onVolver }: Props) {
  const [selectedPedido, setSelectedPedido] = useState<PedidoPorRuta | undefined>(undefined);
  const { pedidos, loading: loadingPedidos, error: errorPedidos } = useRutaData(codigoRuta);
  const { detalles, loading: loadingDetalles, error: errorDetalles, fetchDetalles } = useDetallePedidoRuta();

  const handleSelectPedido = async (pedido: PedidoPorRuta) => {
    setSelectedPedido(pedido);
    await fetchDetalles();
  };

  // Convertir PedidoPorRuta a Envio para compatibilidad con ShippingDetailsManagement
  // Mantener el código como string para preservar el formato original (ej: "00003")
  const envioActual = selectedPedido ? {
    codigoPedido: selectedPedido.codigoPedido,
    direccion: selectedPedido.direccion,
    fechaPedido: selectedPedido.fechaPedido,
    estadoPedido: selectedPedido.estadoPedido,
  } : undefined;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3" style={{ paddingLeft: "2%" }}>
        <h4>Gestión de Pedidos - Ruta #{codigoRuta}</h4>
        <button
          className="btn btn-secondary"
          onClick={onVolver}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Volver a Rutas
        </button>
      </div>

      <div className="row g-3 g-md-4 h-100 mt-0 pt-0">
        <div className="col-12 col-lg-8">
          <ShippingManagementRutas
            Text="Escriba el codigo del pedido aqui"
            onSelectPedido={handleSelectPedido}
            pedidos={pedidos}
            loading={loadingPedidos}
            errores={errorPedidos}
          />
        </div>

        <div className="col-12 col-lg-4">
          <div className="h-100 border border-2 border-dark">
            <div className="">
              <ShippingDetailsManagement
                envio={envioActual}
                detalles={detalles}
                loading={loadingDetalles}
                error={errorDetalles}
              ></ShippingDetailsManagement>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

