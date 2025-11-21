import { BotonFuncion } from "../Atoms/BotonFuncion";
import { BotonLink } from "../Atoms/BotonLink";
import { PlusIcon } from "../Atoms/Iconos/PlusIcon";
import { Titulo } from "../Atoms/Titulo";
import { ShippingCard } from "../Molecules/ShippingCard";
import type { Envio } from "../../Types/Envio";

type Props = {
  envio?: Envio;
};

export function ShippingDetailsManagement({ envio }: Props) {
  const icono: React.ReactNode = <PlusIcon />;
  return (
    <>
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
          ></BotonFuncion>
        </div>

        {envio ? (
          <div style={{ marginTop: 12 }}>
            <ShippingCard datos={[envio]} />
          </div>
        ) : (
          <p style={{ marginTop: 12, color: "#666" }}>
            Seleccione un envío para ver sus detalles.
          </p>
        )}
      </div>
    </>
  );
}
