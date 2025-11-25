import { useState } from "react";
import type { TipoFiltroEnvio } from "../../Types/Envio";
import type { PedidoPorRuta } from "../../Types/Ruta";
import { Titulo } from "../Atoms/Titulo";
import { FilterBar } from "../Molecules/FilterBar";
import { SearchBar } from "../Molecules/SearchBar";
import { PedidosRutaCard } from "../Molecules/PedidosRutaCard";

type PropEnvio = {
  Text: string;
  onSelectPedido?: (pedido: PedidoPorRuta) => void | Promise<void>;
  pedidos: PedidoPorRuta[];
  loading: boolean;
  errores: string | null;
};

export function ShippingManagementRutas({ Text, onSelectPedido, pedidos, loading, errores }: PropEnvio) {
  const [tipoFiltro, setTipoFiltro] = useState<TipoFiltroEnvio>("todos");

  const handleFilter = (tipo: TipoFiltroEnvio) => {
    setTipoFiltro(tipo);
  };

  // Filtrar pedidos según el filtro seleccionado
  const pedidosFiltrados = pedidos.filter((pedido) => {
    if (tipoFiltro === "todos") return true;
    if (tipoFiltro === "pendientes") return pedido.estadoPedido === "en proceso" || pedido.estadoPedido === "Pendiente";
    if (tipoFiltro === "entregados") return pedido.estadoPedido === "entregado" || pedido.estadoPedido === "Entregado";
    if (tipoFiltro === "cancelados") return pedido.estadoPedido === "cancelado" || pedido.estadoPedido === "Cancelado";
    return true;
  });

  return (
    <div>
      <Titulo
        titulo="Gestion de Pedidos de Ruta"
        SubTitulo="Monitoreo de Cargas"
      ></Titulo>
      <FilterBar onFilterChange={handleFilter}></FilterBar>
      <SearchBar text={Text}></SearchBar>
      {errores && (
        <div className="alert alert-danger mt-3" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Error: {errores}
        </div>
      )}
      {loading && (
        <div className="d-flex align-items-center gap-2 mt-3">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <span className="text-muted">Cargando pedidos...</span>
        </div>
      )}
      {!loading && !errores && (
        <PedidosRutaCard datos={pedidosFiltrados || []} onSelectPedido={onSelectPedido} />
      )}
    </div>
  );
}

