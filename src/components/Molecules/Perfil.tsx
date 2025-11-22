import { Logo } from "../Atoms/Logo";

interface PerfilProps {
  titulo: string;
}

export function Perfil(props: PerfilProps) {
  const { titulo } = props;
  return (
    <div className="d-flex align-items-center gap-3 mb-4 py-3">
      <div 
        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#2d5016"
        }}
      >
        <Logo />
      </div>
      <div className="d-flex flex-column">
        <span className="fw-bold text-dark" style={{ fontSize: "16px", lineHeight: "1.2" }}>
          {titulo}
        </span>
        <span className="text-muted" style={{ fontSize: "14px", lineHeight: "1.2" }}>
          Distribución
        </span>
      </div>
    </div>
  );
}