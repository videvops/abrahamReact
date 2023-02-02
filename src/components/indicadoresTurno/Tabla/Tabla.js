import React, { useState, useEffect } from "react";
import TablaDesing from "../UI/DiseñoTabla";
import Totales from "../Promedio/Totales";
import { Column } from "primereact/column";
import { CardGeneral, CardTabla } from "../UI/Cards";
import { ColorEficiencia, ColorDisponibilidad, ColorRendimiento, ColorCalidad } from "../Colores/Colores";
import { PromedioCalidad, PromedioDisponibilidad, PromedioEfecto, PromedioProducto, PromedioVelocidad } from "../Promedio/Funciones";
import Spinner from "../../loader/Spinner";

const Tabla = ({ registros, cargando }) => {
    //--------------------| Sacar promedios |--------------------
    const [promEfic, setPromEfic] = useState(0);
    const [promDisp, setPromDisp] = useState(0);
    const [promVel, setPromVel] = useState(0);
    const [promCal, setPromCal] = useState(0);
    const [promProduct, setPromProduct] = useState(0);

    const Promedios = (data) => {
        let resultadoEfec = PromedioEfecto(data);
        setPromEfic(resultadoEfec);

        let resultadoDisp = PromedioDisponibilidad(data);
        setPromDisp(resultadoDisp);

        let resultadoVel = PromedioVelocidad(data);
        setPromVel(resultadoVel);

        let resultadoCal = PromedioCalidad(data);
        setPromCal(resultadoCal);

        let resultadoProduc = PromedioProducto(data);
        setPromProduct(resultadoProduc);
    };

    //--------------------| Obtencion de promedios en tiempo real |--------------------
    useEffect(() => {
        const interval = setInterval(() => {
            // Renderizado por intervalos de tiempo
            if (registros.length > 0) {
                Promedios(registros); // Actualizara los promedios
                console.log(registros);
                console.log("Promedios actualizados");
            }
        }, 5000); // Cada 5 seg se renderizara
        return () => clearInterval(interval); // Elimina el efecto secundario anterior
    });

    //--------------------| Valor que regresara |--------------------
    return (
        <CardGeneral>
            {cargando && <Spinner />}
            {registros.length > 0 ? (
                <>
                    <CardTabla>
                    <TablaDesing datos={registros}>
                            <Column field="linea" header="Linea" style={{ textAlign: "center", width:`${100/6}%`}} sortable />
                            <Column field="eficiencia" header="Eficiencia" style={{ textAlign: "center", width:`${100/6}%`}} sortable body={ColorEficiencia} />
                            <Column field="disponibilidad" header="Disponibilidad" style={{ textAlign: "center", width:`${100/6}%` }} sortable body={ColorDisponibilidad} />
                            <Column field="rendimiento" header="Rendimiento" style={{ textAlign: "center", width:`${100/6}%`}} sortable body={ColorRendimiento} />
                            <Column field="calidad" header="Calidad" style={{ textAlign: "center", width:`${100/6}%` }} sortable body={ColorCalidad} />
                            <Column field="productoTerminado" header="Producto Terminado(kg)" style={{ textAlign: "center", width:`${100/6}%` }} sortable />
                        </TablaDesing>
                    </CardTabla>
                    <CardTabla>
                        <Totales eficienciaTotal={promEfic} disponibilidadTotal={promDisp} rendimientoTotal={promVel} calidadTotal={promCal} productoTerminadoTotal={promProduct} />
                    </CardTabla>
                </>
            ) : (
                <CardTabla>
                    <p>No hay registros</p>
                </CardTabla>
            )}
        </CardGeneral>
    );
};

export default Tabla;
