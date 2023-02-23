import React,{ useEffect, useState } from "react";
import Tacometros from "../Tacometros";
import TablaMayorImpacto from "../Tablas/TablaMayorImpacto"
import TablaUltimosParos from "../Tablas/TablaUltimosParos"
import Environment from "../../../Environment";
import { LineaService } from "../../../service/LineaService";
import Axios from "axios";

const Consultas =  ({filtros}) =>{
    const lineaService = new LineaService ();
    const getRoute = Environment ();

    const [registrosUltimosParos, setRegistrosUltimosParos] = useState([]);
    const [registrosTopFive, setRegistrosTopFive] = useState([]);
    const [tacometrosData, setTacometrosData] = useState([]);
    const [datosDeConsulta, setDatosDeConsulta] = useState({});

    const intervalos = async (id,tag) =>{
        const objIntervalos = {
            idLinea:id,
            indicador:tag
        }
        try{
            const res = await Axios.post(`${getRoute}/utilerias/getFechasForLiveScreen`,objIntervalos);
            const obj = {
                fechaInicio:res.data.fechaInicio, //"2022-11-21 08:01:00",//
                fechaFin:res.data.fechaFin,//"2022-11-21 16:00:34",//
                linea:id
            }
            setDatosDeConsulta(obj)
        } catch(e){
            console.log(e)
        }
    }

    const getData = () =>{
        if(Object.entries(filtros).length === 0 || Object.entries(datosDeConsulta).length === 0){
            lineaService.readAll().then(res =>  intervalos (res[0].id,"TURNO_ACTUAL") ).catch(e => console.log(e));
        }else{
            intervalos (filtros.linea,filtros.indicador)
        }
    }



    let urlUltimosParos="";
    let urlTopFive ="";
    let urlTacometros="";

    if(Object.entries(datosDeConsulta).length > 0){
        urlUltimosParos =`${getRoute}/paros/ultimosParos/linea/${datosDeConsulta.linea}`;
        urlTopFive = `${getRoute}/paros/topFive/linea/${datosDeConsulta.linea}`;
        urlTacometros=`${getRoute}/indicadores/monitor/linea/${datosDeConsulta.linea}`;
    }

    useEffect(()=>{

    },[urlTopFive,reload])

    // console.log(datosDeConsulta)
    useEffect(()=>{
        getData();
    },[filtros])

    const [reload,setReload] =useState(0);
    useEffect(()=>{
        setTimeout(()=>{
            getData();
            console.log("axios")
            console.log(datosDeConsulta)
            if(Object.entries(datosDeConsulta).length !== 0){
                Axios.post(urlUltimosParos,datosDeConsulta).then( res => setRegistrosUltimosParos(res.data) ).catch (e=>console.log(e) );
                Axios.post(urlTopFive,datosDeConsulta).then( res => setRegistrosTopFive(res.data) ).catch(e=>console.log(e) );
                Axios.post(urlTacometros,datosDeConsulta).then(res => setTacometrosData(res.data) ).catch(e=>console.log(e));
            }
            setReload(Date.now())            
        },1000)
    },[reload])




    return (
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
    )
}
export default Consultas ; 