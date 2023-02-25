import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { statusDisponibles } from '../../ComponentsCat/Constantes/constantes'
import useBotones from '../../../../components/hooks/useBotones';
import { MensajeAdvertencia, TextoAdvertencia } from '../../../../components/mensajes/Mensajes';

import Environment from '../../../../Environment';
const getRoute = Environment();

const CrearModificar = ({
    productDialog,
    titulos,
    hideDialog,
    product,
    updateField,
    saveProduct,
    tieneId
}) => {


//--------------------| Dropdown  |--------------------
    //---> Plantas
    const [plantasDisponibles,setPlantasDisponibles]=useState([])
    useEffect(() => {
        Axios.get(getRoute+"/plantas/list").then(res=>setPlantasDisponibles(res.data))
    }, [])

//--------------------| Validar campos  |--------------------
    const [validarNombre, setValidarNombre] = useState("")
    const [envioIncorrecto, setEnvioIncorrecto] = useState(false)
    const [nombreIncorrecto, setNombreIncorrecto] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [texto, setTexto] = useState('')
    const expresion=/^[a-zA-Z0-9._-\s]{1,40}$/;                       // Todo menos ','

    const VerificarNombre = (texto) => {
        if (!expresion.test(texto)) {
            setValidarNombre("p-invalid")
            setTexto('Campo no valido')
            setNombreIncorrecto(true)
        } else {
            setTexto('')
            setValidarNombre("")
            setNombreIncorrecto(false)
        }
    }
    const enviarDatos = () => {
        if ([product.area, product.idPlanta].includes('')) {
            setEnvioIncorrecto(true)
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setEnvioIncorrecto(false)
            }, 3000)
            return
        }
        if (nombreIncorrecto) {
            setEnvioIncorrecto(true)
            setMensaje("El nombre no es valido")
            setTimeout(() => {
                setEnvioIncorrecto(false)
            }, 3000)
            return
        }
        console.log("datos enviados")
        saveProduct()
        hideDialog()
    }
    //--------------------| Botones de confirmacion |--------------------
    //------> Botones para crear registro
    const [botonesAccion] = useBotones(
        "Cancelar", "pi pi-times", "p-button-rounded", hideDialog,
        "Guardar", "pi pi-check", "p-button-rounded", enviarDatos
    )

//--------------------| Valor que regresara  |--------------------
    return (
        <Dialog 
        visible={productDialog} style={{ width: '450px' }} header={titulos.VentanaCrear} className="p-fluid" 
        modal footer={botonesAccion} onHide={hideDialog}
        >   
            <div className="field">
                <label>Planta</label>
                <Dropdown 
                    optionLabel="planta" 
                    optionValue="id" 
                    value={product.idPlanta} 
                    options={plantasDisponibles} 
                    onChange={(e) => { updateField(e.value, "idPlanta") }}    
                    placeholder="--Selecciona una planta--"
                />
            </div>
            <div className="field">
                <label htmlFor="area">Area</label>
                <InputText 
                    id="area"                                 
                    value={product.area}                      
                    onChange={(e) => {
                        updateField(e.target.value, "area");  
                        VerificarNombre(e.target.value)
                    }} 
                    required autoFocus className={validarNombre} maxLength="30" 
                />
                {validarNombre && <TextoAdvertencia>{texto}</TextoAdvertencia>}
            </div>
            {!tieneId && (<div className="field">
                <label>Status</label>
                <Dropdown
                    value={product.idEstatus}
                    options={statusDisponibles} 
                    onChange={ e => {
                        updateField(e.value, "idEstatus");
                    }} 
                    optionLabel="status" 
                    placeholder="--Selecciona un status--"
                />
            </div>)}
            {envioIncorrecto && <MensajeAdvertencia>{mensaje}</MensajeAdvertencia>}
        </Dialog>
    )
}

export default CrearModificar
