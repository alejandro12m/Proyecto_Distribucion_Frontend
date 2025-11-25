import { useState } from "react";

const BASE_URL = "https://ventassc-production.up.railway.app/api/Pedidos/ActualizarEstadoEntregado";

export function useUpdatePedidoEstadoEntregado() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEstadoEntregado = async (codigoPedido: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/${codigoPedido}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
          ? `Error al actualizar estado del pedido: ${err.message}`
          : "Error al actualizar estado del pedido";

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateEstadoEntregado, loading, error };
}

