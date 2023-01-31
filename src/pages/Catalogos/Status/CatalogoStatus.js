import React from "react";
import CrudLineas from "./CrudStatus";
import LineaContextProvider from "../ComponentsCat/Contexts/StatusContext";
import { titulos, notificaciones } from "./Objetos/Constantes";

const CatalogoStatus = () => {
    return (
        <React.Fragment>
            <LineaContextProvider>
                <CrudLineas titulos={titulos} notificaciones={notificaciones} />
            </LineaContextProvider>
        </React.Fragment>
    );
};

export default CatalogoStatus;
