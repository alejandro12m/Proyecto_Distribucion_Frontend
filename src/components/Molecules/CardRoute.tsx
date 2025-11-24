interface propCard {
  index: number;
  codigo: number;
  fecha: string;
  rutas: string[];
  onSelectCodigo?: (codigo: number) => void;
}

export function CardRoute(props: propCard) {
  const { codigo, fecha, rutas, index, onSelectCodigo } = props;
  return (
    <>
      <div 
      key={index} 
      className="col-12 col-md-6 col-lg-4" 
      style={{cursor:onSelectCodigo ? "pointer" : "default"}}
        onClick={() => onSelectCodigo?.(codigo)}

      >

        <div className="card p-3 shadow-sm">
          <h5 className="fw-bold mb-1">Ruta #{codigo}</h5>
          <small className="text-muted">{fecha}</small>
          <ul className="mt-2 mb-0">
            {rutas.map((ruta, i) => (
              <li key={i}>{ruta}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
