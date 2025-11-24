import { useEnvios } from "../../Hooks/useEnvios";
import { Titulo } from "../Atoms/Titulo";
import { CardsDashboard } from "../Organisms/CardsDashboard"
export function Dashboard() {
  const { data, loading, errores } = useEnvios("todos");
    if (loading) return <p>Cargando...</p>;
   if (errores) return <p>Error: {errores}</p>;

  return (
    
    <>
      <Titulo titulo="Dashboard"></Titulo>
      <CardsDashboard Numeros={[data.length, 5, 12, 8]} Texts={["Ventas", "Pedidos", "Clientes", "Productos"]}></CardsDashboard>
    </>
  );
}