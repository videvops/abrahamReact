import React from "react";
import {getDateSplitted} from "../helpers/funciones"

const Tacometros = ({filtros}) =>{
    if(Object.entries(filtros).length === 0){
        return (
            <div className="col-12 md:col-12 grid p-fluid">
                <h3>No hay informacion disponible</h3>
            </div>
        )
    }
    else {
        const fechaInicio = getDateSplitted(filtros.fechaInicio);
        const fechaFin = getDateSplitted(filtros.fechaFin);
        let urlTacometro= "http://localhost:3000/d-solo/DtaYRtpVz/new-dashboard?orgId=1&var-planta=1&var-area=1&var-linea=1&var-maquina=1&"
        urlTacometro+= "var-inicio_intervalo=%27"+fechaInicio.date+"+"+fechaInicio.hours+"%3A"+fechaInicio.mins+"%3A"+fechaInicio.secs+"%27&"
        urlTacometro+= "var-fin_intervalo=%27"+fechaFin.date+"+"+fechaFin.hours+"%3A"+fechaFin.mins+"%3A"+fechaFin.secs
        urlTacometro+= "%27&panelId=4"        
        return(
            <div className="col-12 md:col-12">
                <div className="card mb-4 p-0" style={{ textAlign: "center", background: "#ffffff" }}>
                    <iframe src={urlTacometro} frameBorder={0} style={{width:'100%', height:'200px'}}></iframe>
                </div>
            </div>
        )
    }

}

export default Tacometros  