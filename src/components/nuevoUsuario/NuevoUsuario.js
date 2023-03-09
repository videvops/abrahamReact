import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import useBotones from '../hooks/useBotones'

const NuevoUsuario = () => {
    const [nombre,setNombre]=useState('')
    const [apellidos, setApellidos] = useState('')
    const [planta, setPlanta] = useState('')
    // const [area, setArea] = useState('')
    // const [linea, setLinea] = useState('')
    // const [maquina, setMaquina] = useState('')
    const [rol, setRol] = useState('')

    const cancelarEnvio = () => {
        console.log("Envio cancelado")
    }
    const enviarFormulario = () => {
        console.log("Envio exitoso")
    }

    const [Botones] = useBotones(
        "Cancelar", "", "py-2 p-button-rounded", cancelarEnvio,
        "Enviar", "", "py-2 p-button-rounded", enviarFormulario
    )

    return (
        <form className='card'>
            <div><h4>Nuevo usuario</h4></div>
            <div>
                <label htmlFor='nombre'>Nombre</label>
                <InputText id='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
                <label htmlFor='apellidos'>Apellidos</label>
                <InputText id='apellidos' value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
            </div>
            <div>
                <label>Planta</label>
                <Dropdown
                    value={planta} onChange={(e) => setPlanta(e.value)}
                    /*options={cities} optionLabel="name"*/ placeholder="Selecciona una planta"
                    className="w-full md:w-14rem" />
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
            <div>
                <label>Rol</label>
                <Dropdown
                    value={rol} onChange={(e) => setRol(e.value)}
                    /*options={cities} optionLabel="name"*/ placeholder="Selecciona un rol"
                    className="w-full md:w-14rem" />
            </div>
            <Botones />
        </form>
    )
}

export default NuevoUsuario
