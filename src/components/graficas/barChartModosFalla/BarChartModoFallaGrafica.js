import React from "react";
import Iframe from 'react-iframe'
import {getDateSplitted,getStringData} from "../../helpers/funciones"

const BarChartModoFallaGrafica = ({filtros}) => {
    
    // const filtros = {
    //     "maquinas":[1,2,3,4],
    //     "fechaInc":"2020-11-21 15:37:21",
    //     "fechaFin":"2022-11-26 11:47:17"
    // }

    if(Object.entries(filtros).length === 0){
        return(<h3>No hay informacion disponible</h3>)
    }else{

        const strMaquinas = getStringData(filtros.maquinas)
        const fechaInicio = getDateSplitted(filtros.fechaInc);
        const fechaFin = getDateSplitted(filtros.fechaFin);
        let urlModoDeFalla = `https://ec2-3-20-237-147.us-east-2.compute.amazonaws.com:3000/d-solo/s5XhbD0Vz/ublick?orgId=1&`
        urlModoDeFalla += `var-inicio_intervalo=${fechaInicio.date}+${fechaInicio.hours}%3A${fechaInicio.mins}%3A${fechaFin.secs}&`
        urlModoDeFalla += `var-fin_intervalo=${fechaFin.date}+${fechaFin.hours}%3A${fechaFin.mins}%3A${fechaFin.secs}&`
        urlModoDeFalla += `var-maquinasArr=${strMaquinas}&`
        urlModoDeFalla += `var-lineasArr=1&`
        urlModoDeFalla += `showCategory=Panel+options&panelId=12`

        // URL Local host
        // let urlModoDeFalla = "http://localhost:3000/d-solo/DtaYRtpVz/new-dashboard?orgId=1&var-planta=1&var-area=1&var-linea=1&var-maquina=1&"
        // urlModoDeFalla+= "var-inicio_intervalo=%27"+fechaInicio.date+"+"+fechaInicio.hours+"%3A"+fechaInicio.mins+"%3A"+fechaInicio.secs+"%27&"
        // urlModoDeFalla+= "var-fin_intervalo=%27"+fechaFin.date+"+"+fechaFin.hours+"%3A"+fechaFin.mins+"%3A"+fechaFin.secs+"%27&"
        // urlModoDeFalla += "var-maquinasArr="+strMaquinas+"&panelId=10"
        //
        return (
            <div className="Layout-main col-12 md:col-12">
                <Iframe url={urlModoDeFalla} 
                    width="100%"
                    height="100%"
                    frameBorder={0} />
            </div>        
        )
    }
} 

export default BarChartModoFallaGrafica