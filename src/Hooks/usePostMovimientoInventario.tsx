import { useState } from "react";
import type { PostMovimientoInventario } from "../Types/MovimientoInventario";

export function usePostMovimientoInventario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMovimientoInventario = async (
    movimiento: PostMovimientoInventario
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Si la fecha está vacía, usar la fecha actual
      const movimientoCompleto: PostMovimientoInventario = {
        ...movimiento,
        fecha: movimiento.fecha || new Date().toISOString(),
      };

      // Asegurar que todos los campos requeridos estén presentes
      if (!movimientoCompleto.codigo || !movimientoCompleto.codigoProducto) {
        throw new Error("Código y código de producto son requeridos");
      }

      const res = await fetch(
        "https://almacenlp-production-3050.up.railway.app/api/MovimientoInventarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movimientoCompleto),
        }
      );

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
          ? `Error al agregar movimiento: ${err.message}`
          : "Error al agregar movimiento";

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postMovimientoInventario, loading, error };
}
