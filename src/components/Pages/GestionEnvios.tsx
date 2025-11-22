import { ShippingDetailsManagement } from "../Organisms/ShippingDetailsManagement";
import { ShippingManagement } from "../Organisms/ShippingManagement";
import { useEffect, useState } from "react";
import type { Envio } from "../../Types/Envio";
import { useEnvioCodigo } from "../../Hooks/useEnvioCodigo";

export default function GestionEnvios() {
  const [selectedEnvio, setSelectedEnvio] = useState<Envio | undefined>(
    undefined
  );
  const { envio, loading, error, fetchEnvio } = useEnvioCodigo();

  useEffect(() => {
    setSelectedEnvio(envio);
  }, [envio]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "16px",
      }}
    >
      <div style={{ flex: "1" }}>
        <ShippingManagement
          Text="Escriba el codigo del pedido aqui"
          onSelectCodigo={(codigo) => fetchEnvio(codigo)}
        />
      </div>

      <div
        style={{
          flex: "0 0 400px",
          background: "#ffffff",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <ShippingDetailsManagement
          envio={selectedEnvio}
        ></ShippingDetailsManagement>
        {loading && <p>Cargando detalle...</p>}
        {error && <p style={{ color: "#c00" }}>Error: {error}</p>}
      </div>
    </div>
  );
}
