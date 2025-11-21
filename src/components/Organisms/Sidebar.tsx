import { Pages } from "../Molecules/Pages";
import { Perfil } from "../Molecules/Perfil";

interface ListarPages {
  titulo: string;
  nombres: string[];
  links: string[];
}

export function Sidebar({ titulo, nombres, links }: ListarPages) {
  const items = nombres.map((n, i) => ({
    nombres: n,
    links: links[i]
  }));

  return (
    <>
      <div>
        <Perfil titulo={titulo} />
        <br />
        <Pages items={items} />
      </div>
    </>
  );
}
