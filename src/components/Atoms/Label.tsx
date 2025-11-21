interface propsText{
    text:string;
    text2?:string;
}

export function Label(prop:propsText){
    const {text,text2} = prop;
    return(<>
        <p>{text}</p>
        <p>{text2}</p>

        </>
);
}