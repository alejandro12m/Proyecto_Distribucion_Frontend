import { useEffect, useState } from "react";
import type { Envio } from "../Types/Envio";

export function EnvioPOSTpendientes() {
  const [datos, setDatos] = useState<Envio[]>([]);

  useEffect(() => {
    const URL = "https://localhost:7228/api/Envios/ListaEnviosEntregados";

    fetch(URL)
      .then((res) => res.json())
      .then((datos: Envio[]) => {
        setDatos(datos); // directo, sin convertir
      });
  }, []);

  return (
   {datos}
  );
}
