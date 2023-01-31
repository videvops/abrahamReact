import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { MultiSelect } from 'primereact/multiselect'

import { formatearFecha } from '../../helpers/funciones'
import { MensajeFiltro } from '../../../pages/Catalogos/ComponentsCat/Mensajes/Mensajes'

const CabezalDesperdicio = ({ setRegistros, setChartFiltros }) => {
//--------------------| MultiSelect de Plantas  |--------------------
    //---> Obtener registros de back-end
    const [plantasDisponibles, setPlantasDisponibles] = useState([])
    useEffect(() => {
        const cargarPlantas = async () => {
            const respuesta = await Axios.get("http://localhost:8080/plantas/list")
            setPlantasDisponibles(respuesta.data)
        }
        cargarPlantas()
    }, [])
    //---> Lista de plantas seleccionadas
    const [plantas, setPlantas] = useState([])

//--------------------| MultiSelect de Areas  |--------------------
    //---> Obtener registros de back-end
    const [areasDisponibles, setAreasDisponibles] = useState([])
    const obtenerAreas = async () => {
        const respuesta = await Axios.post(`http://localhost:8080/areas/plantas`, plantas)
        setAreasDisponibles(respuesta.data)
    }
    //---> Lista de areas seleccionados
    const [areas, setAreas] = useState([])

//--------------------| MultiSelect de Lineas  |--------------------
    //---> Obtener registros de back-end
    const [lineasDisponibles, setLineasDisponibles] = useState([])
    const obtenerLineas = async () => {
        const respuesta = await Axios.post(`http://localhost:8080/lineas/areas`, areas)
        setLineasDisponibles(respuesta.data)
    }
    //---> Lista de lineas seleccionadas
    const [lineas, setLineas] = useState([])

//--------------------| MultiSelect de Lineas  |--------------------
    //---> Obtener registros de back-end
    const [maquinasDisponibles, setMaquinasDisponibles] = useState([])
    const obtenerMaquinas = async () => {
        const respuesta = await Axios.post(`http://localhost:8080/maquinas/list`, lineas)
        setMaquinasDisponibles(respuesta.data)
    }
    //---> Lista de lineas seleccionadas
    const [maquinas, setMaquinas] = useState([])

//--------------------| Campo para fecha con horas  |--------------------
    const [fechaInicio, setFechaInicio] = useState(null)
    const [fechaFin, setFechaFin] = useState(null)

//--------------------| Funciones para filtro  |--------------------
    const [dialogo, setDialogo] = useState(false)              // Para mostrar dialogo
    const [esValido, setEsValido] = useState(true)
    //---> Enviar datos de back-end a otro componente
    const enviarDatos = async (datos) => {
        const desperdicioMaquinas = await Axios.post(`http://localhost:8080/desperdicio/table/rechazos`,datos)
        setRegistros(desperdicioMaquinas.data)
        setChartFiltros(datos)
    }
    //---> Validara antes de mandar el filtro
    const enviarFiltro = () => {
        if (lineas.length < 1 || plantas.length < 1 || areas.length < 1 || [fechaInicio, fechaFin].includes(null)) {
            setEsValido(false)
            setTimeout(() => {
                setEsValido(true)
            }, 2500);
            return;                                                     // No permite avanzar
        }
        const nuevaFechaInicio = formatearFecha(fechaInicio)
        // console.log(nuevaFechaInicio)
        const nuevaFechaFin = formatearFecha(fechaFin)
        const objeto = { page: 0, total: 10,lineas:[...lineas] ,maquinas: [...maquinas], fechaInc: nuevaFechaInicio, fechaFin: nuevaFechaFin }
        enviarDatos(objeto)
        setEsValido(true)
        setDialogo(false)
    }
    //---> Limpiara los filtros
    const cancelarFiltro=()=>{
        setPlantas([])
        setAreas([])
        setLineas([])
        setMaquinas([])
        setFechaInicio(null)
        setFechaFin(null)
        setEsValido(true)
        setDialogo(false)
    }
    //---> Botones para filtro
    const botonesAccion = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={cancelarFiltro} className="p-button-text" />
                <Button label="Consultar" icon="pi pi-check" onClick={enviarFiltro} autoFocus />
            </div>
        );
    }

//--------------------| Valor que regresara  |--------------------
    return (
        <div className="col-12 ">
            <div className="card mb-0" style={{ textAlign: "center", background: "#6366f2" }}>
                <span className=" font-bold" style={{ fontSize: "25px", color: "white" }}>
                    Desperdicio
                </span>
            </div>
            <br/>
            <Button label="Filtro" icon="pi pi-filter-fill" onClick={() => setDialogo(true)} />
            <Dialog
                header="Filtro para Desperdicio"
                visible={dialogo}
                footer={botonesAccion}
                onHide={() => setDialogo(false)}
            >
                <div className="grid p-fluid">
                    <div className="col-12 md:col-4">
                        <label className="font-bold">Planta</label>
                        <MultiSelect
                            optionLabel="planta" 
                            optionValue="id"
                            placeholder="Escoje una planta" 
                            options={plantasDisponibles} 
                            value={plantas} 
                            onChange={(e) => {setPlantas(e.target.value)}} 
                            maxSelectedLabels={1}
                            filter
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="font-bold">Area</label>
                        <MultiSelect
                            optionLabel="area" 
                            optionValue="id"
                            placeholder="Escoje una area" 
                            options={areasDisponibles} 
                            value={areas} 
                            onChange={(e) => {setAreas(e.target.value)}} 
                            maxSelectedLabels={1}
                            onFocus={obtenerAreas}
                            filter
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="font-bold">Linea</label>
                        <MultiSelect
                            optionLabel="linea" 
                            optionValue="id"
                            placeholder="Escoje una linea" 
                            options={lineasDisponibles} 
                            value={lineas} 
                            onChange={(e) => {setLineas(e.target.value)}} 
                            maxSelectedLabels={1}
                            onFocus={obtenerLineas}
                            filter
                        />
                    </div>
                </div>
                <br/>
                <div className="grid p-fluid">
                    <div className="field col-12 md:col-4">
                        <label className="font-bold">Maquina</label>
                        <MultiSelect
                            optionLabel="maquina" 
                            optionValue="id"
                            placeholder="Escoje una maquina" 
                            options={maquinasDisponibles} 
                            value={maquinas} 
                            onChange={(e) => {setMaquinas(e.target.value)}} 
                            maxSelectedLabels={1}
                            onFocus={obtenerMaquinas}
                            filter
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label className="font-bold">Fecha Inicio</label>
                        <Calendar 
                            id="time24" 
                            dateFormat="yy/mm/dd"
                            value={fechaInicio} 
                            onChange={(e) => setFechaInicio(e.value)} 
                            showTime 
                            placeholder="--Fecha Inicio--" 
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label className="font-bold">Hora Fin</label>
                        <Calendar 
                            id="time24" 
                            dateFormat="yy/mm/dd"
                            value={fechaFin} 
                            onChange={(e) => setFechaFin(e.value)} 
                            showTime 
                            placeholder="--Fecha Fin--"
                            minDate={fechaInicio}
                        />
                    </div>
                </div>
                {!esValido && MensajeFiltro}
            </Dialog>
        </div>
    )
}

export default CabezalDesperdicio
