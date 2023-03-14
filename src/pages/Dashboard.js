import React, { useState } from "react";
import { Button } from 'primereact/button';
import Registrado from "./Catalogos/Usuarios/Dialogos/Registrado";
// import NuevoUsuario from '../components/nuevoUsuario/NuevoUsuario'


const Dashboard = () => {
    const [mostrar, setMostrar] = useState(true)
    return (
        <div>
            {/* Dashboard */}
            {/* <NuevoUsuario /> */}
            <Registrado usuario="persona 1" mostrar={mostrar} setMostrar={setMostrar} />
        </div>
    );
};

// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
// };

// export default React.memo(Dashboard, comparisonFn);
export default Dashboard
