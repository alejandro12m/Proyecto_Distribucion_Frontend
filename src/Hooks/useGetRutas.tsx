import { useEffect, useState } from "react";
import type { Ruta } from "../Types/Ruta";

const BASE_URL = "https://ventassc-production.up.railway.app/api/Rutas/ListaRutas";

export function useGetRutas() {
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Asegurar que data sea un array
        if (Array.isArray(data)) {
          console.log("Rutas recibidas:", data);
          // Debug: verificar estructura de cada ruta
          data.forEach((ruta, index) => {
            console.log(`Ruta ${index}:`, ruta);
            console.log(`Paradas de ruta ${index}:`, ruta.paradas);
          });
          setRutas(data);
        } else {
          console.error("Los datos no son un array:", data);
          setRutas([]);
          setError("Los datos recibidos no tienen el formato esperado");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar rutas:", error);
        setError(error.message || "Error al cargar las rutas");
        setRutas([]); // Asegurar que siempre sea un array
        setLoading(false);
      });
  }, []);

  return { rutas, loading, error };
}

