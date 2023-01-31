import React from "react";

export const CardTabla=(props)=>{
    return(
        <div className="col-12">
                <div className="card">
                    {props.children}
                </div>
        </div>
    );
}

export const CardGeneral=(props)=>{
    return(
        <div className="grid">
            {props.children}
        </div>
    );
}