import React, { useState } from "react";
import { Knob } from 'primereact/knob';

const Tacometro = ({data}) =>{
    if(Object.entries(data).length === 0){
        return (
            <div className="col-12 md:col-12 grid p-fluid">
                <h3>No hay informacion disponible</h3>
            </div>
        )
    }else{
        return (
            <div className="col-12 md:col-12 grid p-fluid">
                <Knob 
                    value={50}
                    min={0}
                    max={100}
                    size={200}
                    valueColor={"red-600"} 
                    rangeColor={"MediumTurquoise"}
                    //onChange={(e) => setValue(data)} 
                />
            </div>
        )        
    }    
}

export default Tacometro; 