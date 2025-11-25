import { useState } from "react";
import type { Distribucion } from "../Types/Distribucion";

const BASE_URL = "https://proyecto1-production-daf8.up.railway.app/api/distribuciones";

export function useUpdateDistribucionEstado() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEstadoEntregado = async (distribucion: Distribucion) => {
    setLoading(true);
    setError(null);

    try {
      // Crear el objeto distribucionDto con todos los campos, cambiando el estado a "entregado"
      const distribucionDto = {
        distribucionID: distribucion.distribucionID,
        empleadoID: distribucion.empleadoID,
        fecha: distribucion.fecha,
        litrosEntregados: distribucion.litrosEntregados,
        destino: distribucion.destino,
        estado: "entregado",
      };

      const res = await fetch(`${BASE_URL}/${distribucion.distribucionID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(distribucionDto),
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
          ? `Error al actualizar estado: ${err.message}`
          : "Error al actualizar estado";

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateEstadoEntregado, loading, error };
}

