import { useState, useEffect } from "react";
import type { PedidoPorRuta } from "../Types/Ruta";
import type { DetalleProducto } from "../Types/Envio";

const BASE_URL = "https://ventassc-production.up.railway.app/api/Rutas/PedidosPorRuta";

// Hook para obtener pedidos por ruta
export function useRutaData(codigoRuta?: string) {
  const [pedidos, setPedidos] = useState<PedidoPorRuta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!codigoRuta) {
      // Usar setTimeout para evitar el warning de setState en useEffect
      const timer = setTimeout(() => {
        setPedidos([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    let cancelled = false;
    
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${BASE_URL}/${codigoRuta}`);
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const data = await response.json();
        
        if (!cancelled) {
          setPedidos(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          const errorMessage = err instanceof Error ? err.message : "Error al cargar los pedidos";
          setError(errorMessage);
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [codigoRuta]);

  return { pedidos, loading, error };
}

// Hook simulado para detalles de pedido (mantener para compatibilidad)
export function useDetallePedidoRuta() {
  const [detalles, setDetalles] = useState<DetalleProducto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetalles = async () => {
    setLoading(true);
    setError(null);
    // Simulación de carga
    setTimeout(() => {
      const detallesSimulados: DetalleProducto[] = [
        {
          codigoProducto: "P001",
          cantidad: 10,
          precioUnitarioVenta: 25.50,
          subtotal: 255.00,
        },
        {
          codigoProducto: "P002",
          cantidad: 5,
          precioUnitarioVenta: 15.75,
          subtotal: 78.75,
        },
        {
          codigoProducto: "P003",
          cantidad: 8,
          precioUnitarioVenta: 30.00,
          subtotal: 240.00,
        },
      ];
      setDetalles(detallesSimulados);
      setLoading(false);
    }, 300);
  };

  return { detalles, loading, error, fetchDetalles };
}
