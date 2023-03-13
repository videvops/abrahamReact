import React, { useState, useEffect,useRef } from 'react'
import Axios from "axios"
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { formatearFecha } from '../helpers/funciones'
import { MensajeFiltro } from '../../pages/Catalogos/ComponentsCat/Mensajes/Mensajes'
import { Dropdown } from 'primereact/dropdown'
import Environment from "../../Environment";
import { Toast } from 'primereact/toast';

// URIS
 import { ULTIMOS_PAROS,TOP_FIVE,PLANTAS_GET_COMBO,PLANTAS_AREAS,LINEAS_AREAS,REPORTE_MONITOR_LINEA } from '../../genericos/Uris';

export const FiltroMonitorDeParos = ({ setRegistrosTopFive,setRegistrosUltimosParos,setIsLoading}) => {


    const getRoute = Environment();

    const [plantasDisponibles, setPlantasDisponibles] = useState([])
    useEffect(() => {
        const cargarPlantas = async () => {
            const respuesta = await Axios.get(`${getRoute}/${PLANTAS_GET_COMBO}`)
            setPlantasDisponibles(respuesta.data)
        }
        cargarPlantas()
    }, [])
    const [plantas, setPlantas] = useState([])


    const [areasDisponibles, setAreasDisponibles] = useState([])
    const obtenerAreas = async () => {
        let plantasArr = [plantas]
        const respuesta = await Axios.post(`${getRoute}/${PLANTAS_AREAS}`, plantasArr)
        setAreasDisponibles(respuesta.data)
    }
    const [areas, setAreas] = useState([])


    const [lineasDisponibles, setLineasDisponibles] = useState([])
    const obtenerLineas = async () => {
        let areasArr = [areas]
        const respuesta = await Axios.post(`${getRoute}/${LINEAS_AREAS}`, areasArr)
        setLineasDisponibles(respuesta.data)
    }
    const [lineas, setLineas] = useState([])

    const [fechaInicio, setFechaInicio] = useState(null)
    const [fechaFin, setFechaFin] = useState(null)

    const [dialogo, setDialogo] = useState(false)             
    const [esValido, setEsValido] = useState(true)

    const enviarDatos = (datos) => {
        setIsLoading(true)
        setRegistrosUltimosParos([{}])
        const urlUltimosParos =`${getRoute}/${ULTIMOS_PAROS}/${datos.linea}`
        const urlTopFive = `${getRoute}/${TOP_FIVE}/${datos.linea}`
        Axios.post(urlUltimosParos, datos).then( res =>{
            setRegistrosUltimosParos(res.data)
            Axios.post(urlTopFive,datos). then(res => {
                setRegistrosTopFive(res.data)
                setIsLoading(false)
            }).catch(e => console.log(e))
        }).catch(e=> console.log(e))

    }

    const enviarFiltro = () => {
        if (lineas.length < 1 || plantas.length < 1 || areas.length < 1 || [fechaInicio, fechaFin].includes(null)) {
            setEsValido(false)
            setTimeout(() => {
                setEsValido(true)
            }, 2500);
            return;                                                     
        }
        const nuevaFechaInicio = formatearFecha(fechaInicio)
        const nuevaFechaFin = formatearFecha(fechaFin)
        const objeto = { linea:lineas, fechaInicio: nuevaFechaInicio, fechaFin: nuevaFechaFin }
        enviarDatos(objeto)
        setEsValido(true)
        setDialogo(false)
    }
    
    const cancelarFiltro=()=>{
        setPlantas([])
        setAreas([])
        setLineas([])
        setFechaInicio(null)
        setFechaFin(null)
        setEsValido(true)
        setDialogo(false)
    }

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
                module.default.saveAs(data, "Listado_de_paros" + "_export_" + new Date().getTime());
            }
        });
    }

    const toast = useRef(null)
    const [loading, setLoading]= useState(false);

    const loadFilter = () => {
        if(fechaFin === null || fechaInicio === null){
            toast.current.show({ severity: 'error', summary: 'Atencion!', detail: `${"Por favor selecciona una fecha"}`, life: 3000 });
            return ;
        }
        if (lineas.length === 0){
            toast.current.show({ severity: 'error', summary: 'Atencion!', detail: `${"Por favor selecciona las maquinas"}`, life: 3000 });
            return ;
        }
        setLoading(true)
        const filtrosDownload = {
            fechaInc:formatearFecha(fechaInicio),//'2022-11-21 15:37:21',   
            fechaFin:formatearFecha(fechaFin), //'2022-11-26 11:47:17' ,  //
        }
        Axios.post(`${getRoute}/${REPORTE_MONITOR_LINEA}/${lineas}`,filtrosDownload,{responseType: 'blob'}).then(res =>{
            toast.current.show({ severity: 'success', summary: 'Descargando!', detail: `${"Por favor guarda tu archivo"}`, life: 3000 });
            downloadData(res.data)
            setLoading(false)
        })
        .catch( e =>{
            toast.current.show({ severity: 'error', summary: 'Algo ha salido mal!', detail: `${"Comunicate con el administrador del sistema"}`, life: 3000 });
            // setLoading(false)
            console.log(e)
        })

    }


//--------------------| Valor que regresara  |--------------------
    return (
        <div className="col-12 ">
            <div className="card mb-0" style={{ textAlign: "center", background: "#6366f2" }}>
                <span className=" font-bold" style={{ fontSize: "25px", color: "white" }}>
                    Monitor de Linea
                </span>
            </div>
            <Toast ref={toast} />
            <br/>
            <div className='clas col-12 md:col-12 flex justify-content-between '>
                <Button label="Filtro" icon="pi pi-filter-fill" onClick={() => setDialogo(true)} />
                <Button label="Excel" icon="pi pi-file-excel" loading={loading} className="p-button-success mr-2" onClick={loadFilter} />
            </div>
            <Dialog
                header="Filtro Para Monitor de Linea"
                visible={dialogo}
                footer={botonesAccion}
                onHide={() => setDialogo(false)}
        >
                <div className="grid p-fluid">
                    <div className="col-12 md:col-4">
                        <label className="font-bold">Planta</label>
                        <Dropdown 
                            optionLabel="planta" 
                            optionValue="id" 
                            placeholder="Selecciona una planta"
                            options={plantasDisponibles}
                            value={plantas}  
                            onChange={(e) => setPlantas(e.target.value)} 
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="font-bold">Area</label>
                        <Dropdown
                            optionLabel="area" 
                            optionValue="id"
                            placeholder="Escoje una area" 
                            options={areasDisponibles} 
                            value={areas} 
                            onChange={(e) => {setAreas(e.target.value)}}
                            onFocus={obtenerAreas} 
                        />
                    </div>

                    <div className="col-12 md:col-4">
                        <label className="font-bold">Linea</label>
                        <Dropdown
                            optionLabel="linea" 
                            optionValue="id"
                            placeholder="Escoje una linea" 
                            options={lineasDisponibles} 
                            value={lineas} 
                            onChange={(e) => {setLineas(e.target.value)}} 
                            onFocus={obtenerLineas}
                        />
                    </div>
                </div>
                <br/>
                <div className="grid p-fluid">
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


