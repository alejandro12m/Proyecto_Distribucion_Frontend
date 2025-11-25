export interface Parada {
  direccion: string;
}

export interface Ruta {
  codigoRuta: string;
  fechaCreacion: string;
  paradas: Parada[];
}

export interface PedidoPorRuta {
  codigoPedido: string;
  direccion: string;
  fechaPedido: string;
  estadoPedido: string;
}

