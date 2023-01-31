import React from 'react';
import CrudPlantas from './CrudPlantas';
import PlantaContextProvider from '../ComponentsCat/Contexts/PlantaContext';
import { titulos, notificaciones } from './Objetos/Constantes';

const CatalogoPlantas = () => {
    return (
        <React.Fragment>
        <PlantaContextProvider>
            <CrudPlantas titulos={titulos} notificaciones={notificaciones} />
        </PlantaContextProvider>
    </React.Fragment>
    )
}

export default CatalogoPlantas
