import { ShippingDetailsManagement } from "../Organisms/ShippingDetailsManagement";
import { ShippingManagement } from "../Organisms/ShippingManagement";
import { useState } from "react";
import type { Envio } from "../../Types/Envio";
import { useDetallePedido } from "../../Hooks/useDetallePedido";

export default function GestionEnvios() {
  const [selectedEnvio, setSelectedEnvio] = useState<Envio | undefined>(
    undefined
  );
  const { detalles, loading, error, fetchDetalles } = useDetallePedido();

  const handleSelectEnvio = async (envio: Envio) => {
    setSelectedEnvio(envio);
    await fetchDetalles(envio.codigo);
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
              envio={selectedEnvio}
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
