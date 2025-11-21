import { useEffect, useState } from "react";
import type { Envio } from "../Types/Envio";

export function EnvioPOSTtodos() {
  const [datos, setDatos] = useState<Envio[]>([]);

  useEffect(() => {
    const URL = "https://proyectodistribucion-production.up.railway.app/api/Envios/ListaEnvios";

    fetch(URL)
      .then((res) => res.json())
      .then((datos: Envio[]) => {
        setDatos(datos); 
      });
  }, []);

  return (
   {datos}
  );
}
