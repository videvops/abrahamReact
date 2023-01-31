import React, { useEffect, useState } from 'react'
import Home from './home/Home'
import Login from './pages/Login'

const App = () => {
    const [logueado, setLogueado] = useState(false)

//--------------------| Verificar inicio de sesion |--------------------
    useEffect(() => {
    const informacionSesion = localStorage.getItem('logueado'); // Busca el valor creado
        if (informacionSesion === '1') {                        // Comprobar valor de inicio de sesion
            setLogueado(true);                                  // Inicio de sesion
        }
    }, []);                                                     // Se ejecuta al cargar la pagina

//--------------------| Valor que regresara |--------------------
    return (
        <>
            {!logueado && <Login setLogueado={setLogueado} />}
            {logueado && <Home setLogueado={setLogueado} />}
        </>
    )
}

export default App
