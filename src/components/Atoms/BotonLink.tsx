interface propPage{
    nombre:string;
    page:string;
}

export function BotonLink(prop:propPage){
const {nombre,page}=prop;

return(
    <>
    <button onClick={()=>{window.location.href = page;}}  type="button" className="btn btn-custom btn-lg">{nombre}</button>
    </>
)

}