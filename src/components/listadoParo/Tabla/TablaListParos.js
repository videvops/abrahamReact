import React from 'react'
import { Column } from "primereact/column";
import TablaDesing from '../../indicadoresTurno/UI/DiseñoTabla'
import { CardTabla,CardGeneral } from '../../indicadoresTurno/UI/Cards'

const TablaListParos = ({ registros }) => {
//--------------------| Valor que regresara  |--------------------
    return (
        <CardGeneral> 
            <CardTabla>
                <TablaDesing datos={registros} >
                    <Column field="fecha" header="Fecha" style={{ textAlign: "center", minWidth: '12rem' }} sortable />
                    <Column field="planta" header="Planta" style={{ textAlign: "center" }} sortable/>
                    <Column field="area" header="Area" style={{ textAlign: "center" }} sortable/>
                    <Column field="linea" header="Linea" style={{ textAlign: "center" }} sortable/>
                    <Column field="maquina" header="Maquina" style={{ textAlign: "center" }} sortable/>
                    <Column field="modoFalla" header="Modo de Falla" style={{ textAlign: "center" }} sortable/>
                    <Column field="inicioParo" header="Inicio de Paro" style={{ textAlign: "center" }} sortable/>
                    <Column field="finParo" header="Fin de Paro" style={{ textAlign: "center" }} sortable/>
                    <Column field="tiempo" header="Tiempo" style={{ textAlign: "center", width: '2rem' }} sortable />
                </TablaDesing>
            </CardTabla>
        </CardGeneral>
    )
}

export default TablaListParos