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