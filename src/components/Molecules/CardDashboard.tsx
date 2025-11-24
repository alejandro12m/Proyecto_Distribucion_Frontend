import { Titulo } from "../Atoms/Titulo";

interface propCardDasboard{
    numero:number;
    text:string;
    onSelectCodigo?: (codigo: number) => void;

}

export function CardDashboard (prop:propCardDasboard){
const {numero,text}= prop;
    return(
        <>
        <div className="">
            <div className="card text-center border border-dark rounded-circle p-4">
            <h1 >
              {numero}  
            </h1>
            </div>
            <Titulo titulo="" SubTitulo={text}></Titulo>
        </div>
        
        </>
    );

}