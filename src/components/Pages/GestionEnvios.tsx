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
  const { envio: envioRuta, detalles: detallesRuta, loading: loadingRuta } = useRutaData(rutaCodigo);

  // Si hay un código de ruta, usar los datos de la ruta
  const detalles = rutaCodigo ? detallesRuta : detallesPedido;
  const loading = rutaCodigo ? loadingRuta : loadingPedido;
  const error = rutaCodigo ? null : errorPedido;
  // Usar envioRuta si hay rutaCodigo, sino usar selectedEnvio
  const envioActual = rutaCodigo ? envioRuta : selectedEnvio;

  const handleSelectEnvio = async (envio: Envio) => {
    setSelectedEnvio(envio);
    if (!rutaCodigo) {
      await fetchDetalles(envio.codigoPedido);
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
