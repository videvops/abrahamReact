import React from "react";
import CrudMaquinas from "./CrudMaquinas";
import MaquinaContextProvider from "../ComponentsCat/Contexts/MaquinasContext";
import { titulos, notificaciones } from "./Objetos/Constantes";

const CatalogoMaquinas = () => {
    return (
        <React.Fragment>
            <MaquinaContextProvider>
                <CrudMaquinas titulos={titulos} notificaciones={notificaciones} />
            </MaquinaContextProvider>
        </React.Fragment>
    );
};

export default CatalogoMaquinas;
