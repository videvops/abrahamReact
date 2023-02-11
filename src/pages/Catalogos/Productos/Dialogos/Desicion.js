import React from 'react'
import Axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';


const Desicion = ({
    modalDesicion,
    setModalDesicion,
    setModalEditar,
    openNew,
    dataProducto,
    setDataEnvio }) => {
    //---> Destructuracion
    const { id } = dataProducto

    //---> Opcion crear registro
    const nuevaLinea = () => {
        openNew()
        setModalDesicion(false)
    }

    //---> Opcion editar registro
    const lineaAsignada = () => {
        setModalEditar(true)
        setModalDesicion(false)
        Axios.get(`http://localhost:8080/productos/getById/${id}`).then(res => setDataEnvio(res.data))
    }

    //---> Permite escojer crear o editar
    const botonesAccion = () => {
        return (
            <>
                <Button
                    label="Nueva Linea"
                    className="py-2 p-button-rounded"
                    onClick={nuevaLinea}
                />
                <Button
                    label="Lineas Asignadas"
                    className="py-2 p-button-rounded"
                    onClick={lineaAsignada}
                />
            </>
        )
    }

//--------------------| Valor que regresara |--------------------
    return (
        <Dialog
            visible={modalDesicion} 
            style={{ width: "350px" }}
            header="Escoje una opcion"
            className="p-fluid" 
            onHide={() => setModalDesicion(false)}
            footer={botonesAccion}
        >
            <p>¿Que opcion desea escojer?</p>
        </Dialog>
    )
}

export default Desicion
