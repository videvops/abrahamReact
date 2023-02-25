import React, { useEffect } from 'react'
import Axios from 'axios';
import { Dialog } from 'primereact/dialog';
import useBotones from '../../../../components/hooks/useBotones';

const Desicion = ({
    openNew,
    setEdicion,
    dataProducto,
    modalDesicion,
    setModalEditar,
    setModalDesicion }) => {
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
    }
    //--> Crear o editar
    const [botonesAccion] = useBotones(
        "Nueva Linea", "", "py-2 p-button-rounded", nuevaLinea,
        "Lineas Asignadas","","py-2 p-button-rounded",lineaAsignada
    )
    useEffect(() => {
        if (modalDesicion) {
            Axios.get(`http://localhost:8080/productos/getById/${id}`).then(res => setEdicion(res.data))
        }
        // eslint-disable-next-line
    }, [modalDesicion])

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
