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
            <h4 style={{ textAlign: "center" }}>Promedios</h4>
            <DataTable value={promedios} style={{ fontSize: "20px", textAlign: "center" }}>
                <Column field="eficienciaTotal" header="Eficiencia" body={ColorEficienciaPromedio} />
                <Column field="disponibilidadTotal" header="Disponibilidad" body={ColorDisponibilidadPromedio} />
                <Column field="rendimientoTotal" header="Rendimiento" body={ColorRendimientoPromedio} />
                <Column field="calidadTotal" header="Calidad" body={ColorCalidadPromedio} />
                <Column field="productoTerminadoTotal" header="Producto Terminado(kg)" style={{ textAlign: "center" }} />
            </DataTable>
        </React.Fragment>
    );
};

export default Totales;
