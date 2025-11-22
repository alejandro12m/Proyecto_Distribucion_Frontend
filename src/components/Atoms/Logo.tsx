import imagen from "../../assets/react.svg"
  
export function Logo(){

  return (
    <div style={{
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <img 
        src={imagen} 
        width={24} 
        height={24} 
        alt="Logo" 
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
}
