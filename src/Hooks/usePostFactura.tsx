import { useState } from "react";
import type { PostFactura } from "../Types/Factura";

const BASE_URL = "https://contabilidadfin-production.up.railway.app/api/Ingresos/venta-ruta";

export function usePostFactura() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postFactura = async (factura: PostFactura) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(factura),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(
          `${res.status} - ${res.statusText}: ${errorBody}`
        );
      }

      return await res.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? `Error al registrar factura: ${err.message}`
          : "Error al registrar factura";

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postFactura, loading, error };
}

