import React from 'react';
import CrudLineas from './CrudLineas';
import LineaContextProvider from '../ComponentsCat/Contexts/LineaContext';
import { titulos, notificaciones} from './Objetos/Constantes';

const CatalogoLineas = () => {
    return (
        <React.Fragment>
            <LineaContextProvider>
                <CrudLineas titulos={titulos} notificaciones={notificaciones} />
            </LineaContextProvider>
        </React.Fragment>
    )
}

export default CatalogoLineas
