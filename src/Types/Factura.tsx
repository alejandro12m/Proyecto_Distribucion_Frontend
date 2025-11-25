export interface PostFactura {
  nroFactura: string;
  monto: number;
  concepto: string;
  metodoPago: string;
  idChoferOVendedor: number;
}

export interface GetFactura {
  id: number;
  nroFactura: string;
  monto: number;
  concepto: string;
  metodoPago: string;
  idChoferOVendedor: number;
  fechaRegistro: string;
  estado: string;
}

