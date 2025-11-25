import { CardRoute } from "../Molecules/CardRoute";
import type { Ruta } from "../../Types/Ruta";

interface propCards {
    rutas: Ruta[];
    onSelectCodigo?: (codigo: string) => void;
}

export function CardsRoutes({ rutas, onSelectCodigo }: propCards) {
    // Filtrar rutas duplicadas basándose en codigoRuta
    const rutasUnicas = rutas.filter((ruta, index, self) => 
        index === self.findIndex((r) => r.codigoRuta === ruta.codigoRuta)
    );

    return (
        <>
            <div className="row">  
            {rutasUnicas.map((ruta, index) => {
                // Validar que ruta tenga paradas y mapear direcciones
                let direcciones: string[] = [];
                
                // Debug: ver qué contiene ruta
                console.log(`Ruta ${index}:`, ruta);
                console.log(`Paradas de ruta ${index}:`, ruta.paradas);
                
                if (ruta.paradas && Array.isArray(ruta.paradas) && ruta.paradas.length > 0) {
                    direcciones = ruta.paradas
                        .map(parada => {
                            // Debug: ver cada parada
                            console.log(`Parada:`, parada);
                            return parada?.direccion;
                        })
                        .filter((direccion): direccion is string => Boolean(direccion));
                }
                
                console.log(`Direcciones extraídas para ruta ${index}:`, direcciones);
                
                // Usar una clave única combinando codigoRuta e index
                const uniqueKey = `${ruta.codigoRuta}-${index}`;
                
                return (
                    <CardRoute 
                        key={uniqueKey}
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