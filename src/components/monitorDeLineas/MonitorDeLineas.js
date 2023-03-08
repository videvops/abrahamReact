import React,{useState } from "react";
import {FiltroMonitorDeParos} from "./FiltroMonitorDeLineas";
import TablaMayorImpacto from "./Tablas/TablaMayorImpacto";
import TablaUltimosParos from "./Tablas/TablaUltimosParos";
import { SelecconaFiltros } from "../mensajes/Mensajes";
import Spinner from "../loader/Spinner";


const MonitorDeLineas = () =>{

    const [registrosUltimosParos, setRegistrosUltimosParos] = useState([]); 
    const [registrosTopFive, setRegistrosTopFive] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return(
        <div className="col-12">

            <div className="col-12 md:col-12 sm:col-12">
                <FiltroMonitorDeParos  
                    setRegistrosUltimosParos={setRegistrosUltimosParos}
                    setRegistrosTopFive={setRegistrosTopFive}
                    setIsLoading= {setIsLoading}
                />
            </div>

            <br></br>
            <div className="md:col-12 grid p-fluid">
                <div className="md:col-6 sm:col-12">
                    <div className="md:col-12 card mb-4" style={{ textAlign: "center", background: "#6366f2"}}>
                        <span className=" font-bold" style={{ fontSize: "15px", color: "white" }}>
                            Ultimos Paros
                        </span>
                    </div>
                        <TablaUltimosParos
                            registros={registrosUltimosParos}
                        />
                </div>
                <div className="md:col-6 sm:col-12">
                    <div className="md:col-12 card mb-4 " style={{ textAlign: "center", background: "#6366f2" }}>
                        <span className=" font-bold" style={{ fontSize: "15px", color: "white" }}>
                            Top 5 Mayor impacto
                        </span>
                    </div>
                    <TablaMayorImpacto
                        registros={registrosTopFive}                       
                    />
                </div>
            </div>

            <br></br>
            {registrosTopFive.length === 0 && registrosUltimosParos.length === 0 ? (
                <div className="col-12 md:col-12 sm:col-12">
                    <SelecconaFiltros 
                        categoria="registros de monitor de linea"
                    />
                </div>
                ):(<></>)}

            {isLoading ? (
                <div className="col-12 md:col-12 sm:col-12">
                    <Spinner></Spinner>
                </div>
            ):(<></>)}

        </div>
    )
}

export default MonitorDeLineas
