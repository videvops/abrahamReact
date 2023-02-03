import React, { useState } from 'react'
import CabezalListParos from './Cabezal/CabezalListParos'
import TablaListParos from './Tabla/TablaListParos'
import { SelectButton } from 'primereact/selectbutton';

import BarChartTiempoMuertoGrafica from "../graficas/barChartTiempoMuerto/BarChartTiempoMuertoGrafica"
import BarChartModoFallaGrafica from '../graficas/barChartModosFalla/BarChartModoFallaGrafica';


const ListadoParos = () => {
    //---> Variable donde se almacena la informacion del back-end
    const [registros, setRegistros] = useState([]) 
    const [chartFiltros, setChartFiltros] =useState([])
    const [value, setValue]=useState(0)

    const headers  = [
        {label: 'Grafica Modos de Falla'},
        {label: 'Grafica Tiempo Muerto'},
        {label: 'Tabla'}
    ];
    const modoFalla=document.getElementById('modoFallaDiv')
    const tiempoMuerto=document.getElementById('tiempoMuertoDiv')
    const tabla=document.getElementById('tablaDiv')

    switch (value.label){
        case 'Grafica Modos de Falla':
            modoFalla.style.display ='inline';
            tiempoMuerto.style.display ='none';
            tabla.style.display ='none'; 
        break;
        case 'Grafica Tiempo Muerto':
            modoFalla.style.display ='none';
            tiempoMuerto.style.display ='inline';
            tabla.style.display ='none'; 

        break;
        case 'Tabla':
            modoFalla.style.display ='none';
            tiempoMuerto.style.display ='none';
            tabla.style.display ='inline'; 
        break;
    }

//--------------------| Valor que regresara  |--------------------
    return (
        <div>
            <CabezalListParos 
                setRegistros={setRegistros}
                setChartFiltros={setChartFiltros}
            />
            <div className='col-12 md:col-12 grid p-fluid'>
                <SelectButton className='col-12 md:col-12 grid p-fluid'
                    options={headers} 
                    onChange={(e) => setValue(e.value)}
                />
            </div>
            <div className='col-12 md:col-12 grid p-fluid' id='modoFallaDiv' style={{display:'inline'}}>
                <BarChartModoFallaGrafica
                    filtros = {chartFiltros}
                />
            </div>
            <div className='col-12 md:col-12 grid p-fluid' id='tiempoMuertoDiv' style={{display:'none'}}>
                <BarChartTiempoMuertoGrafica
                    filtros = {chartFiltros}
                />
            </div>             
            <div className='col-12 md:col-12 grid p-fluid' id='tablaDiv' style={{display:'none'}}>
                <TablaListParos 
                    registros={registros}
                />
            </div>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ListadoParos, comparisonFn);