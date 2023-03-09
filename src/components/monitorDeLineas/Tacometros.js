import React from "react";
import GaugeChart from "react-gauge-chart"
import { SelecconaFiltros } from "../mensajes/Mensajes";

const Tacometros = ({data}) =>{

    let metaInferior=0.0;
    let metaSuperior=0.0;
    let oee =0.0;
    let eficiencia =0.0;
    let disponibilidad =0.0;
    let rendimiento =0.0;
    let calidad = 0.0;

    if (data!== undefined){
        metaInferior =(1-(data.meta/100));
        metaSuperior = 1-metaInferior;
        oee=Number(parseFloat(data.oee).toFixed(3));
        eficiencia=Number(parseFloat(data.eficiencia).toFixed(3));
        disponibilidad=Number(parseFloat(data.disponibilidad).toFixed(3));
        rendimiento=Number(parseFloat(data.rendimiento).toFixed(3));
        calidad=Number(parseFloat(data.calidad).toFixed(3));
    }

    
    if(Object.entries(data).length === 0){
        return (
            <div className="col-12 md:col-12 grid p-fluid">
               <SelecconaFiltros 
                    categoria="monitor de linea"
                />
            </div>
        )
    }
    else {
         return(
            <div className="col-12 card mb-4 md:col-12 grid p-fluid p-0" style={{ textAlign: "center", background: "#ffffff" }}>
                <div className="col-12 md:col-12 grid p-fluid">
                    <div className="col-12 md:col-4">
                        <GaugeChart id="gauge-chart1" 
                            animate={false} 
                            nrOfLevels={420}
                            arcsLength={[metaSuperior,metaInferior]}
                            arcWidth={.3}
                            textColor={"#000000"}
                            colors={['#cc3300','#36802d']}
                            percent={oee}
                            marginInPercent={.012}
                            arcPadding={0.02}
                        />
                        <h3>Eficiencia</h3>
                    </div>
                    <div className="col-12 md:col-4">
                        <GaugeChart id="gauge-chart1" 
                            animate={false} 
                            nrOfLevels={420}
                            arcsLength={[metaSuperior,metaInferior]}
                            arcWidth={.3}
                            textColor={"#000000"}
                            colors={['#cc3300','#36802d']}
                            percent={disponibilidad}
                            marginInPercent={.012}
                            arcPadding={0.02}
                        />
                        <h3>Disponibilidad</h3>
                    </div>
                    <div className="col-12 md:col-4">
                        <GaugeChart id="gauge-chart1" 
                            animate={false} 
                            nrOfLevels={420}
                            arcsLength={[metaSuperior,metaInferior]}
                            arcWidth={.3}
                            textColor={"#000000"}
                            colors={['#cc3300','#36802d']}
                            percent={rendimiento}
                            marginInPercent={.012}
                            arcPadding={0.02}
                        />
                        <h3>Rendimiento</h3>
                    </div>             
                </div>
                <div className="col-12 md:col-12 grid p-fluid flex justify-content-center flex-wrap ">
                    <div className="col-12 md:col-4">
                        <GaugeChart id="gauge-chart1" 
                            animate={false} 
                            nrOfLevels={420}
                            arcsLength={[metaSuperior,metaInferior]}
                            arcWidth={.3}
                            textColor={"#000000"}
                            colors={['#cc3300','#36802d']}
                            percent={calidad}
                            marginInPercent={.012}
                            arcPadding={0.02}
                        />
                        <h3>Calidad</h3>
                    </div>
                    <div className="col-12 md:col-5">
                        <div className="card flex justify-content-center">
                            <div className= "grid p-fluid flex align-items-center justify-content-center pt-4">
                                <h1>{data.produtoTerminado} Kg</h1>
                            </div>
                        </div>
                        <div className="grid p-fluid flex align-items-center justify-content-center ">
                                <h3>Producto Terminado</h3>
                            </div>
                    </div>    
                </div>
            </div>
        )
    }

}

export default Tacometros  