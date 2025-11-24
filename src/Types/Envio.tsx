export interface Envio {
    codigo : number;
    codigoCliente : string;
    codigoEmpleado : string;
    fechaPedido : string;
}

export interface DetalleProducto {
    codigoProducto: string;
    cantidad: number;
    precioUnitarioVenta: number;
}

export type TipoFiltroEnvio = "todos" | "pendientes" | "entregados" | "cancelados";
