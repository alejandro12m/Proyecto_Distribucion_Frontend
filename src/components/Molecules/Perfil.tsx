import { Logo } from "../Atoms/Logo";
import { Titulo } from "../Atoms/Titulo";
interface PerfilProps{
    titulo: string;
}

export function Perfil(props:PerfilProps){
const {titulo}=props;
return(
    <>
    <div style={{width:200, height:50}} className="d-flex flex-row">
        <Logo></Logo>
        <Titulo Titulo={titulo}></Titulo>
    </div>
    </>
);

}