interface propCard {
  index: number;
  codigo: string;
  fecha: string;
  rutas: string[];
  onSelectCodigo?: (codigo: string) => void;
}

export function CardRoute(props: propCard) {
  const { codigo, fecha, rutas, index, onSelectCodigo } = props;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <>
      <div 
      key={index} 
      className="col-12 col-md-6 col-lg-4" 
      style={{cursor:onSelectCodigo ? "pointer" : "default"}}
        onClick={() => onSelectCodigo?.(codigo)}
      >
        <div className="card p-3 shadow-sm h-100">
          <h5 className="fw-bold mb-1">Ruta {codigo}</h5>
          <small className="text-muted">Fecha: {formatDate(fecha)}</small>
          <div className="mt-2">
            <strong className="d-block mb-2">Paradas:</strong>
            {rutas && rutas.length > 0 ? (
              <ul className="mb-0 ps-3">
                {rutas.map((direccion, i) => (
                  <li key={i} className="mb-1">{direccion}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted mb-0 small">No hay paradas registradas</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
