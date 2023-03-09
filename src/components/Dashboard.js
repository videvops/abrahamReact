import React from "react";
import NuevoUsuario from './nuevoUsuario/NuevoUsuario'


const Dashboard = () => {
    return (
        <div>
            {/* Dashboard */}
            <NuevoUsuario />
        </div>
    );
};

// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
// };

// export default React.memo(Dashboard, comparisonFn);
export default Dashboard
