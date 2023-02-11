import React from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

const Editar = ({ modalEditar, setModalEditar, dataEnvio, setDataEnvio }) => {
    //---> Destructuracion
    const { producto, lineasAsignadas } = dataEnvio
    //---> Dropdown de lineas Asignadas
    // const [lineasDisponibles, setLineasDisponibles] = useState([lineasAsignadas])

    //---> Pasar al siguiente modal
    const siguienteComponente = () => {
        console.log(lineasAsignadas)
    }

    //---> Permite cancelar o guardar el registro
    const botonesAccion = () => {
        return (
            <>
                <Button
                    label="Cancelar"
                    className="py-2 p-button-rounded"
                    onClick={() => setModalEditar(false)}
                />
                <Button
                    label="Siguiente"
                    className="py-2 p-button-rounded"
                    onClick={siguienteComponente}
                />
            </>
        )
    }

//--------------------| Valor que regresara |--------------------
    return (
        <Dialog
            visible={modalEditar} 
            style={{ width: "350px" }}
            header="Editar registro"
            className="p-fluid" 
            onHide={() => setModalEditar(false)}
            footer={botonesAccion}
        >
            <div className="field">
                <label>Linea Asignada</label>
                <Dropdown
                    optionLabel="linea" 
                    optionValue="id"
                    options={lineasAsignadas}
                    placeholder="--Selecciona una linea--"
                />
            </div>
            <div className="field">
                <label htmlFor="producto">Nombre del Producto</label>
                <InputText 
                    id="producto"
                    value={producto}
                    // onChange={(e) => producto(e.target.value)}
                    // onChange={(e) => {
                    //     updateField(e.target.value, "producto")
                    //     VerificarNombre(e.target.value)
                    // }} 
                    // required autoFocus className={validarNombre} maxLength="30"
                />
            </div>
        </Dialog>
    )
}

export default Editar
