import React, { useEffect, useState } from "react";
import Iframe from 'react-iframe';
import {getDateSplitted,getStringData} from "../../helpers/funciones";
import Spinner from "../../loader/Spinner";

const DesperdicioMaquina = ({filtros}) => {

    const [isLoading,setIsLoading] = useState(true);

    useEffect(() =>{
        const despLinea = document.getElementById("desperdicioMaquina") 
        if(despLinea !== null){
            despLinea.onload = () =>{
                despLinea.style.display = "block";
                setIsLoading(false)
            }
        }
    },[filtros])



    let urlDesperdicioMaquina="";
    if(Object.entries(filtros).length !== 0){
        const strMaquinas = getStringData(filtros.lineas)
        const fechaInicio = getDateSplitted(filtros.fechaInc);
        const fechaFin = getDateSplitted(filtros.fechaFin);

        urlDesperdicioMaquina = `https://ec2-3-20-237-147.us-east-2.compute.amazonaws.com:3000/d-solo/s5XhbD0Vz/ublick?orgId=1&`
        urlDesperdicioMaquina += `var-inicio_intervalo=${fechaInicio.date}+${fechaInicio.hours}%3A${fechaInicio.mins}%3A${fechaFin.secs}&`
        urlDesperdicioMaquina += `var-fin_intervalo=${fechaFin.date}+${fechaFin.hours}%3A${fechaFin.mins}%3A${fechaFin.secs}&`
        urlDesperdicioMaquina += `var-maquinasArr=${strMaquinas}&`
        urlDesperdicioMaquina += `var-lineasArr=1&`
        urlDesperdicioMaquina += `panelId=6`
    }
   
        // // URL localhost
        // let urlDesperdicioMaquina = "http://localhost:3000/d-solo/DtaYRtpVz/new-dashboard?orgId=1&var-planta=1&var-area=1&var-linea=1&var-maquina=1&"
        // urlDesperdicioMaquina+= "var-inicio_intervalo="+fechaInicio.date+"+"+fechaInicio.hours+"%3A"+fechaInicio.mins+"%3A"+fechaInicio.secs+"&"
        // urlDesperdicioMaquina+= "var-fin_intervalo="+fechaFin.date+"+"+fechaFin.hours+"%3A"+fechaFin.mins+"%3A"+fechaFin.secs+"&"
        // urlDesperdicioMaquina+= "var-maquinasArr="+strMaquinas+"&panelId=12"
        // // 


    return (
        <>
        {filtros.length !== 0 ? (
            <>
            {isLoading ? (
                <>
                    <Spinner/>
                </>
            ):(
                <></>
            )}
                <div className="Layout-main col-12 md:col-12">
                <Iframe url={urlDesperdicioMaquina} 
                    width="100%"
                    height="100%"
                    frameBorder={0} 
                    id="desperdicioMaquina"
                    display="none"
                />
            </div>   
            </>
        ):(
            <>
                <h1>No hay grafica</h1>
            </>
        )}
        </>
    )
}
export default DesperdicioMaquina