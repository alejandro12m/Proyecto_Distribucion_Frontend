import { useState } from "react";
import { DistribucionesTable } from "../Molecules/DistribucionesTable";
import { useGetDistribuciones } from "../../Hooks/useGetDistribuciones";

export function DistribucionesManagement() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { dataDistribuciones, loadingDistribuciones, erroresDistribuciones } = useGetDistribuciones();

  const handleUpdate = () => {
    setRefreshKey(prev => prev + 1);
    window.location.reload();
  };

  return (
    <div>
      <DistribucionesTable
        key={refreshKey}
        distribuciones={dataDistribuciones}
        loading={loadingDistribuciones}
        error={erroresDistribuciones}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

