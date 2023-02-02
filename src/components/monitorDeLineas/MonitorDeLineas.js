import React from "react";
import {FiltroMonitorDeParos} from "./FiltroMonitorDeLineas";
import Data from "./Data";

const MonitorDeLineas = ({tiempoReal}) =>{
    
    return(
        <div className="col-12">
            <div className="col-12 md:col-12">
                <FiltroMonitorDeParos/>
            </div>
            <Data 
                filtroTacometro ="datos"
                registrosUltimosParos="datos"
                registrosTopFive="datos" />
        </div>
    )
}

export default MonitorDeLineas
