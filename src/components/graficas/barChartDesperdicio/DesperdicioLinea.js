import React, { useEffect, useState } from "react";
import Iframe from 'react-iframe';
import {getDateSplitted,getStringData} from "../../helpers/funciones";
import Spinner from "../../loader/Spinner";

const DesperdicioLinea = ({filtros}) => {

    const [isLoading,setIsLoading] = useState(true);

    useEffect(() =>{
        const despLinea = document.getElementById("desperdicioLinea") 
        if(despLinea !== null){
            despLinea.onload = () =>{
                despLinea.style.display = "block";
                setIsLoading(false)
            }
        }
    },[filtros])

    let urlDesperdicioLinea="";
    if(Object.entries(filtros).length !== 0){
        const strLineas = getStringData(filtros.lineas)
        const fechaInicio = getDateSplitted(filtros.fechaInc);
        const fechaFin = getDateSplitted(filtros.fechaFin);

        urlDesperdicioLinea = `https://ec2-3-20-237-147.us-east-2.compute.amazonaws.com:3000/d-solo/s5XhbD0Vz/ublick?orgId=1&`;
        urlDesperdicioLinea += `var-inicio_intervalo=${fechaInicio.date}+${fechaInicio.hours}%3A${fechaInicio.mins}%3A${fechaFin.secs}&`;
        urlDesperdicioLinea += `var-fin_intervalo=${fechaFin.date}+${fechaFin.hours}%3A${fechaFin.mins}%3A${fechaFin.secs}&`;
        urlDesperdicioLinea += `var-maquinasArr=1&`;
        urlDesperdicioLinea += `var-lineasArr=${strLineas}&`;
        urlDesperdicioLinea += `panelId=2`;
    }
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
                <Iframe url={urlDesperdicioLinea} 
                    width="100%"
                    height="100%"
                    frameBorder={0} 
                    id="desperdicioLinea"
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
export default DesperdicioLinea;