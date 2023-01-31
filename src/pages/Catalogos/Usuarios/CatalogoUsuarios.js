import React from 'react';
import CrudUsuarios from './CrudUsuarios';
import UsuarioContextProvider from '../ComponentsCat/Contexts/UsuarioContext';
import { titulos, notificaciones } from './Objetos/Constantes';

const CatalogoUsuarios = () => {
    return (
        <React.Fragment>
        <UsuarioContextProvider>
            <CrudUsuarios titulos={titulos} notificaciones={notificaciones} />
        </UsuarioContextProvider>
    </React.Fragment>
    )
}

export default CatalogoUsuarios
