import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import Consultas from "./Consultas";

import {PlantaService} from "../../../service/PlantaService";
import {AreaService} from "../../../service/AreaService"
import {LineaService } from "../../../service/LineaService"

const FiltroTiempoReal = () => {

    const plantaService = new PlantaService();
    const areaService = new AreaService();
    const lineaService = new LineaService();

    const [selectedPlanta, setSelectedPlanta] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedLinea, setSelectedLinea] = useState(null);
    const [selectedTurno, setSelectedTurno] = useState(null);

    const [plantasDb, setPlantasDb] = useState([]);
    const [areasDb, setAreasDb] = useState([]);
    const [lineasDb, setLineasDb] = useState([]);


    useEffect(() => {plantaService.readAll().then(res=>{setPlantasDb(res)}).catch((e)=>{console.error(e)})},[])

    useEffect(() => {
        let plantas =[];
        Object.entries(plantasDb).length > 0 ? plantas =[selectedPlanta.id] : plantas =[] ;
        areaService.areasPlantas(plantas).then(res=>{
            setAreasDb(res)
        }).catch((e)=>{
            console.error(e)
        })
    },[selectedPlanta])

    useEffect(() => {
        let areas =[];
        Object.entries(areasDb).length > 0 ? areas = [selectedArea.id] : areas = [] ;
        lineaService.lineasAreas(areas).then(res=>{
            setLineasDb(res)
        }).catch((e)=>{
            console.error(e)
        })
    },[selectedArea])





    const T_ACTUAL="TURNO_ACTUAL";
    const ULT_HORA="ULTIMA_HORA";

    const turnos = [
        { turno: 'Turno Actual', data: T_ACTUAL },
        { turno: 'Ultima hora', data: ULT_HORA }
    ];

    const [filtros,setFiltros] = useState ({})
    useEffect(() => {
        if(selectedPlanta !== null && selectedArea !== null && selectedLinea !== null && selectedTurno !== null){
            const filtrosObj ={
                linea:selectedLinea.id,
                indicador:selectedTurno.data
            }
            setFiltros(filtrosObj)
        }
    },[selectedArea,selectedTurno,selectedPlanta,selectedLinea]) 

    return (
        <div>
            <div className="card mb-0" style={{ textAlign: "center", background: "#6366f2" }}>
                <span className=" font-bold" style={{ fontSize: "25px", color: "white" }}>
                    Monitor de Linea Tiempo Real
                </span>
            </div>
            <br/>
            <div className="col-12 col:md-12 grid p-fluid">
                <div className="col-3 md:col-3">
                    <span className="p-float-label">
                        <Dropdown 
                            value={selectedPlanta} 
                            onChange={(e) => setSelectedPlanta(e.value) } 
                            options={plantasDb} 
                            optionLabel="planta" 
                            className="w-full md:w-full" 
                        />
                        <label htmlFor="dd-city">Selecciona una planta</label>
                    </span>
                </div>
                <div  className="col-3 md:col-3">
                    <span className="p-float-label">
                        <Dropdown 
                            value={selectedArea} 
                            onChange={(e) => setSelectedArea(e.value)} 
                            options={areasDb} 
                            optionLabel="area" 
                            className="w-full md:w-full" 
                            />
                    <label htmlFor="dd-city">Selecciona una area</label>
                    </span>                
                </div>
                <div  className="col-3 md:col-3">
                <span className="p-float-label">
                    <Dropdown 
                        value={selectedLinea} 
                        onChange={(e) => setSelectedLinea(e.value)} 
                        options={lineasDb} 
                        optionLabel="linea" 
                        className="w-full md:w-full" 
                        />
                    <label htmlFor="dd-city">Selecciona una linea</label>
                </span>
                </div>
                <div  className="col-3 md:col-3">
                <span className="p-float-label">
                    <Dropdown 
                        value={selectedTurno} 
                        onChange={(e) => setSelectedTurno(e.value)} 
                        options={turnos} 
                        optionLabel="turno" 
                        className="w-full md:w-full" 
                    />
                <label htmlFor="dd-city">Selecciona una turno</label>
                </span>
                </div>
            </div>
            <Consultas
                filtros={filtros} 
            />
        </div>
    )
};

export default FiltroTiempoReal
