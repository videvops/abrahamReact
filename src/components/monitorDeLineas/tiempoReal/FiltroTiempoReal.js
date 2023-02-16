import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import Consultas from "./Consultas";

import {PlantaService} from "../../../service/PlantaService";
import {AreaService} from "../../../service/AreaService"
import {LineaService } from "../../../service/LineaService"
import { TurnoService } from "../../../service/TurnoService";




const groupedItemTemplate = (option) => {
    return (
        <div className="flex align-items-center">
            <div>{option.label}</div>
        </div>
    );
};


const FiltroTiempoReal = () => {

    const plantaService = new PlantaService();
    const areaService = new AreaService();
    const lineaService = new LineaService();
    const turnoService = new TurnoService();

    const [selectedPlanta, setSelectedPlanta] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedLinea, setSelectedLinea] = useState(null);
    const [selectedTurno, setSelectedTurno] = useState(null);

    const [plantasDb, setPlantasDb] = useState([]);
    const [areasDb, setAreasDb] = useState([]);
    const [lineasDb, setLineasDb] = useState([]);
    const [turnosDb, setTurnosDb] =useState([]);


    useEffect(() => {
        plantaService.readAll().then(res=>{
            setPlantasDb(res)
        }).catch((e)=>{
            console.error(e)
        })
    },[])

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

    useEffect(()=>{
        turnoService.readAll().then(res =>{
            setTurnosDb(res)
        }).catch((e)=>{
            console.log(e)
        })
    },[])

    const turnosGrouped = [
        {
            label: 'Turno',
            code: 'TAC',
            items: [
                {'turno':'Turno Actual'},
                {'turno':'Ultima Hora'}
            ]
        },
        {
            label: 'Turno Anterior',
            code: 'TA',
            items: turnosDb
        }
    ];

    console.log(turnosDb)
    console.log(turnosGrouped)
    const [filtros,setFiltros] = useState ({})

    useEffect(() => {
        if(selectedPlanta !== null && selectedArea !== null && selectedLinea !== null && selectedTurno !== null){
            const filtrosObj ={
                lineas:selectedLinea.id,
                tiempo:selectedTurno.id
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
                    <Dropdown 
                        value={selectedPlanta} 
                        onChange={(e) => setSelectedPlanta(e.value) } 
                        options={plantasDb} 
                        optionLabel="planta" 
                        placeholder="Selecciona una planta" 
                        className="w-full md:w-full" 
                    />
                </div>
                <div  className="col-3 md:col-3">
                    <Dropdown 
                            value={selectedArea} 
                            onChange={(e) => setSelectedArea(e.value)} 
                            options={areasDb} 
                            optionLabel="area" 
                            placeholder="Selecciona una area" 
                            className="w-full md:w-full" 
                    />
                </div>
                <div  className="col-3 md:col-3">
                    <Dropdown 
                            value={selectedLinea} 
                            onChange={(e) => setSelectedLinea(e.value)} 
                            options={lineasDb} 
                            optionLabel="linea" 
                            placeholder="Selecciona una linea"
                            className="w-full md:w-full" 
                    />
                </div>
                <div  className="col-3 md:col-3">
                    <Dropdown 
                            value={selectedTurno} 
                            onChange={(e) => setSelectedTurno(e.value)} 
                            options={turnosGrouped} 
                            optionLabel="turno" 
                            optionGroupLabel="turno"
                            optionGroupChildren="items" 
                            placeholder="Selecciona una turno"
                            optionGroupTemplate={groupedItemTemplate} 
                            className="w-full md:w-full" 
                    />
                </div>
            </div>
            <Consultas
                filtros={filtros} 
            />
        </div>
    )
};

export default FiltroTiempoReal
