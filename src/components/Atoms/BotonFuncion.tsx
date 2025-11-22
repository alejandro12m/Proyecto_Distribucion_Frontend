interface PropPage {
  nombre: string;
  children?: React.ReactNode;

  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function BotonFuncion({ nombre, children, onClick }: PropPage) {
  return (
    <button 
      onClick={onClick}
      type="button"
      className=""
    >
      {children}
      <span> </span>
      {nombre}
    </button>
  );
}
