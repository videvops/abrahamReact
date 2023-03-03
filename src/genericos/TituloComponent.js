import React  from "react";


const TituloComponent = ({titulo}) =>{


    return (
        <div className="card mb-1" style={{ textAlign: "center", background: "#6366f2" }}>
            <span className=" font-bold" style={{ fontSize: "25px", color: "white" }}>
                {titulo}
            </span>
        </div>
    );
}

export default TituloComponent;