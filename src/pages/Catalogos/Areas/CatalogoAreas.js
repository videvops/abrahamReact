import React from 'react';
import CrudAreas from './CrudAreas';                                        // CAMBIAR...
import AreaContextProvider from '../ComponentsCat/Contexts/AreaContext';    // CAMBIAR...
import { titulos, notificaciones } from './Objetos/ConstAreas';             // CAMBIAR... 

const CatalogoAreas = () => {
    return (
        <React.Fragment>
            <AreaContextProvider>
                <CrudAreas titulos={titulos} notificaciones={notificaciones} />
            </AreaContextProvider>
        </React.Fragment>
    )
}

export default CatalogoAreas
