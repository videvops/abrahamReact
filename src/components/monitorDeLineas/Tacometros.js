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
        
        let urlTacometro = `https://ec2-3-20-237-147.us-east-2.compute.amazonaws.com:3000/d-solo/s5XhbD0Vz/ublick?orgId=1&`
        urlTacometro += `var-inicio_intervalo=${fechaInicio.date}+${fechaInicio.hours}%3A${fechaInicio.mins}%3A${fechaFin.secs}&`
        urlTacometro += `var-fin_intervalo=${fechaFin.date}+${fechaFin.hours}%3A${fechaFin.mins}%3A${fechaFin.secs}&`
        urlTacometro += `var-maquinasArr=2%2C&`
        urlTacometro += `var-lineasArr=1%2C&`
        urlTacometro += `var-linea=${filtros.linea}&panelId=14`
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