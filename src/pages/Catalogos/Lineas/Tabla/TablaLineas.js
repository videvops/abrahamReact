import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { TablaVacia } from "../../../../components/mensajes/Mensajes";

const TablaLineas = ({BotonesCabezal,ExportarRegistros,dt,products,selectedProducts,filters,setSelectedProducts,header,actionBodyTemplate}) => {
//--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros}  />
            {products.length > 0 ? (
                <DataTable 
                ref={dt} 
                value={products} 
                selection={selectedProducts} 
                filters={filters}
                onSelectionChange={(e) => setSelectedProducts(e.value)} 
                dataKey="id" 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25]} 
                showGridlines 
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrar de {first} a {last} de {totalRecords} productos"
                globalFilterFields={['id', 'linea','area']}
                emptyMessage="No se encontraron resultados."
                header={header} 
                responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width:"5%", minWidth:'3rem' }} exportable={false}/>
                    <Column field="linea" header="Linea" sortable style={{ width:"25%" , minWidth: '7rem',textAlign:'center' }}/>
                    <Column field="area" header="Area" sortable style={{width:"20%", minWidth: '7rem',textAlign:'center' }}/>
                    <Column field="meta" header="Meta" sortable style={{width:"10%", minWidth: '7rem',textAlign:'center' }}/>
                    <Column field="estatus" header="Estatus" sortable style={{ width:"15%", minWidth: '7rem',textAlign:'center' }}/>
                    <Column field="fechaCreacion" header="Fecha de Creación" sortable style={{width:"20%", minWidth: '3rem',textAlign:'center' }}/>
                    <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ width:"15%", minWidth: '3rem' }}/>
                </DataTable>
            ) : (
                    <TablaVacia texto='lineas' />
            )}
        </div>
    )
}

export default TablaLineas
