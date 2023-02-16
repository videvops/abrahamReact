import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { statusDisponibles } from '../../ComponentsCat/Constantes/constantes';
import { TextoAdvertencia, MensajeAdvertencia } from '../../ComponentsCat/Mensajes/Mensajes';

import Environment from '../../../../Environment';

const getRoute = Environment()

const CrearModificar = ({
    productDialog,
    titulos,
    hideDialog,
    product,
    updateField,
    saveProduct,
    tieneId,
    boton,
    setBoton,
    validarNombre,
    setValidarNombre
}) => {
//--------------------| Dropdown  |--------------------
    //---> Plantas
    const [plantasDisponibles,setPlantasDisponibles]=useState([])
    useEffect(() => {
        Axios.get(getRoute + "/plantas/list").then(res => setPlantasDisponibles(res.data))
    }, [])
    //---> Areas
    const [areasDisponibles, setAreasDisponibles]=useState([])
    useEffect(() => {
        if(product.idPlanta!==''){
            Axios.get(getRoute + `/areas/planta/${product.idPlanta}`).then(res => setAreasDisponibles(res.data))
        }
    }, [product.idPlanta])

//--------------------| Validar campos  |--------------------
    const [datosInvalidos, setDatosInvalidos] = useState(false)     // Validar envio
    const [mensaje, setMensaje] = useState("")                      // Mensaje para envio
    const [texto, setTexto] = useState("")                          // Mensaje para input
    const expresion=/^[a-zA-Z0-9._-\s]{1,40}$/;                     // Todo menos ','
    //--> Validar input
    const Verificar=(texto)=>{
        if (!expresion.test(texto) || Object.values(texto).includes(" ")){
            setValidarNombre("p-invalid")   // Input rojo
            setTexto("Campo invalido")      // Texto de advertencia de input
            setBoton(true);                 // Validacion para input invalido
        }else{
            setValidarNombre("")
            setTexto("")
            setBoton(false)
        }
    }
    //--> Validar datos antes de envio
    const enviarDatos = () => {
        console.log(product)
        if (Object.values(product).includes("")) {
            setMensaje("Todos los campos son obligatorios")
            setDatosInvalidos(true)
            setTimeout(() => {
                setDatosInvalidos(false)
            }, 3000);
            return
        }
        else {
            if (boton) {
                setMensaje("El nombre no es valido")
                setDatosInvalidos(true)
                setTimeout(() => {
                    setDatosInvalidos(false)
                }, 3000);
                return
            }
        }
        saveProduct()
    }
    //--> Botones de accion
    const botones = () => {
        return (
            <>
                <Button
                    label="Cancelar" icon="pi pi-times" className="p-button-rounded" onClick={hideDialog}
                />                
                <Button
                    label="Guardar" icon="pi pi-check" className="p-button-rounded" onClick={enviarDatos}
                />
            </>
        )
    }

//--------------------| Valor que regresara  |--------------------
    return (
        <Dialog 
        visible={productDialog} 
        style={{ width: '450px' }} 
        header={titulos.VentanaCrear} 
        modal 
        className="p-fluid" 
        footer={botones} 
        onHide={hideDialog}
        >
            <div className="field">
                <label>Planta</label>
                <Dropdown 
                    optionLabel="planta" 
                    optionValue="id" 
                    value={product.idPlanta} 
                    options={plantasDisponibles} 
                    onChange={(e) => {updateField(e.value, "idPlanta")}} 
                    placeholder="--Selecciona una planta--"
                />
            </div>
            <div className="field">
                <label>Area</label>
                <Dropdown 
                    optionLabel="area" 
                    optionValue="id" 
                    value={product.idArea} 
                    options={areasDisponibles} 
                    onChange={(e) => {updateField(e.value, "idArea")}} 
                    placeholder="--Selecciona una area--"
                />
            </div>
            <div className="field">
                <label htmlFor="linea">
                    Linea
                </label>
                <InputText 
                    id="linea"                                      // CAMBIAR...
                    value={product.linea}                           // CAMBIAR...
                    onChange={(e) => {
                        updateField(e.target.value.trim(), "linea");       // CAMBIAR...
                        Verificar(e.target.value)
                    }} 
                    required 
                    autoFocus 
                    className={validarNombre}
                    maxLength="30" 
                />
                {boton && <TextoAdvertencia>{texto}</TextoAdvertencia>}
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
            {datosInvalidos && <MensajeAdvertencia>{mensaje}</MensajeAdvertencia>}
        </Dialog>
    )
}

export default CrearModificar
