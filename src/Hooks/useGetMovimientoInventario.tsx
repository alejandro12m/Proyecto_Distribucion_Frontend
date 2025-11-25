import { useEffect, useState } from "react";
import type { GetMovimientoInventario } from "../Types/MovimientoInventario";

const URL = "https://almacenlp-production-3050.up.railway.app/api/MovimientoInventarios/Distribucion";

export function useGetMovimientoInventario() {
  const [dataMovimiento, setData] = useState<GetMovimientoInventario[]>([]);
  const [loadingMovimiento, setLoading] = useState(true);
  const [erroresMovimiento, setError] = useState<string | null>(null);

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

  return { dataMovimiento, loadingMovimiento, erroresMovimiento };
}
