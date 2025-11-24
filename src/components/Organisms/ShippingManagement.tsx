import { useState } from "react";
import { useEnvios } from "../../Hooks/useEnvios";
import type { TipoFiltroEnvio, Envio } from "../../Types/Envio";
import { BotonFuncion } from "../Atoms/BotonFuncion";
import { Titulo } from "../Atoms/Titulo";
import { FilterBar } from "../Molecules/FilterBar";
import { SearchBar } from "../Molecules/SearchBar";
import { ShippingCard } from "../Molecules/ShippingCard";
import { ShippingForm } from "../Molecules/ShippingForm";

type PropEnvio = {
  Text: string;
  onSelectEnvio?: (envio: Envio) => void | Promise<void>;
};

export function ShippingManagement({ Text, onSelectEnvio }: PropEnvio) {
  const [tipoFiltro, setTipoFiltro] = useState<TipoFiltroEnvio>("todos");
  const [showForm, setShowForm] = useState(false);

  const { data, loading, errores } = useEnvios(tipoFiltro);

  const handleFilter = (tipo: TipoFiltroEnvio) => {
    setTipoFiltro(tipo);
  };

  const handleFormSuccess = () => {
    window.location.reload();
  };

  return (
    <>
      <div>
        <Titulo
          titulo="Gestion de Envios"
          SubTitulo="Monitoreo de Cargas"
        ></Titulo>
        <BotonFuncion
          nombre="Registro de Nuevo Envio"
          onClick={() => setShowForm(true)}
        ></BotonFuncion>
        <FilterBar onFilterChange={handleFilter}></FilterBar>
        <SearchBar text={Text}></SearchBar>
        {errores && <p>Error: {errores}</p>}
        {loading && <p>Loading...</p>}
        <ShippingCard datos={data || []} onSelectEnvio={onSelectEnvio} />
      </div>
      {showForm && (
        <ShippingForm
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}
