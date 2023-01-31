import React from "react";
import Iframe from 'react-iframe'
import {getDateSplitted,getStringData} from "../../helpers/funciones"

const DesperdicioMaquina = ({filtros}) => {
    if(Object.entries(filtros).length === 0){
        return(<h3>No hay informacion disponible</h3>)
    }else{
        const strMaquinas = getStringData(filtros.maquinas)
        const fechaInicio = getDateSplitted(filtros.fechaInc);
        const fechaFin = getDateSplitted(filtros.fechaFin);

       //let urlOriginal = "http://localhost:3000/d-solo/DtaYRtpVz/new-dashboard?orgId=1&var-planta=1&var-area=1&var-linea=1&var-maquina=1&"
       //urlOriginal += "var-inicio_intervalo=2022-11-21+15%3A37%3A21&var-fin_intervalo=2022-11-26+11%3A47%3A17&var-maquinasArr=1%2C2%2C3&var-lineasArr=1%2C2%2C3%2C4&from=1675184921705&to=1675206521705&panelId=12"



        // Cambiar URLs

        let urlDesperdicioMaquina = "http://localhost:3000/d-solo/DtaYRtpVz/new-dashboard?orgId=1&var-planta=1&var-area=1&var-linea=1&var-maquina=1&"
        urlDesperdicioMaquina+= "var-inicio_intervalo="+fechaInicio.date+"+"+fechaInicio.hours+"%3A"+fechaInicio.mins+"%3A"+fechaInicio.secs+"&"
        urlDesperdicioMaquina+= "var-fin_intervalo="+fechaFin.date+"+"+fechaFin.hours+"%3A"+fechaFin.mins+"%3A"+fechaFin.secs+"&"
        urlDesperdicioMaquina+= "var-maquinasArr="+strMaquinas+"&panelId=12"
        
        // 



        return (
            <div className="Layout-main col-12 md:col-12">
                <Iframe url={urlDesperdicioMaquina} 
                    width="100%"
                    height="100%"
                    frameBorder={0} />
            </div>        
        )
    }
} 

export default DesperdicioMaquina