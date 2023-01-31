import React from "react";

const StatusLineas = (props) => {


    // Crear Componente
    return (
        <div>
            Status Linea
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
};

export default React.memo(StatusLineas, comparisonFn);
