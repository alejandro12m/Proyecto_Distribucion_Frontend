import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { DeleteIcon } from "./components/Atoms/Iconos/Delete";
import "bootstrap-icons/font/bootstrap-icons.css";
import { EditIcon } from "./components/Atoms/Iconos/EditIcon";
import { PlusIcon } from "./components/Atoms/Iconos/PlusIcon";
import InputText from "./components/Atoms/InputText";
import { Sidebar } from "./components/Organisms/Sidebar";
import GestionEnvios from "./components/Pages/GestionEnvios";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeleteIcon></DeleteIcon>
    <EditIcon></EditIcon>
    <PlusIcon></PlusIcon>
    <InputText placeholder="Escriba aqui "></InputText>
    <br />
    <br />
    <br />
    <br />
    <br />
    <Sidebar
      titulo="Distribucion Prolac"
      nombres={["Dasboard", "Gestion de Envios", "Gestion de Cargas"]}
      links={[
        "https://www.figma.com/design/b9FVdbZXLG3v6d14mhZitK/Untitled?node-id=0-1&p=f&t=fDfRDEVu65YtZB5Z-0",
        "https://getbootstrap.com/docs/5.3/components/card",
        "https://vjudge.net/problem/CodeForces-1883B",
      ]}
    ></Sidebar>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <GestionEnvios></GestionEnvios>
  </StrictMode>

);
