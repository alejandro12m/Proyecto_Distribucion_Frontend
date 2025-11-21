const BASE_URL = "https://proyectodistribucion-production.up.railway.app/api/Envios";

export async function EnvioPOST(
  codigo: number,
  fecha: string,
  detalles: string,
  tipo: string
): Promise<boolean> {
  try {
    // Formatear la fecha si es necesario (de YYYY-MM-DD a formato esperado)
    const fechaFormateada = fecha.split("T")[0]; // Si viene con tiempo, solo tomar la fecha
    
    // Codificar los parámetros para la URL
    const codigoEncoded = encodeURIComponent(codigo);
    const fechaEncoded = encodeURIComponent(fechaFormateada);
    const detallesEncoded = encodeURIComponent(detalles);
    const tipoEncoded = encodeURIComponent(tipo);
    
    const url = `${BASE_URL}/IngresarEnvios/${codigoEncoded}/${fechaEncoded}/${detallesEncoded}/${tipoEncoded}`;
    
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error al crear envío:", error);
    throw error;
  }
}

