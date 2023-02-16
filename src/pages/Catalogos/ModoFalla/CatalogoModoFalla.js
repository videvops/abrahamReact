import React from "react";
import CrudModoFalla from "./CrudModoFalla";
import ModoFallaProvider from "../ComponentsCat/Contexts/ModoFallaContext";
import { titulos, notificaciones } from "./Objetos/Constantes";

const CatalogoModoFalla = () => {
    return (
        <React.Fragment>
            <ModoFallaProvider>
                <CrudModoFalla titulos={titulos} notificaciones={notificaciones} />
            </ModoFallaProvider>
        </React.Fragment>
    );
};

export default CatalogoModoFalla;
