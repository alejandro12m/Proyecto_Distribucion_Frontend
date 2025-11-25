import InputText from "../Atoms/InputText";
import { Label } from "../Atoms/Label";
import Select from "../Atoms/Select";
import type { PostMovimientoInventario } from "../../Types/MovimientoInventario";

type Props = {
  formData: PostMovimientoInventario;
  onFieldChange: (field: keyof PostMovimientoInventario, value: string | number) => void;
};

export function MovimientoInventarioFormFields({ formData, onFieldChange }: Props) {
  const tipoMovimientoOptions = [
    { value: "Entrada", label: "Entrada" },
    { value: "Salida", label: "Salida" },
  ];

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <Label text="Código" />
        <InputText
          placeholder="Código"
          value={formData.codigo}
          onChange={(e) => onFieldChange("codigo", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Código Producto" />
        <InputText
          placeholder="Código Producto"
          value={formData.codigoProducto}
          onChange={(e) => onFieldChange("codigoProducto", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Código Camión" />
        <InputText
          placeholder="Código Camión"
          value={formData.codigoCamion}
          onChange={(e) => onFieldChange("codigoCamion", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Código Almacén" />
        <InputText
          placeholder="Código Almacén"
          value={formData.codigoAlmacen}
          onChange={(e) => onFieldChange("codigoAlmacen", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Código Venta" />
        <InputText
          placeholder="Código Venta"
          value={formData.codigoVenta}
          onChange={(e) => onFieldChange("codigoVenta", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Código Lote" />
        <InputText
          placeholder="Código Lote"
          value={formData.codigoLote}
          onChange={(e) => onFieldChange("codigoLote", e.target.value)}
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
        <Label text="Cantidad Mala" />
        <InputText
          type="number"
          placeholder="0"
          value={formData.cantidadMala.toString()}
          onChange={(e) => onFieldChange("cantidadMala", parseInt(e.target.value) || 0)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Tipo de Movimiento" />
        <Select
          placeholder="Seleccione tipo de movimiento"
          value={formData.tipoMovimiento}
          onChange={(e) => onFieldChange("tipoMovimiento", e.target.value)}
          options={tipoMovimientoOptions}
        />
      </div>

      <div className="col-md-6">
        <Label text="Motivo" />
        <InputText
          placeholder="Motivo"
          value={formData.motivo}
          onChange={(e) => onFieldChange("motivo", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <Label text="Fecha" />
        <InputText
          type="datetime-local"
          value={formData.fecha ? new Date(formData.fecha).toISOString().slice(0, 16) : ""}
          onChange={(e) => {
            const dateValue = e.target.value;
            if (dateValue) {
              const isoString = new Date(dateValue).toISOString();
              onFieldChange("fecha", isoString);
            } else {
              onFieldChange("fecha", "");
            }
          }}
        />
      </div>
    </div>
  );
}

