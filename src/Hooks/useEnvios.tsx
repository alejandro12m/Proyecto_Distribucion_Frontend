import { useFetch } from "./useFetch";
import type { TipoFiltroEnvio } from "../Types/Envio";

const BASE_URL = "https://ventassc-production.up.railway.app/api/Pedidos";

const URLS: Record<TipoFiltroEnvio, string> = {
  todos: `${BASE_URL}/ListaDePedidos`,
  pendientes: `${BASE_URL}/ListarPedidosEnProceso`,
  entregados: `${BASE_URL}/ListarPedidosEntregados`,
  cancelados: `${BASE_URL}/ListarPedidosCancelados`,
};

export function useEnvios(tipoFiltro: TipoFiltroEnvio) {
  const URL = URLS[tipoFiltro];
  return useFetch(URL);
}

