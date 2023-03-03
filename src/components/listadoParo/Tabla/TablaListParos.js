import React,{ useState, useEffect } from 'react';
import { Column } from "primereact/column";
import { Ripple } from 'primereact/ripple';
import { DataTable } from 'primereact/datatable';
import { CardTabla,CardGeneral } from '../../indicadoresTurno/UI/Cards';
import Spinner from '../../loader/Spinner';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import {Service} from "../../../service/Service";

import {LISTADO_DE_PAROS_POST_FILTER} from "../../../genericos/Uris"
import {LISTADO_DE_PAROS_POST_TABLE_FILTER} from "../../../genericos/Uris"

const TablaListParos = ({ filtro }) => {

    const serviceParosList = new Service();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const [first1, setFirst1] = useState(0);
    const [rowsTbl, setRowsTbl] = useState(5);
    const [loading, setLoading] = useState(true);
    const [filtros,setFiltros] = useState({});
    const [bitacoraList,setBitacoraList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [fechaIncAux, setFechaIncAux] = useState();
    const [fechaFinAux, setFechaFinAux] = useState();
    const [idPlanta, setIdPlanta] = useState();
    const [lazyParams, setLazyParams] = useState({
        first: 1,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {
            'accion': { value: '', matchMode: 'contains' },
            'modulo': { value: '', matchMode: 'contains' },
            'creadoPor': { value: '', matchMode: 'contains' },
            'fechaCreacion': { value: '', matchMode: 'contains' }
        },
        fechaInc:null,
        fechaFin:null,
        maquinas:[]
    });

    let loadLazyTimeout = null;

    useEffect(() => {
        console.log("ejecutar")
        loadLazyData();
    },[lazyParams,filtro]);


    const enviarFiltro= async(request)=>{   
        console.log("enviar filtro")
        setFiltros({fechaInicioP:request.fechaInicio,fechaFinP:request.fechaFin,idPlantaP:request.idPlanta})
        setFechaIncAux(request.fechaInicio)
        setFechaFinAux(request.fechaFin)
        setIdPlanta(request.idPlanta)
        let bodyParosList = {
           "page":0,
           "total":10,
           "fechaInc": request.fechaInicio,
           "fechaFin": request.fechaFin,
           "idPlanta": request.idPlanta
           
       }
        serviceParosList.baseUrl=serviceParosList.baseUrl+LISTADO_DE_PAROS_POST_FILTER
        if(!(request.from==="button")){
            bodyParosList.page=request.page
            bodyParosList.total=request.rows
       }
       try{
           setLoading(true)
           const data=await serviceParosList.create(bodyParosList)
           console.log(data)
           getBitacora(data)
           setLoading(false)
       }
       catch(error){
           console.log(error)
            setLoading(false)
       }
       
     }

    const  loadLazyData =  () => {
        setLoading(true)
        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }
        loadLazyTimeout = setTimeout(async () => {
            lazyParams.fechaInc = filtro.fechaInc;
            lazyParams.fechaFin = filtro.fechaFin;
            lazyParams.maquinas = filtro.maquinas;
            try{
                serviceParosList.baseUrl=serviceParosList.baseUrl+LISTADO_DE_PAROS_POST_FILTER
                const JSobj = JSON.parse(JSON.stringify(lazyParams));
                const data = await serviceParosList.create(JSobj);
                getBitacora(data)
                setLoading(false)
            }
            catch(error){
                // setLoading(false)
                console.log(error)
            }
        }, 1500);
    }

    const onPage = (event) => {
        console.log("onPage")
       
        setLazyParams(event);
    }

    const onSort = (event) => {
        console.log("on sort")
        setLazyParams(event);
    }

    const onFilter = (event) => {
        console.log("on filter")
        event['first'] = 0;
        setLazyParams(event);
    }

    const getBitacora = (data)=>{

        console.log("printing from parent")
       console.log(data);
       setBitacoraList([]);
       if(data.bitacora!=null){
             data.bitacora.forEach(element => {
                 console.log(element);
                 
                 setBitacoraList(oldArray => [...oldArray, 
                     {
                     accion: element.accion,creadoPor:element.creadoPor,modulo: element.modulo, fechaCreacion:element.fechaCreacion
                     }]);
             });
            setTotalRecords(data.numTotalReg);
        }else{
         console.log('no se encontran registros')
        }
     
       setLoading(false)
      }


    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Previous</span>
                    <Ripple />
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Next</span>
                    <Ripple />
                </button>
            )
        },
        'PageLinks': (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });

                return <span className={className} style={{ userSelect: 'none' }}>...</span>;
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            )
        },
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
                { label: 'All', value: options.totalRecords }
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Go to <InputText size="2" className="ml-1" value={currentPage} tooltip={pageInputTooltip}
                        onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange}/>
                </span>
            )
        }
    };

    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const pageP = parseInt(currentPage);
            if (pageP < 1 || pageP > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (pageP - 1) : 0;
                setFirst1(first);
                setPageInputTooltip('Press \'Enter\' key to go to this page.');
            }
        }
    }

    const onPageInputChange = (event) => {
        console.log("onPageInputChange")
        console.log(event.target.value)
        setCurrentPage(event.target.value);
    }


        const registros =[{}]
        return (
            <div>
                {loading ? (
                    <Spinner/>
                ):(
                    <>
                        <CardGeneral> 
                            <CardTabla>
                                <DataTable
                                    value={registros} 
                                    lazy
                                    filterDisplay="row" 
                                    dataKey="id" 
                                    first={lazyParams.first}
                                    rows={10}
                                    totalRecords={totalRecords}
                                    onPage={onPage} 
                                    onSort={onSort}
                                    sortField={lazyParams.sortField}
                                    sortOrder={lazyParams.sortOrder}
                                    onFilter={onFilter}
                                    filters={lazyParams.filters} 
                                    paginator
                                    
                                    style={{ fontSize: "20px", textAlign: "center" }}
                                >
                                    <Column style={{ textAlign: "center", width: '10%' }} field="fecha" header="Fecha" sortable/>
                                    <Column style={{ textAlign: "center", width: '10%' }} field="planta" header="Planta" sortable filter filterPlaceholder="Buscar por planta" />
                                    <Column style={{ textAlign: "center", width: '10%' }} field="area" header="Area" sortable filter filterPlaceholder="Buscar por Area" />
                                    <Column style={{ textAlign: "center", width: '10%' }} field="linea" header="Linea"  sortable filter filterPlaceholder="Buscar por Linea"  />
                                    <Column style={{ textAlign: "center", width: '10%' }} field="maquina" header="Maquina" sortable filter filterPlaceholder="Buscar por Maquina"   />
                                    <Column style={{ textAlign: "center", width: '10%' }} field="modoFalla" header="Modo de Falla" sortable filter filterPlaceholder="Buscar por Modo de falla" />
                                    <Column style={{ textAlign: "center", width: '10%' }} field="inicioParo" header="Inicio de Paro" sortable />
                                    <Column style={{ textAlign: "center", width: '10%' }} field="finParo" header="Fin de Paro" sortable/>
                                    <Column style={{ textAlign: "center", width: '10%' }} field="duracion" header="Tiempo[mins]" sortable/>
                                </DataTable>
                            </CardTabla>
                        </CardGeneral>
                    </>
                )}
            </div>
        );
}
export default TablaListParos