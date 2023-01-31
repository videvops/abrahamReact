import React from 'react';
//CAMBIAR...
import CrudTurnos from './CrudProducto';
import TurnoContextProvider from '../ComponentsCat/Contexts/TurnoContext';

import { titulos, notificaciones } from './Objetos/ConstProducto';             // CAMBIAR... 

const CatalogoProducto = () => {
    return (
        <>
            <TurnoContextProvider>
                <CrudTurnos titulos={titulos} notificaciones={notificaciones} />
            </TurnoContextProvider>
        </>
    )
}

export default CatalogoProducto
