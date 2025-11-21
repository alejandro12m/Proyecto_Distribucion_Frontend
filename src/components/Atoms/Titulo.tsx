interface propsTitulo{
    titulo:string;
    SubTitulo?:string;
}

export function Titulo(prop:propsTitulo){
    const {titulo,SubTitulo} = prop;
    return(<>
    <h1>{titulo}</h1>
    <h2>{SubTitulo}</h2>
        </>
);
}