import React from "react";
import Iframe from 'react-iframe'
import {getDateSplitted,getStringData} from "../../helpers/funciones"
import { SelecconaFiltros } from '../../mensajes/Mensajes';

const BarChartTiempoMuertoGrafica = ({filtros}) => {

    if(Object.entries(filtros).length === 0){
        return(<SelecconaFiltros 
            categoria="los paros necesarios"
        />)
    }else{

        const strMaquinas = getStringData(filtros.maquinas)
        const fechaInicio = getDateSplitted(filtros.fechaInc);
        const fechaFin = getDateSplitted(filtros.fechaFin);

        let urlTiempoMuerto =`https://ec2-3-20-237-147.us-east-2.compute.amazonaws.com:3000/d-solo/s5XhbD0Vz/ublick?orgId=1&`
        urlTiempoMuerto += `var-inicio_intervalo=${fechaInicio.date}+${fechaInicio.hours}%3A${fechaInicio.mins}%3A${fechaFin.secs}&`
        urlTiempoMuerto += `var-fin_intervalo=${fechaFin.date}+${fechaFin.hours}%3A${fechaFin.mins}%3A${fechaFin.secs}&`
        urlTiempoMuerto += `var-maquinasArr=${strMaquinas}3&var-lineasArr=1%2C2%2C3&from=1675250437561&to=1675272037561&`
        urlTiempoMuerto += `panelId=10`
        
        // URL localhost
        // let urlTiempoMuerto = "http://localhost:3000/d-solo/DtaYRtpVz/new-dashboard?orgId=1&"
        // urlTiempoMuerto += "var-planta=1&var-area=1&var-linea=1&var-maquina=1&"
        // urlTiempoMuerto+= "var-inicio_intervalo="+fechaInicio.date+"+"+fechaInicio.hours+"%3A"+fechaInicio.mins+"%3A"+fechaInicio.secs+"&"
        // urlTiempoMuerto+= "var-fin_intervalo="+fechaFin.date+"+"+fechaFin.hours+"%3A"+fechaFin.mins+"%3A"+fechaFin.secs+"&"
        // urlTiempoMuerto+= "var-maquinasArr="+strMaquinas+"&panelId=8"
        //

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


