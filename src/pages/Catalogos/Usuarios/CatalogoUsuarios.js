import React from 'react';
import CrudUsuarios from './CrudUsuarios';
import { titulos, notificaciones} from './Objetos/Constantes';

const CatalogoUsuarios = () => {
    return (
        <>
            <CrudUsuarios
                titulos={titulos}
                notificaciones={notificaciones}
            />
        </>
    )
}

export default CatalogoUsuarios
