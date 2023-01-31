import React, { useState } from "react";
import Cabezal from "../components/indicadoresTurno/Tabla/Cabezal";
import Tabla from "../components/indicadoresTurno/Tabla/Tabla";

const IndicadoresTurno = () => {
    const [registros, setRegistros] = useState([])
    const [cargando, setCargando] = useState(false)

//--------------------| Valor que regresara |--------------------
    return (
        <>
            <Cabezal
                setRegistros={setRegistros}
                setCargando={setCargando}
            />
            <Tabla
                registros={registros}
                cargando={cargando}
            />
        </>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(IndicadoresTurno, comparisonFn);
