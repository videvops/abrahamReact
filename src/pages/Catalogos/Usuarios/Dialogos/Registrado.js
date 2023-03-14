import React from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const Registrado = ({ usuario, mostrar, setMostrar }) => {
    const boton = (
        <div>
            <Button
                label="Aceptar" icon="pi pi-times" className="p-button-text"
                onClick={() => setMostrar(false)}
            />
        </div>
    )
    return (
        <Dialog
            header="Registro exitoso"
            visible={mostrar} onHide={() => setMostrar(false)}
            style={{ width: '350px' }}
        >
            <div>
                <p className="m-0 text-center text-lg">Tu usuario es: {usuario}</p>
                <Button
                    label="Aceptar" icon="pi pi-check" className="p-button-rounded mt-4 mx-8"
                    onClick={() => setMostrar(false)}/>
            </div>
        </Dialog>
    )
}

export default Registrado
