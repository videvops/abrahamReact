import React from "react";
import CrudLineas from "./CrudModoFalla.js";
import LineaContextProvider from "../ComponentsCat/Contexts/ModoFallaContext";
import { titulos, notificaciones } from "./Objetos/Constantes";

const CatalogoModoFalla = () => {
    return (
        <React.Fragment>
            <LineaContextProvider>
                <CrudLineas titulos={titulos} notificaciones={notificaciones} />
            </LineaContextProvider>
        </React.Fragment>
    );
};

export default CatalogoModoFalla;
