import { useCallback, useState } from "react";
import type { DetalleProducto } from "../Types/Envio";

const BASE_URL = "https://ventassc-production.up.railway.app/api/Pedidos";

export function useDetallePedido() {
  const [detalles, setDetalles] = useState<DetalleProducto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetalles = useCallback(async (codigo: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Formatear el código con ceros a la izquierda (ej: 2 -> "00002")
      const codigoFormateado = codigo.toString().padStart(5, '0');
      const res = await fetch(`${BASE_URL}/MostrarDetalle/${codigoFormateado}`);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      const data = (await res.json()) as DetalleProducto[];
      setDetalles(data);
      return data;
    } catch (err) {
      console.error("Error al cargar detalles:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      setDetalles([]);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  return { detalles, loading, error, fetchDetalles } as const;
}

