import React,{useState} from "react";
import Tacometros from "./Tacometros";
import TablaMayorImpacto from "./Tablas/TablaMayorImpacto"
import TablaUltimosParos from "./Tablas/TablaUltimosParos"


const Data = ({filtroTacometro,registrosUltimosParos,registrosTopFive}) =>{
    
    return(
        <div className="col-12">
            <div className="col-12 md:col-12">
                <Tacometros
                    filtros={filtroTacometro}
                />
            </div> 
            <br></br>
            <div className="col-12 md:col-12 grid p-fluid">
                <div className="col-6 md:col-6">
                    <div className="col-12 md:col-12 card mb-4" style={{ textAlign: "center", background: "#6366f2"}}>
                        <span className=" font-bold" style={{ fontSize: "15px", color: "white" }}>
                            Ultimos Paros
                        </span>
                    </div>
                    <TablaUltimosParos
                        registros={registrosUltimosParos}  
                    />
                </div>
                <div className="col-6 md:col-6 ">
                    <div className="col-12 md:col-12 card mb-4 " style={{ textAlign: "center", background: "#6366f2" }}>
                        <span className=" font-bold" style={{ fontSize: "15px", color: "white" }}>
                            Top 5 Mayor impacto
                        </span>
                    </div>
                    <TablaMayorImpacto
                        registros={registrosTopFive}
                    />
                </div>
            </div>
        </div>
    )
}

export default Data