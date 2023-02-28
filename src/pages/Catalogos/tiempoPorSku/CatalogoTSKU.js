import React from "react";
import CrudTSKU from "./CrudTSKU"
import TiempoporSKUContext from "../ComponentsCat/Contexts/MaquinasContext";
import { titulos, notificaciones } from "./Objetos/Constantes";

const CatalogoTSKU = () => {
    return (
        <React.Fragment>
            <TiempoporSKUContext>
                <CrudTSKU titulos={titulos} notificaciones={notificaciones} />
            </TiempoporSKUContext>
        </React.Fragment>
    );
};

export default CatalogoTSKU;
