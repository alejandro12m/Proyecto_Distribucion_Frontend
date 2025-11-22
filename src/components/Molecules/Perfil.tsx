import { Logo } from "../Atoms/Logo";

interface PerfilProps {
  titulo: string;
}

export function Perfil(props: PerfilProps) {
  const { titulo } = props;
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "12px",
      marginBottom: "32px",
      padding: "16px 0"
    }}>
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "#2d5016",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }}>
        <Logo />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ 
          fontSize: "16px", 
          fontWeight: "bold", 
          color: "#333",
          lineHeight: "1.2"
        }}>
          {titulo}
        </span>
        <span style={{ 
          fontSize: "14px", 
          color: "#666",
          lineHeight: "1.2"
        }}>
          Distribución
        </span>
      </div>
    </div>
  );
}