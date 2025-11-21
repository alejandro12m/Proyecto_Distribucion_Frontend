import { useFetch } from "./useFetch";
import type { TipoFiltroEnvio } from "../Types/Envio";

const BASE_URL = "https://proyectodistribucion-production.up.railway.app/api/Envios";

const URLS: Record<TipoFiltroEnvio, string> = {
  todos: `${BASE_URL}/ListaEnvios`,
  pendientes: `${BASE_URL}/ListaEnviosPendientes`,
  entregados: `${BASE_URL}/ListaEnviosEntregados`,
  cancelados: `${BASE_URL}/ListaEnviosCancelados`,
};

export function useEnvios(tipoFiltro: TipoFiltroEnvio) {
  const URL = URLS[tipoFiltro];
  return useFetch(URL);
}

