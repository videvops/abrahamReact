import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { MultiSelect } from 'primereact/multiselect'
import { formatearFecha } from '../../helpers/funciones'
import { MensajeFiltro } from '../../../pages/Catalogos/ComponentsCat/Mensajes/Mensajes'
import Environment from "../../../Environment";
import { Toast } from 'primereact/toast';
import {Service} from "../../../service/Service";
import {DESPERDICIO_REPORTE} from "../../../genericos/Uris";
import { PLANTAS_GET_COMBO,PLANTAS_AREAS,LINEAS_AREAS,MAQUINAS_GET_COMBO,DESPERDICIO_TABLE} from '../../../genericos/Uris'

const CabezalDesperdicio = ({ setRegistros, setChartFiltros,setIsLoading }) => {
    
    const [loading, setLoading] = useState(false);
    const servicio = new Service();
//--------------------| MultiSelect de Plantas  |--------------------
    //---> Obtener registros de back-end
    
    const getRoute = Environment()

    const [plantasDisponibles, setPlantasDisponibles] = useState([])
    useEffect(() => {
        const cargarPlantas = async () => {
            const respuesta = await Axios.get(`${getRoute}/${PLANTAS_GET_COMBO}`)
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
        const respuesta = await Axios.post(`${getRoute}/${PLANTAS_AREAS}`, plantas)
        setAreasDisponibles(respuesta.data)
    }
    //---> Lista de areas seleccionados
    const [areas, setAreas] = useState([])

//--------------------| MultiSelect de Lineas  |--------------------
    //---> Obtener registros de back-end
    const [lineasDisponibles, setLineasDisponibles] = useState([])
    const obtenerLineas = async () => {
        const respuesta = await Axios.post(`${getRoute}/${LINEAS_AREAS}`, areas)
        setLineasDisponibles(respuesta.data)
    }
    //---> Lista de lineas seleccionadas
    const [lineas, setLineas] = useState([])

//--------------------| MultiSelect de Lineas  |--------------------
    //---> Obtener registros de back-end
    const [maquinasDisponibles, setMaquinasDisponibles] = useState([])
    const obtenerMaquinas = async () => {
        const respuesta = await Axios.post(`${getRoute}/${MAQUINAS_GET_COMBO}`, lineas)
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
        setIsLoading(true)
        setRegistros([{data:"data"}])
        await Axios.post(`${getRoute}/${DESPERDICIO_TABLE}`,datos).then(res =>{
            setRegistros(res.data)
            setChartFiltros(datos)
            setIsLoading(false)
        })
        .catch(e=>console.log(e));
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

    const downloadData = (blob) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";
                const data = new Blob([blob], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(data, "Desperdicio" + "_export_" + new Date().getTime());
            }
        });
    }

    
    const toast = useRef(null)
    
    const loadFilter = async () => {
        if(fechaFin === null || fechaInicio === null){
            toast.current.show({ severity: 'error', summary: 'Atencion!', detail: `${"Por favor selecciona una fecha"}`, life: 3000 });
            return ;
        }
        if (maquinas.length === 0){
            toast.current.show({ severity: 'error', summary: 'Atencion!', detail: `${"Por favor selecciona las maquinas"}`, life: 3000 });
            return ;
        }
        const filtrosDownload = {
            fechaInc:formatearFecha(fechaInicio),
            fechaFin:formatearFecha(fechaFin), 
            maquinas:maquinas
        }
        
        try{
            setLoading(true)         
            servicio.baseUrl=servicio.baseUrl+DESPERDICIO_REPORTE;
            const JSobj = JSON.parse(JSON.stringify(filtrosDownload));
            const data = await servicio.createReport(JSobj);
            downloadData(data)
            setLoading(false)
            toast.current.show({ severity: 'success', summary: 'Descargando!', detail: `${"Por favor guarda tu archivo"}`, life: 3000 });
    
        }
        catch(error){
            toast.current.show({ severity: 'error', summary: 'Algo ha salido mal!', detail: `${"Comunicate con el administrador del sistema"}`, life: 3000 });
            // setLoading(false)
            console.log(error)
        }

    }
//--------------------| Valor que regresara  |--------------------
    return (
        <div className="col-12 ">
            <div className="card mb-0" style={{ textAlign: "center", background: "#6366f2" }}>
                <span className=" font-bold" style={{ fontSize: "25px", color: "white" }}>
                    Desperdicio
                </span>
            </div>
            <Toast ref={toast} />
            <br/>
            <div className='clas col-12 md:col-12 flex justify-content-between '>
                <Button label="Filtro" icon="pi pi-filter-fill" onClick={() => setDialogo(true)} />
                <Button label="Excel" icon="pi pi-file-excel"  loading={loading} className="p-button-success mr-2" onClick={loadFilter} />
            </div>
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
