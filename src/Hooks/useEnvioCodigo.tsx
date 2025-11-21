import { useCallback, useState } from "react";
import type { Envio } from "../Types/Envio";

const BASE_URL = "https://proyectodistribucion-production.up.railway.app/api/Envios";

export function useEnvioCodigo() {
  const [envio, setEnvio] = useState<Envio | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEnvio = useCallback(async (codigo: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/Listar/${codigo}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as Envio;
      setEnvio(data);
      return data;
    } catch (err) {
      console.error("useEnvioCodigo error:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      setEnvio(undefined);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  return { envio, loading, error, fetchEnvio } as const;
}
