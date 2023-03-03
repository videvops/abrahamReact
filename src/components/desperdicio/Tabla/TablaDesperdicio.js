import React, { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CardGeneral, CardTabla } from '../UI/Cards';
import Spinner from "../../loader/Spinner";

const TablaDesperdicio = ({registros,isLoading}) => {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        planta: { value: null, matchMode: FilterMatchMode.CONTAINS },
        linea: { value: null, matchMode: FilterMatchMode.CONTAINS },
        area: { value: null, matchMode: FilterMatchMode.CONTAINS },
        maquina: { value: null, matchMode: FilterMatchMode.CONTAINS },
        rechazo: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    if(Object.entries(registros).length === 0){
        return(<h3>No hay informacion disponible</h3>)
    }else{
        return (
            <div className='flex justify-content-center col-12 md:col-12 grid p-fluid a'>
                {!isLoading && (
                    <div className='col-12 md:col-12 grid p-fluid'>
                        <CardGeneral> 
                            <CardTabla>
                                <DataTable
                                    value={registros} 
                                    responsiveLayout="scroll" 
                                    style={{ fontSize: "20px", textAlign: "center" }}
                                    paginator
                                    rows={5}
                                    filters={filters}
                                    filterDisplay="row"
                                    rowsPerPageOptions={[5, 10, 25]}
                                    globalFilterFields={['planta', 'area', 'linea','maquina','rechazo']} 
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Registros de {first} a {last} de {totalRecords} registros">
                                    <Column field="fecha" header="Fecha" style={{ textAlign: "center",width:"15%"}}  />
                                    <Column field="planta" header="Planta" filter filterPlaceholder="Buscar por planta" filterMenuStyle={{ width: '20%' }} style={{ textAlign: "center",width:"20%" }} />
                                    <Column field="area" header="Area" filter filterPlaceholder="Buscar por Area"  filterMenuStyle={{ width: '20%' }} style={{ textAlign: "center",width:"20%" }} />
                                    <Column field="linea" header="Linea" filter filterPlaceholder="Buscar por Linea"  filterMenuStyle={{ width: '20%' }} style={{ textAlign: "center",width:"20%" }} />
                                    <Column field="maquina" header="Maquina" filter filterPlaceholder="Buscar por Maquina"   filterMenuStyle={{ width: '20%' }} style={{ textAlign: "center",width:"20%" }} />
                                    <Column field="rechazo" header="Rechazos[Kg]" filter filterPlaceholder="Buscar por Rechazo"  filterMenuStyle={{ width: '10%' }} style={{ textAlign: "center" ,width:"10%"}} />
                                </DataTable>
                            </CardTabla>
                        </CardGeneral>
                    </div>
                )}
                {isLoading && <Spinner />}
            </div>
        )
    }
}
export default TablaDesperdicio