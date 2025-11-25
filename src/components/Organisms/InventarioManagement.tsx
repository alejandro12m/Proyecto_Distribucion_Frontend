import { useState } from "react";
import { BotonFuncion } from "../Atoms/BotonFuncion";
import { Titulo } from "../Atoms/Titulo";
import { DevolucionProductoFormFields } from "../Molecules/DevolucionProductoFormFields";
import { DevolucionesTable } from "../Molecules/DevolucionesTable";
import { useGetDevolucionProducto } from "../../Hooks/useGetDevolucionProducto";
import { usePostDevolucionProducto } from "../../Hooks/usePostDevolucionProducto";
import type { PostDevolucionProducto } from "../../Types/DevolucionProducto";

export function InventarioManagement() {
  const { dataDevoluciones, loadingDevoluciones, erroresDevoluciones } = useGetDevolucionProducto();
  const { postDevolucionProducto, loading, error } = usePostDevolucionProducto();

  const [formData, setFormData] = useState<PostDevolucionProducto>({
    codigoProducto: "",
    codigo: "",
    cantidadBuena: 0,
    estado: "Activo",
    descripcion: "",
  });

  const handleFieldChange = (field: keyof PostDevolucionProducto, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postDevolucionProducto(formData);
      
      // Resetear formulario después de éxito
      setFormData({
        codigoProducto: "",
        codigo: "",
        cantidadBuena: 0,
        estado: "Activo",
        descripcion: "",
      });
      alert("Devolución de producto registrada exitosamente");
      // Recargar la lista de devoluciones
      window.location.reload();
    } catch (err) {
      console.error("Error al registrar devolución:", err);
    }
  };

  return (
    <div>
      <div className="border rounded p-4 mb-4">
        <Titulo titulo="Registrar Devolución de Producto" />
        
        <form onSubmit={handleSubmit}>
          <DevolucionProductoFormFields
            formData={formData}
            onFieldChange={handleFieldChange}
          />

          {error && (
            <div className="alert alert-danger mt-3 mb-0" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Error: {error}
            </div>
          )}

          <div className="mt-3 d-flex justify-content-end gap-2">
            <BotonFuncion
              nombre={loading ? "Registrando..." : "Registrar Devolución"}
              onClick={(e) => {
                e.preventDefault();
                if (!loading) {
                  handleSubmit(e);
                }
              }}
            />
          </div>
        </form>
      </div>

      <DevolucionesTable
        devoluciones={dataDevoluciones}
        loading={loadingDevoluciones}
        error={erroresDevoluciones}
      />
    </div>
  );
}

