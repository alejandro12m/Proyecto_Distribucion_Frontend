import InputText from "../Atoms/InputText";

interface propSearchBar{
    text:string;
}
export function SearchBar(props:propSearchBar){
    const {text} = props;
return(
<>

<InputText placeholder={text}></InputText>
    

</>
);

}