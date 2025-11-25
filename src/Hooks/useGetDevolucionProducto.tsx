import { useEffect, useState } from "react";
import type { GetDevolucionProducto } from "../Types/DevolucionProducto";

const URL = "https://almacensanc-production.up.railway.app/api/DevolucionProducto";

export function useGetDevolucionProducto() {
  const [dataDevoluciones, setData] = useState<GetDevolucionProducto[]>([]);
  const [loadingDevoluciones, setLoading] = useState(true);
  const [erroresDevoluciones, setError] = useState<string | null>(null);

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

  return { dataDevoluciones, loadingDevoluciones, erroresDevoluciones };
}

