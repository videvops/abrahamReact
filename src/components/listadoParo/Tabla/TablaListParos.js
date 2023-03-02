import React, { useState } from 'react';
import { Column } from "primereact/column";
import { DataTable } from 'primereact/datatable';
import { CardTabla,CardGeneral } from '../../indicadoresTurno/UI/Cards';
import { FilterMatchMode } from 'primereact/api';

const TablaListParos = ({ registros }) => {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        planta: { value: null, matchMode: FilterMatchMode.CONTAINS },
        linea: { value: null, matchMode: FilterMatchMode.CONTAINS },
        area: { value: null, matchMode: FilterMatchMode.CONTAINS },
        maquina: { value: null, matchMode: FilterMatchMode.CONTAINS },
        modoFalla: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

//--------------------| Valor que regresara  |--------------------
    return (
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
                    globalFilterFields={['planta', 'area', 'linea','maquina','modoFalla']} 
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Registros de {first} a {last} de {totalRecords} registros">
                    <Column field="fecha" header="Fecha" style={{ textAlign: "center", width: '10%' }} />
                    <Column field="planta" header="Planta" filter filterPlaceholder="Buscar por planta" filterMenuStyle={{ width: '100%' }} style={{ textAlign: "center", width: '10%' }} />
                    <Column field="area" header="Area" filter filterPlaceholder="Buscar por Area"  filterMenuStyle={{ width: '100%' }} style={{ textAlign: "center", width: '10%' }} />
                    <Column field="linea" header="Linea"  filter filterPlaceholder="Buscar por Linea"  filterMenuStyle={{ width: '100%' }} style={{ textAlign: "center", width: '10%' }} />
                    <Column field="maquina" header="Maquina" filter filterPlaceholder="Buscar por Maquina" filterMenuStyle={{ width: '100%' }} style={{ textAlign: "center", width: '10%' }} />
                    <Column field="modoFalla" header="Modo de Falla" filter filterPlaceholder="Buscar por Modo de falla" filterMenuStyle={{ width: '100%' }} tyle={{ textAlign: "center" , width: '10%'}} />
                    <Column field="inicioParo" header="Inicio de Paro" style={{ textAlign: "center" , width: '10%'}} />
                    <Column field="finParo" header="Fin de Paro" style={{ textAlign: "center", width: '10%' }} />
                    <Column field="duracion" header="Tiempo[mins]" style={{ textAlign: "center", width: '5%' }}  />
                </DataTable>
            </CardTabla>
        </CardGeneral>
    )
}

export default TablaListParos