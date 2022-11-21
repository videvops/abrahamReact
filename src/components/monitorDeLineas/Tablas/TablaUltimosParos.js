import React from 'react'
import { Column } from "primereact/column";
import TablaDesing from "../UI/DiseñoTabla"
import { CardTabla , CardGeneral } from "../UI/Cards"

const TablaUltimosParos = ({registros}) => {
    if(Object.entries(registros).length === 0){
        return (
            <div className="col-12 md:col-12 grid p-fluid">
                <h3>No hay informacion disponible</h3>
            </div>
        )
    }else{
        return (
            <CardGeneral>
                <CardTabla>
                    <TablaDesing datos={registros} >
                        <Column field="idMaquina" header="Maquina" style={{ textAlign: "center", width: '20%' }} sortable />
                        <Column field="falla" header="Modo de Falla" style={{ textAlign: "center" }} sortable/>
                        <Column field="fecha" header="Fecha" style={{ textAlign: "center" }} sortable/>
                        <Column field="incParo" header="Inicio de paro" style={{ textAlign: "center" }} sortable/>
                        <Column field="finParo" header="Fin de paro" style={{ textAlign: "center" }} sortable/>
                        <Column field="tiempo" header="Tiempo[min]" style={{ textAlign: "center" }} sortable/>
                    </TablaDesing>
                </CardTabla>
            </CardGeneral>
        )
    }
}

export default TablaUltimosParos
