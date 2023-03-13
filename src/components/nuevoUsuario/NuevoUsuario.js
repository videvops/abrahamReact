import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import useBotones from '../hooks/useBotones'

import Environment from '../../Environment'
const getRoute = Environment()

const NuevoUsuario = () => {
    //--------------------| Variables de formulario  |--------------------
    const [nombre,setNombre]=useState('')
    const [apellidos, setApellidos] = useState('')
    const [planta, setPlanta] = useState('')
    const [listaPlantas,setListaPlantas]=useState([])
    const [rol, setRol] = useState('')
    const [listaRoles, setListaRoles] = useState([])
    
    const [estiloNombre, setEstiloNombre] = useState('')
    const [estiloApellidos, setEstiloApellidos] = useState('')
    // const [area, setArea] = useState('')
    // const [linea, setLinea] = useState('')
    // const [maquina, setMaquina] = useState('')
    //--------------------| Funciones  |--------------------
    //--> Validar nombre y apellidos
    const expresion = /^[a-zA-Z0-9._-\s]{1,40}$/;
    const validarTexto = (texto, campo) => {
        if (campo === 1) {
            if (!expresion.test(texto)){
                setEstiloNombre("p-invalid")
                
            }else{
                setEstiloNombre("")
            }
        } else {
            if (!expresion.test(texto)){
                setEstiloApellidos("p-invalid")
                
            }else{
                setEstiloApellidos("")
            }
        }
    }
    //--> Consumir plantas 
    useEffect(() => { Axios.get(`${getRoute}/plantas/list`).then(res => setListaPlantas(res.data)) }, [])
    //--> Consumir roles
    useEffect(() => { Axios.get(`${getRoute}/roles`).then(res => setListaRoles(res.data)) }, [])
    //--> Cancelar envio
    const cancelarEnvio = () => {
        console.log("Cancelado")
    }
    //--> Enviar Formulario
    const enviarFormulario = () => {
        //--> Validar campos vacios
        if ([nombre, apellidos, planta, rol].includes('')) {
            console.log("Todos los campos son obligatorios")
            return
        }
        //--> Validar nombre
        if (setEstiloNombre) {
            console.log("Nombre incorrecto")
            return
        }
        //--> Validar apellidos
        if (setEstiloApellidos) {
            console.log("Apellidos incorrecto")
            return
        }
        const objetoFormulario = { nombre, apellidos, planta, rol }
        console.log("Enviado",objetoFormulario)
    }
    //--> Accion de botones
    const [Botones] = useBotones(
        "Cancelar", "", "py-2 p-button-rounded mt-4", cancelarEnvio,
        "Enviar", "", "py-2 p-button-rounded mt-4", enviarFormulario
    )

    //--------------------| Funciones  |--------------------
    return (
        <form className='card'>
            <h4>Nuevo usuario</h4>
            <div className='grid p-fluid'>
                <div className='col-12 md:col-4'>
                    <label htmlFor='nombre'>Nombre</label>
                    <InputText
                        id='nombre' maxLength={10} className={estiloNombre}
                        value={nombre} onChange={(e) => {
                            setNombre(e.target.value)
                            validarTexto(e.target.value,1)}}
                    />
                </div>
                <div className='col-12 md:col-4'>
                    <label htmlFor='apellidos'>Apellidos</label>
                    <InputText
                        id='apellidos' maxLength={30} className={estiloApellidos}
                        value={apellidos} onChange={(e) => {
                            setApellidos(e.target.value)
                            validarTexto(e.target.value,2)
                        }}
                    />
                </div>
            </div>
            <div className='grid p-fluid'>
                <div className='col-12 md:col-4'>
                    <label>Planta</label>
                    <Dropdown
                        value={planta} onChange={(e) => setPlanta(e.value)}
                        options={listaPlantas} optionLabel="planta" optionValue="id"
                        placeholder="Selecciona una planta"
                        className="w-full md:w-14rem" />
                </div>
                <div className='col-12 md:col-4'>
                    <label>Rol</label>
                    <Dropdown
                        value={rol} onChange={(e) => setRol(e.value)}
                        options={listaRoles} optionLabel="nombre" optionValue="id"
                        placeholder="Selecciona un rol"
                        className="w-full md:w-14rem" />
                </div>
            </div>
            {/* <div>
                <label>Area</label>
                <Dropdown
                    value={area} onChange={(e) => setArea(e.value)}
                    placeholder="Selecciona una area"
                    className="w-full md:w-14rem" />
            </div> */}
            {/* <div>
                <label>linea</label>
                <Dropdown
                    value={linea} onChange={(e) => setLinea(e.value)}
                    placeholder="Selecciona una linea"
                    className="w-full md:w-14rem" />
            </div> */}
            {/* <div>
                <label>Maquina</label>
                <Dropdown
                    value={maquina} onChange={(e) => setMaquina(e.value)}
                    placeholder="Selecciona una maquina"
                    className="w-full md:w-14rem" />
            </div> */}
            <Botones />
        </form>
    )
}

export default NuevoUsuario
