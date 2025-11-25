import { useState } from "react";
import type { PostDevolucionProducto } from "../Types/DevolucionProducto";

const BASE_URL = "https://almacensanc-production.up.railway.app/api/DevolucionProducto";

export function usePostDevolucionProducto() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postDevolucionProducto = async (devolucion: PostDevolucionProducto) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(devolucion),
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
          ? `Error al registrar devolución: ${err.message}`
          : "Error al registrar devolución";

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postDevolucionProducto, loading, error };
}

