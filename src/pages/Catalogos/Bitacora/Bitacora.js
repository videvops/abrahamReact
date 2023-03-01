import React, { useState } from "react";
import TituloComponent from "../../../genericos/TituloComponent";
import Filtro from "./Filtro";



const Bitacora = () =>{
   // Bitacora
   const [dialog,setDialog] = useState(false);

   return (
       <>
     
       
       <TituloComponent />
        
         <Filtro></Filtro>
         
       </>
   );
}

export default Bitacora;