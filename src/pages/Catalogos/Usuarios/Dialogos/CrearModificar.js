import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { statusDisponibles } from '../../ComponentsCat/Constantes/constantes';
import { TextoAdvertencia, MensajeAdvertencia } from '../../ComponentsCat/Mensajes/Mensajes';
import useBotones from '../../../../components/hooks/useBotones';

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
    const [listaPlantas,setListaPlantas]=useState([])
    const [listaRoles, setListaRoles] = useState([])
    //--> Consumir plantas 
    useEffect(() => { Axios.get(`${getRoute}/plantas/list`).then(res => setListaPlantas(res.data)) }, [])
    //--> Consumir roles
    useEffect(() => { Axios.get(`${getRoute}/roles`).then(res => setListaRoles(res.data)) }, [])

//--------------------| Validar campos  |--------------------
    const [datosInvalidos, setDatosInvalidos] = useState(false)     // Validar envio
    const [mensaje, setMensaje] = useState("")                      // Mensaje para envio
    const [texto, setTexto] = useState("")                          // Mensaje para input
    const [estiloAP, setEstiloAP] = useState("")
    const [estiloAM, setEstiloAM] = useState("")
    const expresion=/^([a-zA-Z0-9\sÁÉÍÓÚáéíóúÑñ]+)$/                // Acentos y letra 'ñ'
    //--> Validar input
    const ValidarNombre=(texto)=>{
        if (!expresion.test(texto) || Object.values(texto).includes(" ")){
            setValidarNombre("p-invalid")
            setTexto("Campo invalido")
            setBoton(true)
        }else{
            setValidarNombre("")
            setTexto("")
            setBoton(false)
        }
    }
    const ValidarAP=(texto)=>{
        if (!expresion.test(texto) || Object.values(texto).includes(" ")){
            setEstiloAP("p-invalid")
            setTexto("Campo invalido")
            setBoton(true)
        }else{
            setEstiloAP("")
            setTexto("")
            setBoton(false)
        }
    }
    const ValidarAM = (texto) => {
        if (!expresion.test(texto) || Object.values(texto).includes(" ")){
            setEstiloAM("p-invalid")
            setTexto("Campo invalido")
            setBoton(true)
        }else{
            setEstiloAM("")
            setTexto("")
            setBoton(false)
        }
    }

    const enviarDatos = () => {
        if (Object.values(product).includes("")) {
            setMensaje("Todos los campos son obligatorios")
            setDatosInvalidos(true)
            setTimeout(() => { setDatosInvalidos(false) }, 3000)
            return
        }
        else {
            if (boton) {
                setMensaje("Algún campo no es valido")
                setDatosInvalidos(true)
                setTimeout(() => {setDatosInvalidos(false)}, 3000)
                return
            }
        }
        saveProduct()
    }
    //--> Accion de botones
    const [botones] = useBotones(
        "Cancelar", "pi pi-times", "p-button-rounded", hideDialog,
        "Guardar", "pi pi-check", "p-button-rounded", enviarDatos
    )

//--------------------| Valor que regresara  |--------------------
    return (
        <Dialog
            visible={productDialog} onHide={hideDialog}
            footer={botones} header={titulos.VentanaCrear} 
            style={{ width: '450px' }} modal className="p-fluid" 
        >
            <div className="field">
                <label>Planta</label>
                <Dropdown
                    value={product.idPlanta} onChange={(e) => updateField(e.value,"idPlanta")}
                    options={listaPlantas} optionLabel="planta" optionValue="id"
                    placeholder="Selecciona una planta" />
            </div>
            <div className="field">
                <label>Rol</label>
                <Dropdown
                    value={product.idRol} onChange={(e) => updateField(e.value,"idRol")}
                    options={listaRoles} optionLabel="nombre" optionValue="id"
                    placeholder="Selecciona un rol" />
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
            <div className="field">
                <label htmlFor="nombre">Nombre</label>
                <InputText 
                    id="nombre"
                    value={product.nombre}
                    onChange={(e) => {
                        updateField(e.target.value, "nombre")
                        ValidarNombre(e.target.value)
                    }} 
                    required autoFocus className={validarNombre} maxLength="10" />
                {validarNombre && <TextoAdvertencia>{texto}</TextoAdvertencia>}
            </div>
            <div className="field">
                <label htmlFor="apellidoP">Apellido Paterno</label>
                <InputText 
                    id="apellidoP"
                    value={product.apellidoPaterno}
                    onChange={(e) => {
                        updateField(e.target.value, "apellidoPaterno")
                        ValidarAP(e.target.value)
                    }} 
                    required autoFocus className={estiloAP} maxLength="10" />
                {estiloAP && <TextoAdvertencia>{texto}</TextoAdvertencia>}
            </div>
            <div className="field">
                <label htmlFor="apellidoM">Apellido Materno</label>
                <InputText 
                    id="apellidoM"
                    value={product.apellidoMaterno}
                    onChange={(e) => {
                        updateField(e.target.value, "apellidoMaterno")
                        ValidarAM(e.target.value)
                    }} 
                    required autoFocus className={estiloAM} maxLength="10" />
                {estiloAM && <TextoAdvertencia>{texto}</TextoAdvertencia>}
            </div>
            {datosInvalidos && <MensajeAdvertencia>{mensaje}</MensajeAdvertencia>}
        </Dialog>
    )
}

export default CrearModificar
