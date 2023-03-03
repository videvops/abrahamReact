import React,{useEffect, useState} from "react"
import {Service} from "../../../service/Service";
import { Calendar } from 'primereact/calendar';
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import {PLANTAS_GET_COMBO} from "../../../genericos/Uris"
import { Dropdown } from 'primereact/dropdown';



const DialogCustom = (props) =>{

    const servicioPlantas = new Service();
    const [planta,setPlanta] = useState([]);
    //fecha Inc & Fin
    const [fechaInicio,setFechaInicio] = useState([]);
    const [fechaFin,setFechaFin] = useState([]);
    //loader
    //from bitacora js
    const [plantas,setPlantas] = useState([]);

   //muestra modal
    const [dialog,setDialog] = useState(false);

    useEffect(() => {
        getPlantas()
    },[]);

    const enviarRequest =  (request) =>{
      console.log("enviando request from dialog")
      console.log(request)
      props.enviarFiltroP(request)

    }


    const botonesAccion = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={()=> setDialog(false)} className="p-button-text" />
                <Button label="Consultar" icon="pi pi-check" onClick={()=> enviarRequest({from:"button",fechaInicio:fechaInicio,fechaFin:fechaFin,idPlanta:planta.id})} autoFocus />
            </div>
        );
      }
    const getPlantas = ()=>{
        servicioPlantas.baseUrl=servicioPlantas.baseUrl+PLANTAS_GET_COMBO
        servicioPlantas.readAll().then(resp=>{
        console.log(resp)
        setPlantas(resp);
        }).catch(resp=>{
           console.log(resp)
        });
    
       }

       const selectedPlanta = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.planta}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const plantaOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.planta}</div>
            </div>
        );
    };

    return (
       <>
               <Button label="Filtro" icon="pi pi-filter-fill" onClick={() => setDialog(true)} /> 
                <Dialog header="Filtro para Bítacora" visible={dialog} footer={botonesAccion}  onHide={() => setDialog(false)}  >
                    <div className="grid p-fluid">
                        <div className="col-12 ">
                            <div className="field col-12">
                                <label className="font-bold">Planta</label>
                                <Dropdown value={planta}
                                onChange={(e) => setPlanta(e.value)}
                                options={plantas} optionLabel="planta" 
                                placeholder="Selecciona una planta" 
                                ilter valueTemplate={selectedPlanta} 
                                itemTemplate={plantaOptionTemplate}
                               />
                            </div>
                            <div className="field col-12">
                                <label className="font-bold">Hora inicio</label>
                                <Calendar 
                                id="time24" 
                                dateFormat="yy/mm/dd"
                                value={fechaInicio} 
                                onChange={(e) => setFechaInicio(e.value)} 
                                showTime 
                                placeholder="--Fecha Inicio--" 
                                />
                            </div>
                            <div className="field col-12">
                                <label className="font-bold">Hora Fin</label>
                                <Calendar 
                                id="time24" 
                                dateFormat="yy/mm/dd"
                                value={fechaFin} 
                                onChange={(e) => setFechaFin(e.value)} 
                                showTime 
                                placeholder="--Fecha Fin--" 
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>    
 
       </>

    );

} 

export default DialogCustom;