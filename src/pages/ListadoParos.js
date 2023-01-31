import React, { useEffect, useState } from 'react'
import CabezalListParos from '../components/listadoParo/Cabezal/CabezalListParos'
import TablaListParos from '../components/listadoParo/Tabla/TablaListParos'

const ListadoParos = () => {
    const [registros, setRegistros] = useState([])              // Guarda registros de back-end
    const [tieneRegistros,setTieneRegistros]=useState(false)    // Verifica que tenga registros
    useEffect(() => {
        if (registros.length > 0) {
            setTieneRegistros(true)
        }
    }, [registros])
//--------------------| Valor que regresara  |--------------------
    return (
        <>
            <CabezalListParos 
                setRegistros={setRegistros}     // Se actualizan los registros
                
            /> 
            <TablaListParos 
                registros={registros}           // Se muestran los registros
                tieneRegistros={tieneRegistros}
            /> 
        </>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ListadoParos, comparisonFn);
