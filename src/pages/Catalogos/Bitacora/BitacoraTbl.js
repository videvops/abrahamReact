import React,{ useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Ripple } from 'primereact/ripple';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import {Service} from "../../../service/Service";
import {BITACORA_POST_TABLE_FILTER,BITACORA_POST_FILTER,BITACORA_REPORTE} from "../../../genericos/Uris";
import Spinner from '../../../components/loader/Spinner';
import DialogCustom from "./DialogCustom";
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';


const BitacoraTbl = () =>{

    const servicioBitacora = new Service();
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
        page: 1,
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
        idPlanta:null
    });

    const toast = useRef(null)
    let loadLazyTimeout = null;


    useEffect(() => {
        console.log("bitacora")
        loadLazyData();
    },[lazyParams]);

    const enviarFiltro=async(request)=>{
        console.log("Sending filter from filter component")
        setFiltros({fechaInicioP:request.fechaInicio,fechaFinP:request.fechaFin,idPlantaP:request.idPlanta})
        console.log(request.from)
        console.log(request);
        setFechaIncAux(request.fechaInicio)
        setFechaFinAux(request.fechaFin)
        setIdPlanta(request.idPlanta)
        let bodyBitacora = {
           "page":1,
           "total":10,
           "fechaInc": request.fechaInicio,
           "fechaFin": request.fechaFin,
           "idPlanta": request.idPlanta
           
       }
        servicioBitacora.baseUrl=servicioBitacora.baseUrl+BITACORA_POST_FILTER
        if(!(request.from==="button")){
           bodyBitacora.page=request.page
           bodyBitacora.total=request.rows
       }
       console.log("body request")
       console.log(bodyBitacora)
       try{
           //loader true
           setLoading(true)
           const data=await servicioBitacora.create(bodyBitacora)
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
        console.log(" loadLazyData useeffect")
        setLoading(true)
        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(async () => {
            // console.log("lazy request sending")
            lazyParams.fechaInc = fechaIncAux;
            lazyParams.fechaFin = fechaFinAux;
            lazyParams.idPlanta = idPlanta;
            // console.log('lazyparams after adding dates')
            console.log(lazyParams)
            try{
                servicioBitacora.baseUrl=servicioBitacora.baseUrl+BITACORA_POST_TABLE_FILTER
                const JSobj = JSON.parse(JSON.stringify(lazyParams));
                const data = await servicioBitacora.create(JSobj);
                console.log(data)
                getBitacora(data)
                setLoading(false)
        
            }
            catch(error){
                setLoading(false)
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
        console.log("onPageInputKeyDown")
        console.log(event.key)
        if (event.key === 'Enter') {

            const pageP = parseInt(currentPage);
            if (pageP < 1 || pageP > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            }
            else {
                console.log("else:"+pageP)
                //props.enviarFiltroE({page:pageP-1});
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

    const exportToExcel = async () =>{
       console.log('exporting to excel')
       
        try{
            setLoading(true)         
            servicioBitacora.baseUrl=servicioBitacora.baseUrl+BITACORA_REPORTE
            console.log('url'+servicioBitacora.baseUrl)
            const JSobj = JSON.parse(JSON.stringify(lazyParams));
            const data = await servicioBitacora.createReport(JSobj);
            downloadData(data)
            setLoading(false)
            toast.current.show({ severity: 'success', summary: 'Descargando!', detail: `${"Por favor guarda tu archivo"}`, life: 3000 });

        }
        catch(error){
            setLoading(false)
            console.log(error)
        }
    }

    const downloadData = (blob) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";
                const data = new Blob([blob], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(data, "Bitacora" + "_export_" + new Date().getTime());
            }
        });
    }

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportToExcel} />;
    };

  return (

    <div>
        
        {loading ? (
            <Spinner/>
        ):(<>
        
            <DialogCustom   enviarFiltroP={enviarFiltro}></DialogCustom>
            <Toast ref={toast} />
            <Toolbar className="mb-4 mt-1"  right={rightToolbarTemplate}></Toolbar>
            <div className="card">
                <DataTable 
                    value={bitacoraList} 
                    lazy 
                    filterDisplay="row" 
                    dataKey="id" 
                    paginator
                    first={lazyParams.first} 
                    rows={10} 
                    totalRecords={totalRecords}
                    onPage={onPage} 
                    onSort={onSort}
                    sortField={lazyParams.sortField}
                    sortOrder={lazyParams.sortOrder}
                    onFilter={onFilter}
                    filters={lazyParams.filters} 
                    tableStyle={{ minWidth: '60rem' }}
                >
                    <Column style={{ width: '25%' }} field="accion" header="Acción" sortable filter filterPlaceholder="Search" />
                    <Column style={{ width: '25%' }} field="modulo" sortable header="Módulo"   filter filterPlaceholder="Search" />
                    <Column style={{ width: '25%' }} field="creadoPor" sortable filter header="Creado Por" filterPlaceholder="Search" />
                    <Column style={{ width: '25%' }} field="fechaCreacion" header="Fecha" sortable  filterPlaceholder="Search" />
                </DataTable> 
            </div>
        </>
        )}
    </div>
  );

}

export default BitacoraTbl;



