import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'

const Login = ({ setLogueado }) => {
//--------------------| Variables para iniciar sesion  |--------------------
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const expresion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

//--------------------| Funcion para iniciar sesion  |--------------------
    const enviarDatos = (e) => {
        e.preventDefault()
        //---> Validacion de campos vacios
        if ([email, password].includes("")) {
            console.log("Llenar todos los campos")
            return
        }
        //---> Validacion de Correo
        if (!expresion.test(email)) {
            console.log("Correo no valido")
            return
        }
        //---> Validacion de contraseña
        if (!(password.length >= 6)) {
            console.log("Contraseña no valida")
            return
        }
        //---> Envio de datos
        localStorage.setItem('logueado', '1')   // Crea valor para inicio de sesion
        setLogueado(true)                       // Iniciar sesion 
        console.log("Inicio de sesion")
    }

//--------------------| Valor que regresara  |--------------------
    return (
        <form
            onSubmit={enviarDatos}
            noValidate                      // Desactivar validacion HTML
            className='card'
        >
            <div className='field col-12 md:col-4'>
                <label htmlFor="email">Correo</label>
                <InputText
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo"
                />
            </div>
            <div className='field col-12 md:col-4'>
                <label htmlFor="password">Contraseña</label>
                <InputText
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                />
            </div>
            <input
                type="submit"
                value="Iniciar Sesion"
            />
        </form>
    )
}

export default Login
