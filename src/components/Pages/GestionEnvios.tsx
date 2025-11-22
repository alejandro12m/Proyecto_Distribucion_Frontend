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
    <div className="row g-3 g-md-4 h-100">
      <div className="col-12 col-lg-8">
        <ShippingManagement
          Text="Escriba el codigo del pedido aqui"
          onSelectCodigo={(codigo) => fetchEnvio(codigo)}
        />
      </div>

      <div className="col-12 col-lg-4">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <ShippingDetailsManagement
              envio={selectedEnvio}
            ></ShippingDetailsManagement>
            {loading && (
              <div className="d-flex align-items-center gap-2 mt-3">
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <span className="text-muted">Cargando detalle...</span>
              </div>
            )}
            {error && (
              <div className="alert alert-danger mt-3 mb-0" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Error: {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
