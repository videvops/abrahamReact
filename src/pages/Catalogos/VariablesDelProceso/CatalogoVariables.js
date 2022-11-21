import React from "react";
import CrudVariables from "./CrudVariables";
import VariablesContextProvider from "../ComponentsCat/Contexts/VariablesContext";
import { titulos, notificaciones } from "./Objetos/Constantes";

const CatalogoVariables = () => {
    return (
        <React.Fragment>
            <VariablesContextProvider>
                <CrudVariables titulos={titulos} notificaciones={notificaciones} />
            </VariablesContextProvider>
        </React.Fragment>
    );
};

export default CatalogoVariables;
