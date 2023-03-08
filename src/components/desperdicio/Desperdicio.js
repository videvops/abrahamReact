import React, { useState } from 'react'
import CabezalListParos from './Cabezal/CabezalDesperdicio';
import TablaDesperdicio from './Tabla/TablaDesperdicio';
import { SelectButton } from 'primereact/selectbutton';
import Spinner from '../loader/Spinner';

import DesperdicioLinea from '../../components/graficas/barChartDesperdicio/DesperdicioLinea';
import DesperdicioMaquina from '../../components/graficas/barChartDesperdicio/DesperdicioMaquina';
import { SelecconaFiltros } from '../mensajes/Mensajes';

const Desperdicio = () => {
    
    const [registros, setRegistros] = useState([]) ;
    const [chartFiltros, setChartFiltros] =useState([]);
    const [val, setVal]=useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const headers  = [
        {label: 'Grafica Desperdicio Por Linea'},
        {label: 'Grafica Desperdicio Por Maquina'},
        {label: 'Tabla'}
    ];

    const graficaDespLinea=document.getElementById('despLineaDiv')
    const graficaDespMaquina=document.getElementById('despMaquinaDiv')
    const tablaDesp=document.getElementById('tablaDiv')
    
    switch (val.label){
        case 'Grafica Desperdicio Por Linea':
            graficaDespLinea.style.display ='inline';
            graficaDespMaquina.style.display ='none';
            tablaDesp.style.display ='none'; 
        break;
        case 'Grafica Desperdicio Por Maquina':
            graficaDespLinea.style.display ='none';
            graficaDespMaquina.style.display ='inline';
            tablaDesp.style.display ='none'; 

        break;
        case 'Tabla':
            graficaDespLinea.style.display ='none';
            graficaDespMaquina.style.display ='none';
            tablaDesp.style.display ='inline'; 
        break;
    }
    return (
        <div>
            <CabezalListParos 
            setRegistros={setRegistros}
            setChartFiltros={setChartFiltros}
            setIsLoading ={setIsLoading}
            />  
            {registros.length > 0? (
                <>
                    {isLoading ? (
                        <Spinner />
                    ):(
                        <>
                            <div className='col-12 md:col-12 grid p-fluid'>
                                <SelectButton className='col-12 md:col-12 grid p-fluid'
                                    options={headers} 
                                    onChange={(e) => setVal(e.value)}
                                />
                            </div>
                            <div className='col-12 md:col-12 grid p-fluid' id='despLineaDiv' style={{display:'inline'}}>
                                <DesperdicioLinea
                                    filtros = {chartFiltros}
                                />
                            </div>
                            <div className='col-12 md:col-12 grid p-fluid' id='despMaquinaDiv' style={{display:'none'}}>
                                <DesperdicioMaquina
                                    filtros = {chartFiltros}
                                />
                            </div>             
                            <div className='col-12 md:col-12 grid p-fluid' id='tablaDiv' style={{display:'none'}}>
                                <TablaDesperdicio 
                                    registros={registros}
                                    isLoading={isLoading} 
                                />
                            </div>
                        </>
                    ) }
                </>
            ):(
                <SelecconaFiltros categoria="desperdicios" />
            )}
        </div>
        )
    


}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Desperdicio, comparisonFn);