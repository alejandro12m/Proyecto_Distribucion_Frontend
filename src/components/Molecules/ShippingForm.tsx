import { useState } from "react";
import { BotonFuncion } from "../Atoms/BotonFuncion";
import InputText from "../Atoms/InputText";
import { Label } from "../Atoms/Label";
import { Titulo } from "../Atoms/Titulo";
import { EnvioPOST } from "../../Services/EnvioPOST";

type Props = {
  onClose: () => void;
  onSuccess?: () => void;
};

export function ShippingForm({ onClose, onSuccess }: Props) {
  const [codigo, setCodigo] = useState("#E-10543");
  const [fechaEnvio, setFechaEnvio] = useState("");
  const [tipo, setTipo] = useState("");
  const [detalles, setDetalles] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Extraer el número del código (ej: "#E-10543" -> 10543)
      const codigoNumero = parseInt(codigo.replace(/\D/g, "")) || 0;
      
      // Formatear fecha si es necesario
      const fechaFormateada = fechaEnvio || new Date().toISOString().split("T")[0];
      
      await EnvioPOST(codigoNumero, fechaFormateada, detalles || "Sin detalles", tipo);
      
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al guardar el envío";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: "800px",
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Titulo titulo="Registrar Nuevo Envío" />
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <Label text="Código" />
            <InputText
              placeholder="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <Label text="Fecha de Envío" />
            <InputText
              type="date"
              placeholder="mm/dd/yyyy"
              value={fechaEnvio}
              onChange={(e) => setFechaEnvio(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <Label text="Tipo" />
            <InputText
              placeholder="Tipo de envío"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <Label text="Detalles" />
            <InputText
              placeholder="Cliente, dirección..."
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "#c00" }}>Error: {error}</p>}

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <BotonFuncion
              nombre="Cancelar"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            />
            <button
              type="submit"
              className="btn btn-custom btn-lg"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Envío"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

