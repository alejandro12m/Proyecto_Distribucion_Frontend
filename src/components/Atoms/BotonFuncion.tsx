interface PropPage {
  nombre: string;
  children?:React.ReactNode;
  onClick?: () => void;
  
}

export function BotonFuncion({ nombre,children, onClick }: PropPage) {
  return (
    <button 
      onClick={onClick} 
      type="button" 
      className="btn btn-custom btn-lg"
    >
      {children}
      <span> </span>
      {nombre}
    </button>
  );
}






