export interface Envio {
  codigo: number;
  fechaEnvio: string;
  detalles: string;
  tipo: string;
  estado: string;
}

export type TipoFiltroEnvio = "todos" | "pendientes" | "entregados" | "cancelados";
