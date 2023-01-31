import React from 'react'
import { Column } from "primereact/column";
import TablaDesing from '../UI/DiseñoTabla'
import { CardGeneral, CardTabla } from '../UI/Cards'

const TablaDesperdicio = ({registros}) => {
    if(Object.entries(registros).length === 0){
        return(<h3>No hay informacion disponible</h3>)
    }else{
        return (
            <div className='col-12 md:col-12 grid p-fluid'>
                <CardGeneral> 
                    <CardTabla>
                        <TablaDesing datos={registros} >
                            <Column field="fecha" header="Fecha" style={{ textAlign: "center", minWidth: '12rem' }} sortable />
                            <Column field="planta" header="Planta" style={{ textAlign: "center" }} sortable/>
                            <Column field="area" header="Area" style={{ textAlign: "center" }} sortable/>
                            <Column field="linea" header="Linea" style={{ textAlign: "center" }} sortable/>
                            <Column field="maquina" header="Maquina" style={{ textAlign: "center" }} sortable/>
                            <Column field="rechazo" header="Rechazos[Kg]" style={{ textAlign: "center" }} sortable/>
                        </TablaDesing>
                    </CardTabla>
                </CardGeneral>
            </div>
        )
    }
}
export default TablaDesperdicio