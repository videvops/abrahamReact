import React, {useEffect, useState} from 'react'
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { productDialogFooter } from '../../ComponentsCat/Botones/CrearRegistro';
import { Mensaje, MensajeHora } from '../../ComponentsCat/Mensajes/Mensajes';
import Axios from 'axios';
import { statusDisponibles } from '../../ComponentsCat/Constantes/constantes';

const CrearModificar = ({productDialog,titulos,hideDialog,product,updateField,saveProduct,tieneId}) => {
//--------------------| Dropdown dinamico|--------------------
    //---> Plantas
    const [plantasDisponibles,setPlantasDisponibles]=useState([])
    useEffect(() => {
        Axios.get("http://localhost:8080/plantas/list").then(res=>setPlantasDisponibles(res.data))
    }, [])

    const [areasDisponibles, setAreasDisponibles]=useState([])
    useEffect(() => {
        if(product.idPlanta!==''){
            Axios.get(`http://localhost:8080/areas/planta/${product.idPlanta}`).then(res=>setAreasDisponibles(res.data))
        }
    }, [product.idPlanta])

    const [lineasDisponibles,setLineasDisponibles]=useState([])
    useEffect(() => {
        if(product.idArea!==''){
            Axios.get(`http://localhost:8080/lineas/area/${product.idArea}`).then(res=>setLineasDisponibles(res.data))
        }
    }, [product.idArea])

//--------------------| Validar campos  |--------------------
    const [validarNombre,setValidarNombre]=useState("");                // Validar nombre de turno
    const [validHoraI,setValidHoraI]=useState('')
    const [validHoraF,setValidHoraF]=useState('')
    const [onMensajeHora,setOnMensajeHora]=useState(false)
    
    const [horaInicio,setHoraInicio]=useState(null)
    const [horaFin,setHoraFin]=useState(null)

    const [boton,setBoton]=useState(false);                             // Activar o desactivar boton
    const exprNombre=/^[a-zA-Z0-9._-]{1,40}$/;                          // Nombres,numeros y guiones
    const exprHora=/^[0-2][0-3]:[0-5][0-9]$/;
    //---> Nombre
    const VerificarNombre=(texto)=>{
        if (!exprNombre.test(texto)){
            setValidarNombre("p-invalid");
            setBoton(true);
            
        }else{
            setValidarNombre("");
            setBoton(false);
        }
    }
    //---> Hora inicio
    const VerificarHoraI=(texto)=>{
        if (!exprHora.test(texto)){
            setValidHoraI("p-invalid");
            setBoton(true);
            
        }else{
            setValidHoraI("");
            setBoton(false);
        }
        //---> Validar
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
    const VerificarHoraF=(texto)=>{
        if (!exprHora.test(texto)){
            setValidHoraF("p-invalid");
            setBoton(true);
            
        }else{
            setValidHoraF("");
            setBoton(false);
        }

        if(texto.length>4){
            const arregloHoras=texto.split(':')
            let horaF = new Date()
            horaF.setHours(arregloHoras[0])
            horaF.setMinutes(arregloHoras[1])
            horaF.setSeconds(0)
            setHoraFin(horaF)
        }
    }
    //---> Comparar horas
    useEffect(() => {
        if(![horaInicio,horaFin].includes(null)){
            if(horaInicio<horaFin){
                setOnMensajeHora(false)
                setBoton(false);
            }
            else {
                setOnMensajeHora(true)
                setBoton(true);
            }
        }
    }, [horaFin,horaInicio])

//--------------------| Botones de confirmacion |--------------------
    //------> Botones para crear registro
    const crearRegistro=productDialogFooter(hideDialog,saveProduct,boton);

//--------------------| Valor que regresara  |--------------------
    return (
        <Dialog 
        visible={productDialog} 
        style={{ width: '450px' }} 
        header={titulos.VentanaCrear} 
        modal 
        className="p-fluid" 
        footer={![product.nombre,product.horaInicio,product.horaFin,product.idLinea].includes('')&&crearRegistro} 
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
                <label>Linea</label>
                <Dropdown 
                optionLabel="linea" 
                optionValue="id" 
                value={product.idLinea} 
                options={lineasDisponibles} 
                onChange={(e) => {updateField(e.value, "idLinea")}} 
                placeholder="--Selecciona una linea--"
                />
            </div>
            <div className="field">
                <label 
                htmlFor="turno"                                   // CAMBIAR...
                >
                    Nombre del Turno
                </label>
                <InputText 
                id="turno"                                        // CAMBIAR...
                value={product.turno}                             // CAMBIAR...
                onChange={(e) => {
                    updateField(e.target.value.trim(), "turno");  // CAMBIAR...
                    VerificarNombre(e.target.value)
                }} 
                required 
                autoFocus 
                className={validarNombre}
                maxLength="30" 
                />
                {validarNombre && Mensaje}
            </div>
            <div className="field">
                <label 
                htmlFor="horaInicio"                                   // CAMBIAR...
                >
                    Hora de inicio
                </label>
                <InputText
                id="horaInicio"                                        // CAMBIAR...
                value={product.horaInicio}                             // CAMBIAR...
                onChange={(e) => {
                    updateField(e.target.value.trim(), "horaInicio");  // CAMBIAR...
                    VerificarHoraI(e.target.value)
                }} 
                required 
                autoFocus
                className={validHoraI}
                placeholder='Ejemplo => 07:20'
                />
                {validHoraI && Mensaje}
            </div>
            <div className="field">
                <label 
                htmlFor="horaFin"                                   // CAMBIAR...
                >
                    Hora de Fin
                </label>
                <InputText 
                id="horaFin"                                            // CAMBIAR...
                value={product.horaFin}                             // CAMBIAR...
                onChange={(e) => {
                    updateField(e.target.value.trim(), "horaFin");  // CAMBIAR...
                    VerificarHoraF(e.target.value)
                }} 
                required 
                autoFocus
                className={validHoraF}
                placeholder='Ejemplo => 07:30'
                />
                {validHoraF && Mensaje}
                {!validHoraF && onMensajeHora && MensajeHora}
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
        </Dialog>
    )
}

export default CrearModificar
