import React from "react";
import Iframe from 'react-iframe'
import {getDateSplitted,getStringData} from "../../helpers/funciones"

const DesperdicioLinea = ({filtros}) => {

    // const filtros = {
    //     "lineas":[1,2,3,4,5,6],
    //     "fechaInc":"2020-11-21 15:37:21",
    //     "fechaFin":"2022-11-26 11:47:17"
    // }

    if(Object.entries(filtros).length === 0){
        return(<h3>No hay informacion disponible</h3>)
    }else{
        
        const strLineas = getStringData(filtros.lineas)
        const fechaInicio = getDateSplitted(filtros.fechaInc);
        const fechaFin = getDateSplitted(filtros.fechaFin);



        let urlDesperdicioLinea = `http://ec2-3-20-237-147.us-east-2.compute.amazonaws.com:3000/d-solo/s5XhbD0Vz/ublick?orgId=1&`
        urlDesperdicioLinea += `var-inicio_intervalo=${fechaInicio.date}+${fechaInicio.hours}%3A${fechaInicio.mins}%3A${fechaFin.secs}&`
        urlDesperdicioLinea += `var-fin_intervalo=${fechaFin.date}+${fechaFin.hours}%3A${fechaFin.mins}%3A${fechaFin.secs}&`
        urlDesperdicioLinea += `var-maquinasArr=1&`
        urlDesperdicioLinea += `var-lineasArr=${strLineas}&`
        urlDesperdicioLinea += `panelId=2`
        
     
        
        
        
        // URL localhost
        // let urlDesperdicioLinea = "http://localhost:3000/d-solo/DtaYRtpVz/new-dashboard?orgId=1&"
        // urlDesperdicioLinea += "var-planta=1&var-area=1&var-linea=1&var-maquina=1&"
        // urlDesperdicioLinea+= "var-inicio_intervalo="+fechaInicio.date+"+"+fechaInicio.hours+"%3A"+fechaInicio.mins+"%3A"+fechaInicio.secs+"&"
        // urlDesperdicioLinea+= "var-fin_intervalo="+fechaFin.date+"+"+fechaFin.hours+"%3A"+fechaFin.mins+"%3A"+fechaFin.secs+"&"
        // urlDesperdicioLinea+= "var-maquinasArr="+strMaquinas+"&panelId=16"
        // 

        return (
            <div className="Layout-main col-12 md:col-12">
                <Iframe url={urlDesperdicioLinea} 
                    width="100%"
                    height="100%"
                    frameBorder={0} />
            </div>        
        )
    }
} 
export default DesperdicioLinea