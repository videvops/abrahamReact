import React, { useState } from 'react'
import { Column } from "primereact/column";
import TablaDesing from '../../indicadoresTurno/UI/DiseñoTabla'
import { CardTabla } from '../../indicadoresTurno/UI/Cards'
import { CardGeneral } from '../../indicadoresTurno/UI/Cards'
import { Toolbar } from 'primereact/toolbar';
import { SelectButton } from 'primereact/selectbutton';

const TablaListParos = ({ registros, tieneRegistros }) => {
    const [value1, setValue1] = useState('Tabla');
    const opciones = ['Tabla', 'Modo Falla', "Tiempo muerto"];
    console.log(value1==="Tabla"?"Es tabla":"Es otro")
    const componentesDerecha = (
        <>
            {/* <Button label="Tabla" icon="pi pi-table" onClick={() => console.log("Tabla")} />
            <Button label="Modo Falla" icon="pi pi-chart-bar" onClick={() => console.log("Paretos")} />
            <Button label="Tiempo muerto" icon="pi pi-chart-bar" onClick={() => console.log("tiempo muerto")} /> */}
            <SelectButton value={value1} options={opciones} onChange={(e) => setValue1(e.value)} />
        </>
    );
//--------------------| Valor que regresara  |--------------------
    return (
        <CardGeneral>
            {tieneRegistros && <Toolbar left={componentesDerecha} />}
            <CardTabla>
                {
                    tieneRegistros ?              // Revisa que haya registros
                        (
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
                        ) :
                        (<p>No hay registros...</p>)}
            </CardTabla>
        </CardGeneral>
    )
}

export default TablaListParos
