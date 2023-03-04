import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { MensajeAdvertencia } from '../components/mensajes/Mensajes';

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
        <form onSubmit={enviarDatos} noValidate>
            <div className="card">
                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="username" className="w-6rem">Usuario</label>
                            <InputText
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Ingresa tu correo"
                            />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="password" className="w-6rem">Contraseña</label>
                            <InputText
                                type="password"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>
                        <Button label="Iniciar Sesion" icon="pi pi-user" className="w-12rem mx-auto"/>
                        {texto && <MensajeAdvertencia>{texto}</MensajeAdvertencia>}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login
