import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { MensajeFiltro } from "../../../pages/Catalogos/ComponentsCat/Mensajes/Mensajes";
import Environment from "../../../Environment";
import { formatearFecha } from "../../helpers/funciones";

const Cabezal = ({ setRegistros, setCargando }) => {
    //--------------------| MultiSelect de Plantas  |--------------------
    //---> Obtener registros de back-end

    const getRoute = Environment()

    const [plantasDisponibles, setPlantasDisponibles] = useState([]);
    useEffect(() => {
        const cargarPlantas = async () => {
            const respuesta = await Axios.get(`${getRoute}/plantas/list`)
            setPlantasDisponibles(respuesta.data);
        };
        cargarPlantas();
    }, []);
    //---> Lista de plantas seleccionadas
    const [plantas, setPlantas] = useState([]);

    //--------------------| MultiSelect de Areas  |--------------------
    //---> Obtener registros de back-end
    const [areasDisponibles, setAreasDisponibles] = useState([]);
    const obtenerAreas = async () => {
        const respuesta = await Axios.post(`${getRoute}/areas/plantas`, plantas)
        setAreasDisponibles(respuesta.data);
    };
    //---> Lista de areas seleccionados
    const [areas, setAreas] = useState([]);

    //--------------------| MultiSelect de Lineas  |--------------------
    //---> Obtener registros de back-end
    const [lineasDisponibles, setLineasDisponibles] = useState([]);
    const obtenerLineas = async () => {
        const respuesta = await Axios.post(`${getRoute}/lineas/areas`, areas)
        setLineasDisponibles(respuesta.data);
    };
    //---> Lista de lineas seleccionadas
    const [lineas, setLineas] = useState([]);

    //--------------------| Campo para fecha con horas  |--------------------
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    //--------------------| Funciones para filtro  |--------------------
    const [dialogo, setDialogo] = useState(false); // Para mostrar dialogo
    const [esValido, setEsValido] = useState(true); // Para mensaje de error

    const enviarDatos = async (datos) => {
        const respuesta = await Axios.post(`${getRoute}/indicadores`, datos);
        setRegistros(respuesta.data.registros);
    };

    //---> Validara antes de mandar el filtro
    const enviarFiltro = () => {
        //---> Validacion antes de enviar
        if (lineas.length < 1 || plantas.length < 1 || areas.length < 1 || [fechaInicio, fechaFin].includes(null)) {
            setEsValido(false);
            setTimeout(() => {
                setEsValido(true);
            }, 2500);
            return; // No permite avanzar
        }
        setCargando(true);
        const objeto = { idLineas: lineas, fechaInc:formatearFecha(fechaInicio),fechaFin:formatearFecha(fechaFin) };
        enviarDatos(objeto);
        setEsValido(true);
        setDialogo(false);
        setCargando(false);
    };
    //---> Limpiara los filtros
    const cancelarFiltro = () => {
        setPlantas([]);
        setAreas([]);
        setLineas([]);
        setFechaInicio(null);
        setFechaFin(null);
        setRegistros([]);
        setEsValido(true);
        setDialogo(false);
    };

    const botonesAccion = () => {
        return (
            <div>
                <Button label="Limpiar" icon="pi pi-times" onClick={cancelarFiltro} className="p-button-text" />
                <Button label="Consultar" icon="pi pi-check" onClick={enviarFiltro} autoFocus />
            </div>
        );
    };

    //--------------------| Valor que regresara  |--------------------
    return (
        <div className="col-12 ">
            <div className="card mb-0" style={{ textAlign: "center", background: "#6366f2" }}>
                <span className=" font-bold" style={{ fontSize: "25px", color: "white" }}>
                    Indicadores de Planta
                </span>
            </div>
            <h5 className=" font-bold" style={{ fontSize: "25px" }}>
                Status en Tiempo Real
            </h5>
            <Button label="Filtro" icon="pi pi-filter-fill" onClick={() => setDialogo(true)} />
            <Dialog header="Filtro para indicadores de turno" visible={dialogo} footer={botonesAccion} onHide={() => setDialogo(false)}>
                <div className="grid p-fluid">
                    <div className="col-12 md:col-4">
                        <label className="font-bold">Planta</label>
                        <MultiSelect
                            optionLabel="planta"
                            optionValue="id"
                            placeholder="Escoje una planta"
                            options={plantasDisponibles}
                            value={plantas}
                            onChange={(e) => {
                                setPlantas(e.target.value);
                            }}
                            maxSelectedLabels={1}
                            filter
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="font-bold">Area</label>
                        <MultiSelect
                            optionLabel="area"
                            optionValue="id"
                            placeholder="Escoje una area"
                            options={areasDisponibles}
                            value={areas}
                            onChange={(e) => {
                                setAreas(e.target.value);
                            }}
                            maxSelectedLabels={1}
                            onFocus={obtenerAreas}
                            filter
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="font-bold">Linea</label>
                        <MultiSelect
                            optionLabel="linea"
                            optionValue="id"
                            placeholder="Escoje una linea"
                            options={lineasDisponibles}
                            value={lineas}
                            onChange={(e) => {
                                setLineas(e.target.value);
                            }}
                            maxSelectedLabels={1}
                            onFocus={obtenerLineas}
                            filter
                        />
                    </div>
                </div>
                <br />
                <div className="grid p-fluid">
                    <div className="field col-12 md:col-5">
                        <label className="font-bold">Hora inicio</label>
                        <Calendar id="time24" dateFormat="yy/mm/dd" value={fechaInicio} onChange={(e) => setFechaInicio(e.value)} showTime placeholder="--Fecha Inicio--" />
                    </div>
                    <div className="field col-12 md:col-5">
                        <label className="font-bold">Hora Fin</label>
                        <Calendar id="time24" dateFormat="yy/mm/dd" value={fechaFin} onChange={(e) => setFechaFin(e.value)} showTime placeholder="--Fecha Fin--" />
                    </div>
                </div>
                {!esValido && MensajeFiltro}
            </Dialog>
        </div>
    );
};

export default Cabezal;
