import { CardRoute } from "../Molecules/CardRoute";

interface propCardsInfo{
        titulolos:number;
        fecha:string;
        rutas:string[];
        onSelectCodigo?: (codigo: number) => void;
    }
interface propCards{
    List:propCardsInfo[];
}

export function CardsRoutes({List}:propCards){
    return (
        <>
            <div className="row">  
            {List.map((item, index)=>(
                    <CardRoute codigo={item.titulolos} fecha={item.fecha} rutas={item.rutas} index={index} onSelectCodigo={item.onSelectCodigo}></CardRoute>
                  ))}
            </div>
        </>
    );
}