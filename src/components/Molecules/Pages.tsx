import { BotonLink } from "../Atoms/BotonLink";

interface PagesItems{
nombres:string;
links:string;
}
interface PagesProps{
  items:PagesItems[];
}
export function Pages({items}:PagesProps){
    return(<> 
<div  style={{width:200, height:50}} className="">
      {items.map((item,i)=>{
        return(<BotonLink key={i} nombre={item.nombres} page={item.links} ></BotonLink>  
);
      })}
    </div>
    </>);
}