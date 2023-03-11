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
                        Verificar(e.target.value)
                    }} 
                    required autoFocus className={validarNombre} maxLength="30" />
                {boton && <TextoAdvertencia>{texto}</TextoAdvertencia>}
            </div>
            <div className="field">
                <label htmlFor="apellidos">Apellidos</label>
                <InputText 
                    id="apellidos"
                    value={product.apellidoCompleto}
                    onChange={(e) => {
                        updateField(e.target.value, "apellidoCompleto")
                    }} 
                    required autoFocus maxLength="30" />
            </div>
            {datosInvalidos && <MensajeAdvertencia>{mensaje}</MensajeAdvertencia>}
        </Dialog>
    )
}

export default CrearModificar
