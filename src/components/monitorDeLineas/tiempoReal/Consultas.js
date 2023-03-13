import React,{ useEffect, useState, useRef } from "react";
import Tacometros from "../Tacometros";
import TablaMayorImpacto from "../Tablas/TablaMayorImpacto"
import TablaUltimosParos from "../Tablas/TablaUltimosParos"
import Environment from "../../../Environment";
import { LineaService } from "../../../service/LineaService";
import Axios from "axios";
import Spinner from "../../loader/Spinner";
import { SelecconaFiltros } from "../../mensajes/Mensajes";
import {TimeToReload} from  "../../../Environment";
import { ULTIMOS_PAROS,TOP_FIVE,INDICADORES_MONITOR_LINEA,GET_FECHAS_FOR_LIVE_SCREEN} from "../../../genericos/Uris";

const Consultas =  ({filtros}) =>{

    const lineaService = new LineaService ();
    const getRoute = Environment ();
    const timeToReload = TimeToReload();
    const [nombreLinea,setNombreLinea] = useState("")
    const [indicador, setIndicador] = useState("");

    const [registrosUltimosParos, setRegistrosUltimosParos] = useState([]);
    const [registrosTopFive, setRegistrosTopFive] = useState([]);
    const [tacometrosData, setTacometrosData] = useState([]);
    const [datosDeConsulta, setDatosDeConsulta] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let timeoutID = useRef(null); 

    const intervalos = async (id,tag) =>{
        const objIntervalos = {
            idLinea:id,
            indicador:tag
        }
        try{
            const res = await Axios.post(`${getRoute}/${GET_FECHAS_FOR_LIVE_SCREEN}`,objIntervalos);
            const obj = {
                fechaInicio:res.data.fechaInicio,//"2022-11-21 08:01:00", 
                fechaFin:res.data.fechaFin,//"2022-11-26 17:00:34",//
                linea:id
            }
            setDatosDeConsulta(obj)
        } catch(e){
            console.log(e)
        }
    }

    const getData = () =>{
        if(Object.entries(filtros).length === 0 || Object.entries(datosDeConsulta).length === 0){
            lineaService.readAll().then(res =>  {
                intervalos (res[0].id,"TURNO_ACTUAL")
                setNombreLinea(res[0].linea)
                setIndicador("TURNO_ACTUAL")
            }).catch(e => console.log(e));
        }else{
            intervalos (filtros.linea,filtros.indicador)
            setNombreLinea(filtros.nombre)
            setIndicador(filtros.indicador)
        }
        if(Object.entries(datosDeConsulta).length !== 0){
            Axios.post(urlUltimosParos,datosDeConsulta).then( res => setRegistrosUltimosParos(res.data)).catch (e=>console.log(e));
            Axios.post(urlTopFive,datosDeConsulta).then( res => setRegistrosTopFive(res.data)).catch(e=>console.log(e));
            Axios.post(urlTacometros,datosDeConsulta).then(res => setTacometrosData(res.data)).catch(e=>console.log(e));
        }
    }

    let urlUltimosParos="";
    let urlTopFive ="";
    let urlTacometros="";

    if(Object.entries(datosDeConsulta).length > 0){
        urlUltimosParos =`${getRoute}/${ULTIMOS_PAROS}/${datosDeConsulta.linea}`;
        urlTopFive = `${getRoute}/${TOP_FIVE}/${datosDeConsulta.linea}`;
        urlTacometros=`${getRoute}/${INDICADORES_MONITOR_LINEA}/${datosDeConsulta.linea}`;
    }

    useEffect(()=>{
        setIsLoading(true)
        getData();
    },[filtros])

    const [reload,setReload] =useState(0);
    useEffect(()=>{
        timeoutID.current = setTimeout(()=>{
            setReload(Date.now()) 
            setIsLoading(false)   
        },timeToReload)
        getData();
        return () => {
            clearTimeout(timeoutID.current)
            console.log("timeout cleared")
          }
    },[reload])

    return (
        <>
            {indicador == "TURNO_ACTUAL" ? (
                <h1>Linea {nombreLinea} turno actual.</h1> 
            ):(
                <h1>Linea {nombreLinea} ultima hora. </h1> 
            )} 

            {!isLoading  ?(
                <>
                 {registrosTopFive.length > 0? (
                    <>
                        <div className="col-12 md:col-12 mt-5">
                            <Tacometros
                                data={tacometrosData}
                            />
                        </div>
                        <br></br>
                        <div className="col-12 md:col-12 grid p-fluid">
                            <div className="col-6 md:col-6">
                                <div className="col-12 md:col-12 card mb-4" style={{ textAlign: "center", background: "#6366f2"}}>
                                    <span className=" font-bold" style={{ fontSize: "15px", color: "white" }}>
                                        Ultimos Paros
                                    </span>
                                </div>
                                <TablaUltimosParos
                                    registros={registrosUltimosParos}  
                                />
                            </div>
                            <div className="col-6 md:col-6 ">
                                <div className="col-12 md:col-12 card mb-4 " style={{ textAlign: "center", background: "#6366f2" }}>
                                    <span className=" font-bold" style={{ fontSize: "15px", color: "white" }}>
                                        Top 5 Mayor impacto
                                    </span>
                                </div>
                                <TablaMayorImpacto
                                    registros={registrosTopFive}
                                />
                                </div>
                        </div>
                    </>
                ) : ( <SelecconaFiltros 
                    categoria="monitor de lineas"
                /> )}
                </>
            ):(
                <Spinner/>
            )}
        </>
    )
}
export default Consultas ; 