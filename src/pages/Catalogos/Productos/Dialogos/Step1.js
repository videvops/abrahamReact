import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MensajeAdvertencia, TextoAdvertencia } from '../../../../components/mensajes/Mensajes'

import { ENVIAR_PARTE1_PRODUCTOS } from '../../../../genericos/Uris';
import Environment from '../../../../Environment';
const getRoute = Environment()

const Step1 = ({ edicion, hideDialog, product, updateField, mostrarM2, setTieneMaquinas, setIdProduto }) => {
//--------------------| Dropdown dinamico|--------------------
    //---> Plantas
    const [plantasDisponibles, setPlantasDisponibles] = useState([])
    useEffect(() => {
        Axios.get(getRoute + "/plantas/list").then(res => setPlantasDisponibles(res.data))
    }, [])
    //---> Areas
    const [areasDisponibles, setAreasDisponibles] = useState([])
    useEffect(() => {
        if(product.idPlanta!==''){
            Axios.get(getRoute + `/areas/planta/${product.idPlanta}`).then(res => setAreasDisponibles(res.data))
        }
    }, [product.idPlanta])
    //---> Lineas
    const [lineasDisponibles, setLineasDisponibles] = useState([])
    useEffect(() => {
        if (edicion.idProducto) {
            // console.log("Es edicion")
            if (product.idArea !== '') {
                Axios.get(getRoute + `/lineas/producto/area/${product.idArea}/producto/${edicion.idProducto}`).then(res => {
                    setLineasDisponibles(res.data)
                    console.log(res.data)
                })
            }
        } else {
            // console.log("No es edicion")
            if (product.idArea !== '') {
                Axios.get(getRoute + `/lineas/area/${product.idArea}`).then(res => {
                    console.log(res.data)
                    setLineasDisponibles(res.data)
                })
            }
        }// eslint-disable-next-line
    }, [product.idArea])

//--------------------| Validar campos  |--------------------
    const [validarNombre, setValidarNombre] = useState("");         // Validar nombre de turno
    const [nombreIncorrecto, setNombreIncorrecto] = useState(false) // Aprobar nombre
    const [envioIncorrecto, setEnvioIncorrecto] = useState(false)   // Aprobar envio
    const [mensaje, setMensaje] = useState("")                      // Advertencia general
    const [texto, setTexto] = useState("")                          // Texto de nombre invalido
    const exprNombre = /^[a-zA-Z0-9._-\s]{1,40}$/;                  // Nombres,numeros y guiones
    //---> Nombre
    const VerificarNombre=(texto)=>{
        if (!exprNombre.test(texto)){
            setValidarNombre("p-invalid")
            setTexto("Campo no valido")
            setNombreIncorrecto(true)
            
        }else{
            setValidarNombre("")
            setNombreIncorrecto(false)
        }
    }
//--------------------| Envio de datos  |--------------------
    const enviarDatos = async (datos) => {
        // const respuesta = await Axios.post(getRoute+"/productos", datos)
        const respuesta = await Axios.post(`${getRoute}/${ENVIAR_PARTE1_PRODUCTOS}`, datos)
        setIdProduto(respuesta.data.id)
        setTieneMaquinas(respuesta.data.hayMaquinas)
    }
    const actualizarDatos = async (datos) => {
        // const datosEditados = await Axios.put(getRoute+`/productos/${edicion.idProducto}`, datos)
        const datosEditados = await Axios.put(`${getRoute}/${ENVIAR_PARTE1_PRODUCTOS}/${edicion.idProducto}`, datos)
        setIdProduto(datosEditados.data.id)
        setTieneMaquinas(datosEditados.data.hayMaquinas)
    }

    const enviarParte1 = () => {
        if ([product.idPlanta, product.idArea, product.idLinea, product.producto].includes("")) {
            setEnvioIncorrecto(true)
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setEnvioIncorrecto(false)
            }, 3000);
            return
        } else {
            if (nombreIncorrecto) {
                setEnvioIncorrecto(true)
                setMensaje("El nombre no es valido")
                setTimeout(() => {
                    setEnvioIncorrecto(false)
                }, 3000);
                return
            }
        }
        if (!edicion.idProducto) {                 // No es edicion
            // console.log("Nuevo producto")
            // console.log(edicion.idProducto)
            const objetoNuevo = { producto: product.producto, idLinea: product.idLinea }
            enviarDatos(objetoNuevo)
        } else {                        // Es edicion
            // console.log("Producto Editado")
            // console.log(edicion.idProducto)
            const objetoEditado = {
                producto: product.producto,
                idLinea: product.idLinea,
                opcionSeleccionada:"LINEA_NUEVA"
            }
            actualizarDatos(objetoEditado) 
        }
        mostrarM2()
    }
    //--> Validar nombre de edicion
    useEffect(() => { 
        if (edicion.idProducto) {
            product.producto = edicion.producto
        } else {
            product.producto = ""
        }
        // eslint-disable-next-line
    }, [edicion.idProducto])
    
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
                    placeholder="--Selecciona una area--" />
            </div>
            <div className="field">
                <label>Linea</label>
                <Dropdown 
                    optionLabel="linea" optionValue="id" 
                    value={product.idLinea} 
                    options={lineasDisponibles} 
                    onChange={(e) => {updateField(e.value, "idLinea")}} 
                    placeholder="--Selecciona una linea--" />
            </div>
            <div className="field">
                <label htmlFor="producto">Nombre del Producto</label>
                <InputText 
                    id="producto"
                    value={product.producto}
                    onChange={(e) => {
                        updateField(e.target.value, "producto")
                        VerificarNombre(e.target.value)
                    }} 
                    required autoFocus className={validarNombre} maxLength="30" />
                {validarNombre && <TextoAdvertencia>{texto}</TextoAdvertencia>}
                {envioIncorrecto && <MensajeAdvertencia>{mensaje}</MensajeAdvertencia>}
            </div>
            <div className='mt-5 flex'>
                <Button label="Cancelar" className="p-button-rounded" onClick={hideDialog}/>
                <Button label="Siguiente" className="p-button-rounded" onClick={enviarParte1} />
            </div>
        </div>
    )
}

export default Step1
