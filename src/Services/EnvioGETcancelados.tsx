import { useFetch } from "../Hooks/useFetch";

export function useEnviosCancelados() {
  const URL = "https://localhost:7228/api/Envios/ListaEnviosCancelados";
  return useFetch(URL);
}
