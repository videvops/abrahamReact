import React from 'react';
import CrudTipoParo from './CrudTipoParo';
import TipoParoContextProvider from '../ComponentsCat/Contexts/TipoParoContext';
import { titulos, notificaciones } from './Objetos/Constantes';

const CatalogoTipoParo = () => {
    return (
        <React.Fragment>
        <TipoParoContextProvider>
            <CrudTipoParo titulos={titulos} notificaciones={notificaciones} />
        </TipoParoContextProvider>
    </React.Fragment>
    )
}

export default CatalogoTipoParo
