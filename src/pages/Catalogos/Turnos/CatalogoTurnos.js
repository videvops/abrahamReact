import React from 'react';
//CAMBIAR...
import CrudTurnos from './CrudTurnos';
import TurnoContextProvider from '../ComponentsCat/Contexts/TurnoContext';

import { titulos, notificaciones } from './Objetos/ConstTurnos';             // CAMBIAR... 

const CatalogoTurnos = () => {
    return (
        <React.Fragment>
            <TurnoContextProvider>
                <CrudTurnos titulos={titulos} notificaciones={notificaciones} />
            </TurnoContextProvider>
        </React.Fragment>
    )
}

export default CatalogoTurnos
