import { useEffect, useState } from "react";
import type { Envio } from "../Types/Envio";

export function useFetch(URL: string) {
  const [data, setData] = useState<Envio[]>([]);
  const [loading, setLoading] = useState(true);
  const [errores, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((errores) => setError(errores.message || "Error al cargar los datos"))
      .finally(() => setLoading(false));
  }, [URL]);

  return { data, loading, errores };
}

