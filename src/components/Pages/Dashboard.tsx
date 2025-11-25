import { useEnvios } from "../../Hooks/useEnvios";
import { usePostMovimientoInventario } from "../../Hooks/usePostMovimientoInventario";
import { Titulo } from "../Atoms/Titulo";
import { CardsDashboard } from "../Organisms/CardsDashboard";

export function Dashboard() {
  const { data, loading, errores } = useEnvios("todos");
  const { postMovimientoInventario, loading: loadingPost, error: errorPost } = usePostMovimientoInventario();
  const enviarMovimiento = async () => {
    try {
      const movimiento = {
        codigo: "0001",
        codigoProducto: "P001",
        codigoCamion: "C001",
        codigoAlmacen: "ALM01",
        codigoVenta: "V001",
        codigoLote: "L001",
        cantidadBuena: 10,
        cantidadMala: 0,
        tipoMovimiento: "Salida",
        motivo: "Venta",
        fecha: "2025-02-01T15:30:00"
      };
      const respuesta = await postMovimientoInventario(movimiento);
      console.log("Respuesta del servidor:", respuesta);
      
    } catch (e) {
      console.log("Error enviando movimiento:", e);
    }
  };
  if (loading) return <p>Cargando...</p>;
  if (errores) return <p>Error: {errores}</p>;
  
  return (
    <>
      <Titulo titulo="Dashboard"></Titulo>
      <CardsDashboard
        Numeros={[data.length, 5, 12, 8]}
        Texts={["Ventas", "Pedidos", "Clientes", "Productos"]}
      ></CardsDashboard>
     <button onClick={enviarMovimiento} disabled={loadingPost}>
        {loadingPost ? "Enviando..." : "Enviar movimiento"}
      </button>

      {errorPost && <p>Error en POST: {errorPost}</p>}
    </>
  );
}
