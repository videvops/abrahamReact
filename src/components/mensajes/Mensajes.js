import React from "react";

//-------------------| Mensajes de validaciones |-------------------

export const Mensaje=(
    <p style={{color:"red"}}>Campo no valido</p>
);

export const MensajeHora=(
    <p style={{color:"red"}}>La hora de fin tiene que ser mayor que la hora de inicio</p>
);

export const MensajeFiltro=(
    <div className="uppercase text-center font-bold text-white" style={{background:"red"}}>
        Todos los campos son obligatorios
    </div>
)

export const MensajeAdvertencia = ({ children }) => {
    return (
        <div className="uppercase text-center font-bold text-white" style={{background:"red"}}>
            {children}
        </div>
    )
}

export const TextoAdvertencia = ({children}) => {
    return (
        <p style={{color:"red"}}>
            {children}
        </p>
    )
}

export const SelecconaFiltros = ({ categoria }) => {
    return (
        <div className="card">
            <h5 className="uppercase text-center">Sin registros.</h5>
            <p className="text-lg">Lo sentimos, la tabla no cuenta con registros de {categoria} todavía o los filtros seleccionados no son válidos.</p>
            <p className="text-lg">Modifique los filtros o ingrese información.</p>
        </div>
    )
}

export const TablaVacia = ({ categoria }) => {
    return (
        <div className="card">
            <h5 className="uppercase text-center">Sin registros.</h5>
            <p className="text-lg">Lo sentimos, la tabla no cuenta con {categoria} todavía.</p>
            <p className="text-lg">Ingrese al menos un registro.</p>
        </div>
    )
}