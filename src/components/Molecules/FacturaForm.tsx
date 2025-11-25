import { useState } from "react";
import { BotonFuncion } from "../Atoms/BotonFuncion";
import InputText from "../Atoms/InputText";
import { Label } from "../Atoms/Label";
import Select from "../Atoms/Select";
import { Titulo } from "../Atoms/Titulo";
import { usePostFactura } from "../../Hooks/usePostFactura";
import { useUpdatePedidoEstadoEntregado } from "../../Hooks/useUpdatePedidoEstadoEntregado";

type Props = {
  onClose: () => void;
  onSuccess?: () => void;
  envioCodigo?: number | string;
};

export function FacturaForm({ onClose, onSuccess, envioCodigo }: Props) {
  const { postFactura, loading, error } = usePostFactura();
  const { updateEstadoEntregado, loading: updatingEstado } = useUpdatePedidoEstadoEntregado();
  
  const [formData, setFormData] = useState({
    nroFactura: "",
    monto: "",
    concepto: "",
    metodoPago: "Efectivo",
    idChoferOVendedor: envioCodigo?.toString() || "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const facturaData = {
        nroFactura: formData.nroFactura,
        monto: parseFloat(formData.monto) || 0,
        concepto: formData.concepto,
        metodoPago: formData.metodoPago,
        idChoferOVendedor: parseInt(formData.idChoferOVendedor) || 0,
      };

      await postFactura(facturaData);

      // Actualizar estado del pedido a entregado si se proporciona código
      if (envioCodigo) {
        try {
          // Convertir el código a string con formato 00003 (5 dígitos con ceros a la izquierda)
          // El código puede venir como number o string, así que lo convertimos a string primero
          let codigoPedidoFormateado: string;
          if (typeof envioCodigo === 'string') {
            // Si ya es string, solo asegurar el formato con ceros a la izquierda
            codigoPedidoFormateado = envioCodigo.padStart(5, '0');
          } else {
            // Si es number, convertir a string y formatear
            codigoPedidoFormateado = envioCodigo.toString().padStart(5, '0');
          }
          await updateEstadoEntregado(codigoPedidoFormateado);
        } catch (err) {
          console.error("Error al actualizar estado del pedido:", err);
          // No bloqueamos el flujo si falla la actualización del estado
        }
      }

      if (onSuccess) {
        onSuccess();
      }
      onClose();
      alert("Factura registrada exitosamente");
    } catch (err) {
      console.error("Error al registrar factura:", err);
    }
  };

  const metodoPagoOptions = [
    { value: "Efectivo", label: "Efectivo" },
    { value: "Tarjeta", label: "Tarjeta" },
    { value: "Transferencia", label: "Transferencia" },
    { value: "Cheque", label: "Cheque" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Titulo titulo="Registrar Factura" />
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <Label text="Número de Factura" />
              <InputText
                placeholder="Número de Factura"
                value={formData.nroFactura}
                onChange={(e) => handleChange("nroFactura", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <Label text="Monto" />
              <InputText
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.monto}
                onChange={(e) => handleChange("monto", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <Label text="Concepto" />
              <InputText
                placeholder="Concepto"
                value={formData.concepto}
                onChange={(e) => handleChange("concepto", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <Label text="Método de Pago" />
              <Select
                placeholder="Seleccione método de pago"
                value={formData.metodoPago}
                onChange={(e) => handleChange("metodoPago", e.target.value)}
                options={metodoPagoOptions}
              />
            </div>

            <div className="col-md-6">
              <Label text="ID Chofer o Vendedor" />
              <InputText
                type="number"
                placeholder="ID Chofer o Vendedor"
                value={formData.idChoferOVendedor}
                onChange={(e) => handleChange("idChoferOVendedor", e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger mt-3 mb-0" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Error: {error}
            </div>
          )}

          <div className="mt-3 d-flex justify-content-end gap-2">
            <BotonFuncion
              nombre="Cancelar"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || updatingEstado}
            >
              {loading || updatingEstado ? "Guardando..." : "Guardar Factura"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

