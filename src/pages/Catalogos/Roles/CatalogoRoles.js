import React from 'react';

//CAMBIAR...
import CrudRoles from './CrudRoles';
import RolContextProvider from '../ComponentsCat/Contexts/RolContext';

import { titulos, notificaciones } from './Objetos/Constantes';

const CatalogoRoles = () => {
    return (
        <React.Fragment>
            <RolContextProvider>
                <CrudRoles titulos={titulos} notificaciones={notificaciones} />
            </RolContextProvider>
        </React.Fragment>
    )
}

export default CatalogoRoles
