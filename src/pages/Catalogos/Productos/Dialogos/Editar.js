import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import useBotones from '../../../../components/hooks/useBotones'
import EditarStep1 from './EditarStep1'
import EditarStep2 from './EditarStep2'

import { Dialog } from 'primereact/dialog'
import { MensajeAdvertencia } from '../../../../components/mensajes/Mensajes'

import { ENVIAR_PARTE2_PRODUCTOS } from '../../../../genericos/Uris'
import Environment from '../../../../Environment'
const getRoute = Environment()

const Editar = ({ modalEditar, setModalEditar, edicion, actualizarEdicion, setEdicion, edicionVacio }) => {
    //--> Variables para componentes
    const [componente1, setComponente1] = useState(true)
    const [componente2, setComponente2] = useState(false)
    const [registrosEditados, setRegistrosEditados] = useState([])
    const [lineaSeleccionada, setLineaSeleccionada] = useState(null)
    const [validarParte1, setValidarParte1] = useState(false)
    const mensaje="Por favor escoje una linea"

    //--> Pasar al siguiente modal
    const mostrarComponente2 = () => {
        if (!lineaSeleccionada) {
            setValidarParte1(true)
            setTimeout(() => {
                setValidarParte1(false)
            }, 3000);
            return
        }
        setComponente1(false)
        setComponente2(true)
    }
    //--> Registros tabla 
    useEffect(() => {
        if (lineaSeleccionada) {
            const datosLinea = edicion.lineasAsignadas.filter(linea => linea.id === lineaSeleccionada)
            let arregloLM=[]
            if (!datosLinea[0].config) {
                arregloLM.push({
                    id: datosLinea[0].id,
                    tipo: "linea",
                    nombre: datosLinea[0].linea,
                    velocidadEstandar: 0,
                    factorConversionI: 0,
                    factorConversionO: 0,
                    habilitado:"false"
                })
            } else {
                arregloLM.push({
                    id: datosLinea[0].id,
                    tipo: "linea",
                    nombre: datosLinea[0].linea,
                    velocidadEstandar: datosLinea[0].config.velocidadEstandar,
                    factorConversionI: datosLinea[0].config.factorConversionI,
                    factorConversionO: datosLinea[0].config.factorConversionO,
                    habilitado:`${datosLinea[0].config.habilitado}`
                })
            }
            //--> Maquinas configuradas
            if (datosLinea[0].maquinasConfig) {
                console.log("Informacion maquinas config", datosLinea[0].maquinasConfig)
                let j = 0
                while (j < datosLinea[0].maquinasConfig.length) {
                    arregloLM.push({
                        id: datosLinea[0].maquinasConfig[j].id,
                        tipo: "maquina",
                        nombre: datosLinea[0].maquinasConfig[j].nombre,
                        velocidadEstandar: datosLinea[0].maquinasConfig[j].velocidadEstandar,
                        factorConversionI: datosLinea[0].maquinasConfig[j].factorConversionI,
                        factorConversionO: datosLinea[0].maquinasConfig[j].factorConversionO,
                        habilitado:`${datosLinea[0].maquinasConfig[j].habilitado}`
                    })
                    j++
                }
            }
            //--> Maquinas sin configurar
            if (datosLinea[0].maquinasNoConfig.length>0) {
                let i = 0
                while (i < datosLinea[0].maquinasNoConfig.length) {
                    arregloLM.push({
                        id: datosLinea[0].maquinasNoConfig[i].id,
                        tipo: "maquina",
                        nombre: datosLinea[0].maquinasNoConfig[i].maquina,
                        velocidadEstandar: 0,
                        factorConversionI: 0,
                        factorConversionO: 0,
                        habilitado:"false"
                        
                    })
                    i++
                }
            }
            // console.log(arregloLM)
            setRegistrosEditados(arregloLM)
        }
        return () => {
            setRegistrosEditados([])
        }
        // eslint-disable-next-line
    }, [lineaSeleccionada])

    const enviarParte2 = () => {
        const objetoEnviar = { idProducto: edicion.idProducto, config: registrosEditados }
        // Axios.put(getRoute + "/productos/config/velocidades", objetoEnviar)
        Axios.put(`${getRoute}/${ENVIAR_PARTE2_PRODUCTOS}`, objetoEnviar)
        console.log("Datos enviados")
        console.log(objetoEnviar)
        cerrarTodo()
    }

    const mostrarComponente1 = () => {
        setComponente1(true)
        setComponente2(false)
    }
    const cerrarTodo = () => {
        setModalEditar(false)
        setComponente1(true)
        setComponente2(false)
        setEdicion(edicionVacio)
        setRegistrosEditados([])
        setLineaSeleccionada(null)
    }
    //---> Cancelar o guardar el registro
    const [botonesStep1] = useBotones(
        "Cancelar", "", "py-2 p-button-rounded", cerrarTodo,
        "Siguiente", "", "py-2 p-button-rounded", mostrarComponente2
    )
    const [botonesStep2] = useBotones(
        "Atras", "", "py-2 p-button-rounded", mostrarComponente1,
        "Enviar", "", "py-2 p-button-rounded", enviarParte2
    )

//--------------------| Valor que regresara |--------------------
    return (
        <Dialog
            visible={modalEditar} 
            style={{ width: `${componente1 ? 350 : 850}px` }}
            header="Editar registro"
            className="p-fluid" 
            onHide={cerrarTodo}
            footer={componente1 ? botonesStep1 : botonesStep2}
        >
            {componente1 && (<EditarStep1
                componente2={componente2}
                edicion={edicion}
                actualizarEdicion={actualizarEdicion}
                lineaSeleccionada={lineaSeleccionada}
                setLineaSeleccionada={setLineaSeleccionada} />
            )}
            {componente2 && (
                <EditarStep2
                    registrosEditados={registrosEditados} setRegistrosEditados={setRegistrosEditados}
                />
            )}
            {validarParte1 && <MensajeAdvertencia>{mensaje}</MensajeAdvertencia>}
        </Dialog>
    )
}

export default Editar
