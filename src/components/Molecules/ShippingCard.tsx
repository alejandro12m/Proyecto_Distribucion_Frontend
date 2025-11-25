import { Label } from "../Atoms/Label";
import { StatusBadge } from "../Atoms/StatusBadge";
import { Titulo } from "../Atoms/Titulo";
import type { Envio } from "../../Types/Envio";

type PropEnvio = {
  datos: Envio[]; 
  onSelectEnvio?: (envio: Envio) => void;
};

export function ShippingCard({ datos, onSelectEnvio }: PropEnvio) {
  return (
    <div style={{ display: "", gap: "16px", flexWrap: "wrap" }}>
      {datos.map((envio) => (
        <div
          key={envio.codigoPedido} 
          onClick={() => onSelectEnvio?.(envio)}
          style={{
            width: 200,
            border: "1px solid #ccc",
            padding: 10,
            cursor: onSelectEnvio ? "pointer" : "default",
          }}
          className="p-4 rounded position-relative bg-custom-light-blue border-custom-blue"
        >
          <span className="fw-bold mb-2">
            <Titulo titulo={`#${envio.codigoPedido}`} />
          </span>
          <span className="mb-2 text-secondary">
            <Label
              text={`La fecha de envio es ${envio.fechaPedido}`}
              text2={envio.direccion}
            />
          </span>
          <span className="badge rounded-pill badge-custom-warning position-absolute top-0 end-0 mt-3 me-20">
            <StatusBadge status={envio.estadoPedido} />
          </span>
        </div>
      ))}
    </div>
  );
}
