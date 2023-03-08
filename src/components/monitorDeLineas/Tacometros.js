import React from "react";
import GaugeChart from "react-gauge-chart"

const Tacometros = ({data}) =>{
    console.log(data)
    if(Object.entries(data).length === 0){
        return (
            <div className="col-12 md:col-12 grid p-fluid">
                <h3>No hay informacion disponible</h3>
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
                            arcsLength={[0.6, 0.4]}
                            arcWidth={.3}
                            textColor={"#000000"}
                            colors={['#f44336','#8fce00']}
                            percent={data.oee}
                            marginInPercent={.012}
                            arcPadding={0.02}
                        />
                        <h3>Eficiencia</h3>
                    </div>
                    <div className="col-12 md:col-4">
                        <GaugeChart id="gauge-chart1" 
                            animate={false} 
                            nrOfLevels={420}
                            arcsLength={[0.7, 0.3]}
                            arcWidth={.3}
                            textColor={"#000000"}
                            colors={['#f44336','#8fce00']}
                            percent={data.disponibilidad}
                            marginInPercent={.012}
                            arcPadding={0.02}
                        />
                        <h3>Disponibilidad</h3>
                    </div>
                    <div className="col-12 md:col-4">
                        <GaugeChart id="gauge-chart1" 
                            animate={false} 
                            nrOfLevels={420}
                            arcsLength={[0.7, 0.3]}
                            arcWidth={.3}
                            textColor={"#000000"}
                            colors={['#f44336','#8fce00']}
                            percent={data.rendimiento}
                            marginInPercent={.012}
                            arcPadding={0.02}
                        />
                        <h3>Rendimiento</h3>
                    </div>             
                </div>
                <div className="col-12 md:col-12 grid p-fluid flex align-items-center justify-content-center ">
                    <div className="col-12 md:col-4">
                        <GaugeChart id="gauge-chart1" 
                            animate={false} 
                            nrOfLevels={420}
                            arcsLength={[0.7, 0.3]}
                            arcWidth={.3}
                            textColor={"#000000"}
                            colors={['#f44336','#8fce00']}
                            percent={data.produtoTerminado}
                            marginInPercent={.012}
                            arcPadding={0.02}
                        />
                        <h3>Producto Terminado</h3>
                    </div>
                    <div className="col-12 md:col-4">
                        <GaugeChart id="gauge-chart1" 
                            animate={false} 
                            nrOfLevels={420}
                            arcsLength={[0.7, 0.3]}
                            arcWidth={.3}
                            textColor={"#000000"}
                            colors={['#f44336','#8fce00']}
                            percent={data.calidad}
                            marginInPercent={.012}
                            arcPadding={0.02}
                        />
                        <h3>Calidad</h3>
                    </div>           
                </div>
            </div>
        )
    }

}

export default Tacometros  