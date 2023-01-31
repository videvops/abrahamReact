import React from "react";
import Iframe from 'react-iframe'
import {getDateSplitted} from "../../helpers/funciones"

const BarChartTiempoMuertoGrafica = ({filtros}) => {
    if(Object.entries(filtros).length === 0){
        return (
            <div className="col-12 md:col-12 grid p-fluid">
                <h3>No hay informacion disponible</h3>
            </div>
        )
    }else{
        let strMaquinas = ""
        filtros.maquinas.forEach((numero, index) => {
              if(index+1 !== filtros.maquinas.length){
                  strMaquinas +=numero+'%2C'
              }else{
                strMaquinas += numero
              }
        });
        const fechaInicio = getDateSplitted(filtros.fechaInc);
        const fechaFin = getDateSplitted(filtros.fechaFin);
        let urlTiempoMuerto = "http://localhost:3000/d-solo/DtaYRtpVz/new-dashboard?orgId=1&var-planta=1&var-area=1&var-linea=1&var-maquina=1&"
        urlTiempoMuerto+= "var-inicio_intervalo=%27"+fechaInicio.date+"+"+fechaInicio.hours+"%3A"+fechaInicio.mins+"%3A"+fechaInicio.secs+"%27&"
        urlTiempoMuerto+= "var-fin_intervalo=%27"+fechaFin.date+"+"+fechaFin.hours+"%3A"+fechaFin.mins+"%3A"+fechaFin.secs+"%27&"
        urlTiempoMuerto += "var-maquinasArr="+strMaquinas+"&panelId=8"
    
        return (
            <div className="Layout-main col-12 md:col-12">
                <Iframe url={urlTiempoMuerto} 
                    width="100%"
                    height="100%"
                    frameBorder={0} />
            </div>        
        )
    }
}

export default BarChartTiempoMuertoGrafica


