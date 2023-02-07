import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import { Button } from 'primereact/button';
import { Mensaje } from '../../ComponentsCat/Mensajes/Mensajes';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MensajeFiltro } from '../../ComponentsCat/Mensajes/Mensajes';
import Environment from '../../../../Environment';

const getRoute = Environment()

const Step1 = ({ hideDialog, product, updateField, mostrarM2, setResultado, tieneID }) => {
//--------------------| Dropdown dinamico|--------------------
    //---> Plantas
    const [plantasDisponibles, setPlantasDisponibles] = useState([])
    useEffect(() => {
        Axios.get(getRoute+"/plantas/list").then(res=>setPlantasDisponibles(res.data))
    }, [])
    //---> Areas
    const [areasDisponibles, setAreasDisponibles] = useState([])
    useEffect(() => {
        if(product.idPlanta!==''){
            Axios.get(getRoute+`/areas/planta/${product.idPlanta}`).then(res=>setAreasDisponibles(res.data))
        }
    }, [product.idPlanta])
    //---> Lineas
    const [lineasDisponibles, setLineasDisponibles] = useState([])
    useEffect(() => {
        if(product.idArea!==''){
            Axios.get(getRoute+`/lineas/area/${product.idArea}`).then(res=>setLineasDisponibles(res.data))
        }
    }, [product.idArea])

//--------------------| Validar campos  |--------------------
    const [validarNombre, setValidarNombre] = useState("");                // Validar nombre de turno
    const [envioIncorrecto, setEnvioIncorrecto] = useState(false)
    const exprNombre = /^[a-zA-Z0-9._-\s]{1,40}$/;                          // Nombres,numeros y guiones
    //---> Nombre
    const VerificarNombre=(texto)=>{
        if (!exprNombre.test(texto)){
            setValidarNombre("p-invalid");
            
        }else{
            setValidarNombre("");
        }
    }
//--------------------| Envio de datos  |--------------------
    const enviarDatos = async (datos) => {
        const respuesta = await Axios.post("http://localhost:8080/productos", datos)
        setResultado(respuesta.data.maquinas)
    }

    const enviarParte1 = () => {
        if ([product.idPlanta, product.idArea, product.idLinea, product.producto].includes("")) {
            setEnvioIncorrecto(true)
            setTimeout(() => {
                setEnvioIncorrecto(false)
            }, 3000);
            return
        }
        const objeto = { producto: product.producto, idLinea: product.idLinea }
        enviarDatos(objeto)
        mostrarM2()
    }
    
//--------------------| Valor que regresara  |--------------------
    return (
        <div>
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
            {tieneID && (
                <div className="field">
                    <label>Linea Asignada</label>
                    <Dropdown
                        placeholder="--Selecciona una linea--"
                    />
                </div>
            )}
            <div className="field">
                <label 
                    htmlFor="producto"                                   // CAMBIAR...
                >
                    Nombre del Producto
                </label>
                <InputText 
                    id="producto"                                        // CAMBIAR...
                    value={product.producto}                             // CAMBIAR...
                    onChange={(e) => {
                        updateField(e.target.value, "producto");  // CAMBIAR...
                        VerificarNombre(e.target.value)
                    }} 
                    required 
                    autoFocus 
                    className={validarNombre}
                    maxLength="30" 
                />
                {validarNombre && Mensaje}
                {envioIncorrecto && MensajeFiltro}
            </div>
            <div className='flex'>
                <Button label="Cancelar" className="p-button-rounded" onClick={hideDialog}/>
                <Button label="Siguiente" className="p-button-rounded" onClick={enviarParte1} />
            </div>
        </div>
    )
}

export default Step1
