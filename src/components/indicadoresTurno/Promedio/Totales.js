import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ColorCalidadPromedio, ColorDisponibilidadPromedio, ColorEficienciaPromedio, ColorRendimientoPromedio } from "../Colores/Colores";

const Totales = (props) => {
    let promedios = [
        {
            eficienciaTotal: props.eficienciaTotal,
            disponibilidadTotal: props.disponibilidadTotal,
            rendimientoTotal: props.rendimientoTotal,
            calidadTotal: props.calidadTotal,
            productoTerminadoTotal: props.productoTerminadoTotal,
        },
    ];

    //--------------------| Valor que regresara |--------------------
    return (
        <React.Fragment>
            <h4 style={{ textAlign: "left" }}>Totales</h4>
            <DataTable value={promedios}  responsiveLayout="scroll" columnResizeMode="fit" style={{ fontSize: "20px", textAlign: "center" }} >
                <Column field="" header="" style={{ width:`${100/6}%` }} />
                <Column field="eficienciaTotal" header="Eficiencia" style={{ width:`${100/6}%` }} body={ColorEficienciaPromedio} />
                <Column field="disponibilidadTotal" header="Disponibilidad" style={{ width:`${100/6}%` }} body={ColorDisponibilidadPromedio} />
                <Column field="rendimientoTotal" header="Rendimiento" style={{ width:`${100/6}%` }} body={ColorRendimientoPromedio} />
                <Column field="calidadTotal" header="Calidad" style={{ width:`% ${100/6}` }} body={ColorCalidadPromedio} />
                <Column field="productoTerminadoTotal" header="Producto Terminado(kg)" style={{ textAlign: "center", width:`${100/6}%`  }} />
            </DataTable>
        </React.Fragment>
    );
};

export default Totales;

