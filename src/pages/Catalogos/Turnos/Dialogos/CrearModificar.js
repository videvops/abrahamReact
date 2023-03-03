import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { statusDisponibles } from '../../ComponentsCat/Constantes/constantes';
import { MensajeAdvertencia, TextoAdvertencia } from '../../ComponentsCat/Mensajes/Mensajes';

import Environment from '../../../../Environment';
const getRoute = Environment()

const CrearModificar = ({productDialog,titulos,hideDialog,product,updateField,saveProduct,tieneId}) => {
//--------------------| Dropdown dinamico|--------------------
    //---> Plantas
    const [plantasDisponibles,setPlantasDisponibles]=useState([])
    useEffect(() => {
        Axios.get(getRoute+"/plantas/list").then(res=>setPlantasDisponibles(res.data))
    }, [])
    //---> Areas
    const [areasDisponibles, setAreasDisponibles]=useState([])
    useEffect(() => {
        if(product.idPlanta!==''){
            Axios.get(getRoute+`/areas/planta/${product.idPlanta}`).then(res=>setAreasDisponibles(res.data))
        }
    }, [product.idPlanta])
    //---> Lineas
    const [lineasDisponibles,setLineasDisponibles]=useState([])
    useEffect(() => {
        if(product.idArea!==''){
            Axios.get(getRoute+`/lineas/area/${product.idArea}`).then(res=>setLineasDisponibles(res.data))
        }
    }, [product.idArea])

//--------------------| Validar campos  |--------------------
    const [estiloInput, setEstiloInput] = useState("");             // Validar nombre de turno
    const [estiloHoraI, setEstiloHoraI] = useState('')              // Estilo hora inicio
    const [estiloHoraF, setEstiloHoraF] = useState('')              // Estilo hora fin
    const [horasInvalidas, setHorasInvalidas] = useState(false)     // Horas incorrectas
    const [envioIncorrecto, setEnvioIncorrecto] = useState(false)   // Envio vacio
    const [camposInvalidos, setCamposInvalidos] = useState(false);  // Activar o desactivar boton

    const [mensaje, setMensaje] = useState("")
    const [textoInput, setTextoInput] = useState("")
    const [textoHoraI, setTextoHoraI] = useState("")
    const [textoHoraF, setTextoHoraF] = useState("")
    
    //--->
    const [horaInicio,setHoraInicio]=useState(null)
    const [horaFin,setHoraFin]=useState(null)

    const exprNombre=/^[a-zA-Z0-9._-\s]{1,40}$/;                          // Nombres,numeros y guiones
    const exprHora=/^[0-2][0-9]:[0-5][0-9]$/;
    //---> Nombre
    const VerificarNombre=(texto)=>{
        if (!exprNombre.test(texto)){
            setEstiloInput("p-invalid");
            setTextoInput("Nombre no valido")
            setCamposInvalidos(true);
            
        }else{
            setEstiloInput("");
            setTextoInput("")
            setCamposInvalidos(false);
        }
    }
    //---> Hora inicio
    const VerificarHoraI = (texto) => {
        //---> Comparar con expresion regular
        if(texto[0]===2){
            const exprHora2=/^[0-2][0-3]:[0-5][0-9]$/;
            if (!exprHora2.test(texto)){
                setEstiloHoraI("p-invalid")
                setTextoHoraI("Hora de inicio no valida")
                setCamposInvalidos(true)
            }else{
                setEstiloHoraI("")
                setTextoHoraI("")
                setCamposInvalidos(false)
            }
        }else{
            if (!exprHora.test(texto)){
                setEstiloHoraI("p-invalid")
                setTextoHoraI("Hora de inicio no valida")
                setCamposInvalidos(true)
            }else{
                setEstiloHoraI("")
                setTextoHoraI("")
                setCamposInvalidos(false)
            }
        }
        //---> Modifica la hora
        if(texto.length>4){
            const arregloHoras=texto.split(':')
            let horaI = new Date()
            horaI.setHours(arregloHoras[0])
            horaI.setMinutes(arregloHoras[1])
            horaI.setSeconds(0)
            setHoraInicio(horaI)
        }
    }
    //---> Hora Fin
    const VerificarHoraF = (texto) => {
        //---> Comparar con expresion regular
        if (!exprHora.test(texto)){
            setEstiloHoraF("p-invalid")
            setTextoHoraF("Hora de fin no valida")
            setCamposInvalidos(true)
            
        }else{
            setEstiloHoraF("")
            setTextoHoraF("")
            setCamposInvalidos(false);
        }
        //---> Modificar la hora
        if(texto.length>4){
            const arregloHoras=texto.split(':')
            let horaF = new Date()
            horaF.setHours(arregloHoras[0])
            horaF.setMinutes(arregloHoras[1])
            horaF.setSeconds(0)
            setHoraFin(horaF)
        }
    }
    //---> Comparar horas ingresadas
    useEffect(() => {
        if (![horaInicio, horaFin].includes(null)) {// horas vacias
            if (horaInicio < horaFin) {             // las horas son correctas
                setTextoHoraF("")
                setCamposInvalidos(false)
                setHorasInvalidas(false)
            }
            else {                                  // las horas no son correctas
                setTextoHoraF("La hora de fin tiene que ser mayor que la hora de inicio")
                setCamposInvalidos(true)
                setEstiloHoraF("p-invalid")
                setHorasInvalidas(true)
            }
        }
    }, [horaFin, horaInicio])
    //---> Envio de datos
    const validarEnvio = () => {
        if (Object.values(product).includes("")) {
            // console.log("campos vacios")
            setEnvioIncorrecto(true)
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setEnvioIncorrecto(false)
            }, 3000);
            return
        } else {
            if (camposInvalidos || horasInvalidas) {
                setEnvioIncorrecto(true)
                setMensaje("Algun campo es incorrecto")
                setTimeout(() => {
                    setEnvioIncorrecto(false)
                }, 3000);
                return
            }
        }
        saveProduct()
    }  

    //------> Botones para crear registro
    const botonesCrear = () => {
        return(
            <>
                <Button label="Cancelar" icon="pi pi-times" className="p-button-rounded" onClick={hideDialog} />
                <Button label="Guardar" icon="pi pi-check" className="p-button-rounded" onClick={validarEnvio} />
            </>
        );
    }

//--------------------| Valor que regresara  |--------------------
    return (
        <Dialog 
        visible={productDialog} 
        style={{ width: '450px' }} 
        header={titulos.VentanaCrear} 
        modal 
        className="p-fluid" 
        footer={botonesCrear} 
        onHide={hideDialog}
        >
            <div className="field">
                <label>Planta</label>
                <Dropdown 
                    optionLabel="planta" optionValue="id" 
                    value={product.idPlanta} 
                    options={plantasDisponibles} 
                    onChange={(e) => {updateField(e.value, "idPlanta")}} 
                    placeholder="--Selecciona una planta--"
                />
            </div>
            <div className="field">
                <label>Area</label>
                <Dropdown 
                    optionLabel="area" optionValue="id" 
                    value={product.idArea} 
                    options={areasDisponibles} 
                    onChange={(e) => {updateField(e.value, "idArea")}} 
                    placeholder="--Selecciona una area--"
                />
            </div>
            <div className="field">
                <label>Linea</label>
                <Dropdown 
                    optionLabel="linea" optionValue="id" 
                    value={product.idLinea} 
                    options={lineasDisponibles} 
                    onChange={(e) => {updateField(e.value, "idLinea")}} 
                    placeholder="--Selecciona una linea--"
                />
            </div>
            <div className="field">
                <label htmlFor="turno">Nombre del Turno</label>
                <InputText 
                    id="turno"                                   
                    value={product.turno}                     
                    onChange={(e) => {
                        updateField(e.target.value, "turno");
                        VerificarNombre(e.target.value)
                    }} 
                    required autoFocus className={estiloInput} maxLength="30" 
                />
                {estiloInput && <TextoAdvertencia>{textoInput}</TextoAdvertencia>}
            </div>
            <div className="field">
                <label htmlFor="horaInicio">Hora de inicio</label>
                <InputText
                    id="horaInicio"                
                    value={product.horaInicio}                      
                    onChange={(e) => {
                        updateField(e.target.value, "horaInicio"); 
                        VerificarHoraI(e.target.value)
                    }} 
                    required autoFocus className={estiloHoraI} placeholder='Ejemplo => 07:20'
                />
                {estiloHoraI && <TextoAdvertencia>{textoHoraI}</TextoAdvertencia>}
            </div>
            <div className="field">
                <label htmlFor="horaFin">Hora de Fin</label>
                <InputText 
                    id="horaFin"               
                    value={product.horaFin} 
                    onChange={(e) => {
                        updateField(e.target.value, "horaFin");
                        VerificarHoraF(e.target.value)
                    }} 
                    required autoFocus className={estiloHoraF} placeholder='Ejemplo => 07:30'
                />
                {estiloHoraF && <TextoAdvertencia>{textoHoraF}</TextoAdvertencia>}
                {!estiloHoraF && horasInvalidas && <TextoAdvertencia>{textoHoraF}</TextoAdvertencia>}
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
