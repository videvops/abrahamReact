import React from 'react'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

const EditarStep1 = ({ edicion, actualizarEdicion, lineaSeleccionada, setLineaSeleccionada }) => {
    return (
        <div>
            <div className="field">
                <label>Linea Asignada</label>
                <Dropdown
                    optionLabel="linea" 
                    optionValue="id"
                    value={lineaSeleccionada}
                    options={edicion.lineasAsignadas}
                    onChange={(e) => setLineaSeleccionada(e.target.value)}
                    placeholder="--Selecciona una linea--"
                />
            </div>
            <div className="field">
                <label htmlFor="producto">Nombre del Producto</label>
                <InputText 
                    id="producto"
                    value={edicion.producto}
                    onChange={(e) => { actualizarEdicion(e.target.value, "producto") }}
                    required autoFocus maxLength="30"
                />
            </div>
        </div>
    )
}

export default EditarStep1
