import React from "react"
import BitacoraTbl from './BitacoraTbl';
import {CardTabla } from "../../../components/indicadoresTurno/UI/Cards";

const Filtro = () =>{

    return (
       <>
        <CardTabla>
          <BitacoraTbl >
          </BitacoraTbl> 
        </CardTabla>     
       </>
    );
} 

export default Filtro;