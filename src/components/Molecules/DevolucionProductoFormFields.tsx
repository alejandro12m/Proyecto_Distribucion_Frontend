import InputText from "../Atoms/InputText";
import { Label } from "../Atoms/Label";
import Select from "../Atoms/Select";
import type { PostDevolucionProducto } from "../../Types/DevolucionProducto";

type Props = {
  formData: PostDevolucionProducto;
  onFieldChange: (field: keyof PostDevolucionProducto, value: string | number) => void;
};

export function DevolucionProductoFormFields({ formData, onFieldChange }: Props) {
  const estadoOptions = [
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" },
  ];

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <Label text="Código Producto" />
        <InputText
          placeholder="Código Producto"
          value={formData.codigoProducto}
          onChange={(e) => onFieldChange("codigoProducto", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Código" />
        <InputText
          placeholder="Código"
          value={formData.codigo}
          onChange={(e) => onFieldChange("codigo", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Cantidad Buena" />
        <InputText
          type="number"
          placeholder="0"
          value={formData.cantidadBuena.toString()}
          onChange={(e) => onFieldChange("cantidadBuena", parseInt(e.target.value) || 0)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Estado" />
        <Select
          placeholder="Seleccione estado"
          value={formData.estado}
          onChange={(e) => onFieldChange("estado", e.target.value)}
          options={estadoOptions}
        />
      </div>

      <div className="col-12">
        <Label text="Descripción" />
        <InputText
          placeholder="Descripción de la devolución"
          value={formData.descripcion}
          onChange={(e) => onFieldChange("descripcion", e.target.value)}
        />
      </div>
    </div>
  );
}

