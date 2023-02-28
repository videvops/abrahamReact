import React from 'react'
import { Button } from 'primereact/button'

const useBotones = (texto1, icono1, estilo1, funcion1, texto2, icono2, estilo2, funcion2) => {
    //--> Botones reutilizables
    const BotonesAccion = () => (
        <>
        <Button label={texto1} icon={icono1} className={estilo1} onClick={funcion1} />
        <Button label={texto2} icon={icono2} className={estilo2} onClick={funcion2} />
        </>
    )

    //--> Valor que regresara
    return [BotonesAccion]
}

export default useBotones
