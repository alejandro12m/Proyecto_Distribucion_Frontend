export interface GetMovimientoInventario{

        codigo:string;
        codigoProducto :number;
        cantidadBuena: number;

}
export interface PostMovimientoInventario{
        codigo:string;
        codigoProducto:string;
        codigoCamion:string;
        codigoAlmacen:string;
        codigoVenta:string;
        codigoLote:string;
        cantidadBuena:number;
        cantidadMala:number;
        tipoMovimiento:string;
        motivo:string;
        fecha:string;
}