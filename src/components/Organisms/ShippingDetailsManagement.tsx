import { useState } from "react";
import { BotonFuncion } from "../Atoms/BotonFuncion";
import { BotonLink } from "../Atoms/BotonLink";
import { PlusIcon } from "../Atoms/Iconos/PlusIcon";
import { Titulo } from "../Atoms/Titulo";
import { ShippingCard } from "../Molecules/ShippingCard";
import { DetallesTable } from "../Molecules/DetallesTable";
import { FacturaForm } from "../Molecules/FacturaForm";
import type { Envio, DetalleProducto } from "../../Types/Envio";

type Props = {
  envio?: Envio;
  detalles?: DetalleProducto[];
  loading?: boolean;
  error?: string | null;
};

export function ShippingDetailsManagement({ envio, detalles = [], loading = false, error }: Props) {
  const [showFacturaForm, setShowFacturaForm] = useState(false);
  const icono: React.ReactNode = <PlusIcon />;
  
  const handleMarcarEntregado = () => {
    if (envio) {
      setShowFacturaForm(true);
    } else {
      alert("Por favor, seleccione un envío primero");
    }
  };

  const handleFacturaSuccess = () => {
    // Aquí puedes agregar lógica adicional después de registrar la factura
    // Por ejemplo, actualizar el estado del envío
    console.log("Factura registrada exitosamente");
  };
  
  return (
    <>
      {showFacturaForm && (
        <FacturaForm
          onClose={() => setShowFacturaForm(false)}
          onSuccess={handleFacturaSuccess}
          envioCodigo={envio?.codigoPedido}
        />
      )}
      <div>
        <div style={{ display: "flex" }}>
          <Titulo titulo="Envio"></Titulo>
          <BotonLink
            nombre="Editar"
            page="https://github.com/alejandro12m"
          ></BotonLink>
          <BotonFuncion
            nombre="Marcarcomo entregado"
            children={icono}
            onClick={handleMarcarEntregado}
          ></BotonFuncion>
        </div>

        {envio ? (
          <>
            {/* Tarjeta del envío seleccionado arriba */}
            <div style={{ marginTop: 12 }}>
              <ShippingCard datos={[envio]} />
            </div>

            {/* Lista de detalles abajo */}
            <div style={{ marginTop: 24 }}>
              <Titulo titulo="Detalles del Pedido" />
              
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
              
              {!loading && !error && detalles.length > 0 && (
                <DetallesTable detalles={detalles} />
              )}
              
              {!loading && !error && detalles.length === 0 && envio && (
                <p style={{ marginTop: 12, color: "#666" }}>
                  No se encontraron detalles para este envío.
                </p>
              )}
            </div>
          </>
        ) : (
          <p style={{ marginTop: 12, color: "#666" }}>
            Seleccione un envío para ver sus detalles.
          </p>
        )}
      </div>
    </>
  );
}
