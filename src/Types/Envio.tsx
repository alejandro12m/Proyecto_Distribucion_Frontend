export interface Envio {
    codigoPedido : number | string;
    direccion : string;
    fechaPedido : string;
    estadoPedido : string;
}

export interface DetalleProducto {
    codigoProducto: string;
    cantidad: number;
    precioUnitarioVenta: number;
    subtotal:number;
}

export type TipoFiltroEnvio = "todos" | "pendientes" | "entregados" | "cancelados";
