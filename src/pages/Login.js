import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { MensajeAdvertencia } from '../components/mensajes/Mensajes'

import Logo from '../img/logoublick.png'

const Login = ({ setLogueado }) => {
//--------------------| Variables para iniciar sesion  |--------------------
    const [texto, setTexto] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const expresion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

//--------------------| Funcion para iniciar sesion  |--------------------
    const enviarDatos = (e) => {
        e.preventDefault()
        //---> Validacion de campos vacios
        if ([email, password].includes("")) {
            setTexto("Todos los campos son obligatorios")
            setTimeout(() => {
                setTexto('')
            }, 3000);
            return
        }
        //---> Validacion de Correo
        if (!expresion.test(email)) {
            setTexto("Correo invalido")
            setTimeout(() => {
                setTexto('')
            }, 3000);
            return
        }
        //---> Validacion de contraseña
        if (!(password.length >= 6)) {
            setTexto("Contraseña invalida")
            setTimeout(() => {
                setTexto('')
            }, 3000);
            return
        }
        //---> Envio de datos
        localStorage.setItem('logueado', '1')   // Crea valor para inicio de sesion
        setLogueado(true)                       // Iniciar sesion 
        console.log("Inicio de sesion")
    }

//--------------------| Valor que regresara  |--------------------
    return (
        <form onSubmit={enviarDatos} noValidate
            className='card'
            style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
            <img
                src={Logo} alt='logo ublick'
                style={{ justifyContent: 'center', alignItems: 'center', width: '600px', height: '300px' }}
            />
            <div className="flex flex-column md:flex-row">
                <div
                    // className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5"
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="email" className="w-6rem font-bold">Correo</label>
                        <InputText
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Ingresa tu correo"
                        />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="password" className="w-6rem font-bold">Contraseña</label>
                        <InputText
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
                    <Button label="Iniciar Sesion" icon="pi pi-user" className="w-12rem mx-auto"/>
                </div>
            </div>
            {texto && <MensajeAdvertencia>{texto}</MensajeAdvertencia>}
        </form>
    )
}

export default Login
