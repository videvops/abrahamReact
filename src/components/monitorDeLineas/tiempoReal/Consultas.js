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
    const [filtroTacometro, setFiltroTacometro] = useState([]);

    const [datosDeConsulta, setDatosDeConsulta] = useState({})





    const nuevaFechaInicio = "2022-11-20 15:37:21"//formatearFecha(fechaInicio)
    const nuevaFechaFin = "2022-11-28 11:47:17"//formatearFecha(fechaFin)


    useEffect(()=>{
        if(Object.entries(filtros).length === 0){
            if(Object.entries(datosDeConsulta).length === 0){
                lineaService.readAll()
                .then((data)=>{
                    const obj ={linea:data[0].id, fechaInicio: nuevaFechaInicio, fechaFin: nuevaFechaFin}
                    setDatosDeConsulta(obj)
                })
                .catch((e)=>{console.error(e)})
            }
        }else{
            const obj ={linea:filtros.lineas, fechaInicio: nuevaFechaInicio, fechaFin: nuevaFechaFin}
            setDatosDeConsulta(obj)
        }
    },[filtros])

    let  urlUltimosParos="";
    let  urlTopFive ="";
    if(Object.entries(datosDeConsulta).length > 0){
        urlUltimosParos =`${getRoute}/paros/ultimosParos/linea/${datosDeConsulta.linea}`;
        urlTopFive = `${getRoute}/paros/topFive/linea/${datosDeConsulta.linea}`;
    }

    const [reload,setReload] =useState(0);
    useEffect(() =>{
        setTimeout(()=>{
            setReload(Date.now())            
        },10000)
    },[reload])


    useEffect(()=>{
        Axios.post(urlUltimosParos,datosDeConsulta).then((data)=>{
            setRegistrosUltimosParos(data.data)
        }).catch((e)=>{
            console.log(e)
        });
        Axios.post(urlTopFive,datosDeConsulta).then((data)=>{
            setRegistrosTopFive(data.data)
        }).catch((e)=>{
            console.log(e)
        });
        setFiltroTacometro(datosDeConsulta)
    },[urlTopFive,reload])



    return (
        <>
            <div className="col-12 md:col-12 mt-5">
                <Tacometros
                    filtros={filtroTacometro}
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
