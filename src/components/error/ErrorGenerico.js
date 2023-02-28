import React from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const ErrorGenerico = ({ mensaje, estado, setEstado }) => {
    return (
        <Dialog
            header="¡Atención!" visible={estado} position="top" style={{ width: '300px' }}
            onHide={() => setEstado(false)} draggable={false} resizable={false}
        >
            <div className="flex flex-wrap gap-2">
                <i className="pi pi-exclamation-triangle" style={{ fontSize: '2rem' }}></i>
                <p className="m-0 text-lg">{mensaje}</p>
            </div>
            <Button
                className="mt-4 mx-8" label="Acepto" icon="pi pi-check"
                onClick={() => setEstado(false)} autoFocus
            />
        </Dialog>
    )
}

export default ErrorGenerico
