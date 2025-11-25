import { CardRoute } from "../Molecules/CardRoute";
import type { Ruta } from "../../Types/Ruta";

interface propCards {
    rutas: Ruta[];
    onSelectCodigo?: (codigo: string) => void;
}

export function CardsRoutes({ rutas, onSelectCodigo }: propCards) {

    return (
        <>
            <div className="row">  
            {rutas.map((ruta, index) => {
                // Validar que ruta tenga paradas y mapear direcciones
                let direcciones: string[] = [];
                
                if (ruta.paradas && Array.isArray(ruta.paradas)) {
                    direcciones = ruta.paradas
                        .map(parada => parada?.direccion)
                        .filter((direccion): direccion is string => Boolean(direccion));
                }
                
                return (
                    <CardRoute 
                        key={ruta.codigoRuta || index}
                        codigo={ruta.codigoRuta} 
                        fecha={ruta.fechaCreacion} 
                        rutas={direcciones} 
                        index={index} 
                        onSelectCodigo={onSelectCodigo}
                    />
                );
            })}
            </div>
        </>
    );
}