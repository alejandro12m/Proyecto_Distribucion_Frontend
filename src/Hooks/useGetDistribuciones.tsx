import { useEffect, useState } from "react";
import type { Distribucion } from "../Types/Distribucion";

const URL = "https://proyecto1-production-daf8.up.railway.app/api/distribuciones";

export function useGetDistribuciones() {
  const [dataDistribuciones, setData] = useState<Distribucion[]>([]);
  const [loadingDistribuciones, setLoading] = useState(true);
  const [erroresDistribuciones, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) =>
        setError(error.message || "Error al cargar los datos")
      )
      .finally(() => setLoading(false));
  }, []);

  return { dataDistribuciones, loadingDistribuciones, erroresDistribuciones };
}

