import { useEffect, useState } from "react";
import { useEnvioCodigo } from "../../Hooks/useEnvioCodigo";
import { Titulo } from "../Atoms/Titulo";
import { CardsRoutes } from "../Organisms/CardsRoutes";
import type { Envio } from "../../Types/Envio";

export function Rutas(){
  const [selectedEnvio, setSelectedEnvio] = useState<Envio | undefined>(
      undefined
    );
    const { envio, fetchEnvio } = useEnvioCodigo();
  useEffect(() => {
  if (selectedEnvio) console.log(selectedEnvio);
}, [selectedEnvio]);
    useEffect(() => {
      setSelectedEnvio(envio);
    }, [envio]);
  
    return(
        <>
        <div style={{ paddingLeft: "2%" }} className="">
        <Titulo titulo={"Rutas"}></Titulo>
        <CardsRoutes List={[
  {
    titulolos: 123,
    fecha: "2025-02-01",
    rutas: ["Santa Cruz", "Cochabamba", "La Paz"],
    onSelectCodigo:(codigo) => fetchEnvio(codigo),
  },
  {
    titulolos: 456,
    fecha: "2025-02-05",
    rutas: ["Tarija", "Potosí"],
    onSelectCodigo:(codigo) => fetchEnvio(codigo),

  },
  {
    titulolos: 789,
    fecha: "2025-09-07",
    rutas: ["Cochabamba", "Sucre","La Paz"],
    onSelectCodigo:(codigo) => fetchEnvio(codigo),

  },
] }></CardsRoutes>
        </div>
        </>
    );
}