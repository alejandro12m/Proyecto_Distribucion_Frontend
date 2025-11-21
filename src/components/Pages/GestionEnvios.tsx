import { ShippingDetailsManagement } from "../Organisms/ShippingDetailsManagement";
import { ShippingManagement } from "../Organisms/ShippingManagement";
import { Sidebar } from "../Organisms/Sidebar";
import { useEffect, useState } from "react";
import type { Envio } from "../../Types/Envio";
import { useEnvioCodigo } from "../../Hooks/useEnvioCodigo";

export default function GestionEnvios() {
  const [selectedEnvio, setSelectedEnvio] = useState<Envio | undefined>(
    undefined
  );
  const { envio, loading, error, fetchEnvio } = useEnvioCodigo();

  // Mantener selectedEnvio sincronizado con el hook
  useEffect(() => {
    setSelectedEnvio(envio);
  }, [envio]);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "16px",
        }}
      >
        <div style={{ flex: "0 0 33%" }}>
          <Sidebar
            titulo="Distribucion Prolac"
            nombres={["Dashboard", "Gestion de Envios", "Gestion de Cargas"]}
            links={[
              "https://www.figma.com/",
              "https://getbootstrap.com/",
              "https://vjudge.net/",
            ]}
          />
        </div>

        <div style={{ flex: "0 0 33%" }}>
          <ShippingManagement
            Text="Escriba el codigo del pedido aqui"
            onSelectCodigo={(codigo) => fetchEnvio(codigo)}
          />
        </div>

        <div
          style={{
            flex: "0 0 33%",
            background: "#f0f0f0",
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <ShippingDetailsManagement
            envio={selectedEnvio}
          ></ShippingDetailsManagement>
          {loading && <p>Cargando detalle...</p>}
          {error && <p style={{ color: "#c00" }}>Error: {error}</p>}
        </div>
      </div>
    </>
  );
}
