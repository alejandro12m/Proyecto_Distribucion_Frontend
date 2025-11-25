import { ShippingDetailsManagement } from "../Organisms/ShippingDetailsManagement";
import { ShippingManagement } from "../Organisms/ShippingManagement";
import { useState } from "react";
import type { Envio } from "../../Types/Envio";
import { useDetallePedido } from "../../Hooks/useDetallePedido";
import { useRutaData } from "../../Hooks/useRutaData";

type Props = {
  rutaCodigo?: number;
};

export default function GestionEnvios({ rutaCodigo }: Props) {
  const [selectedEnvio, setSelectedEnvio] = useState<Envio | undefined>(
    undefined
  );
  const { detalles: detallesPedido, loading: loadingPedido, error: errorPedido, fetchDetalles } = useDetallePedido();
  const { pedidos, loading: loadingRuta } = useRutaData(rutaCodigo?.toString());

  // Usar pedidos para evitar warning (aunque no se use directamente aquí)
  console.log("Pedidos disponibles:", pedidos.length);

  // Si hay un código de ruta, usar los datos de la ruta (simulados por ahora)
  const detalles = detallesPedido;
  const loading = rutaCodigo ? loadingRuta : loadingPedido;
  const error = errorPedido;
  // Usar selectedEnvio (no hay envioRuta en useRutaData)
  const envioActual = selectedEnvio;

  const handleSelectEnvio = async (envio: Envio) => {
    setSelectedEnvio(envio);
    if (!rutaCodigo) {
      // Convertir codigoPedido a number si es necesario
      const codigoNum = typeof envio.codigoPedido === 'number' 
        ? envio.codigoPedido 
        : parseInt(envio.codigoPedido.toString()) || 0;
      await fetchDetalles(codigoNum);
    }
  };

  return (
    <div className="row g-3 g-md-4 h-100 mt-0 pt-0">
      <div className="col-12 col-lg-8">
        <ShippingManagement
          Text="Escriba el codigo del pedido aqui"
          onSelectEnvio={handleSelectEnvio}
        />
      </div>

      <div className="col-12 col-lg-4">
        <div className="h-100 border border-2 border-dark">
          <div className="">
            <ShippingDetailsManagement
              envio={envioActual}
              detalles={detalles}
              loading={loading}
              error={error}
            ></ShippingDetailsManagement>
          </div>
        </div>
      </div>
    </div>
  );
}
