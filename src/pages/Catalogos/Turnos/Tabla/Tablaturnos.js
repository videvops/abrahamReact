import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { TablaVacia } from '../../../../components/mensajes/Mensajes';

const TablaTurnos = ({BotonesCabezal,ExportarRegistros,dt,products,selectedProducts,filters,setSelectedProducts,header,actionBodyTemplate}) => {
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
                // CAMBIAR...
                globalFilterFields={['id', 'turno','linea']}
                emptyMessage="No se encontraron resultados."
                header={header} 
                responsiveLayout="scroll"
                >
                    {/* // CAMBIAR.............. */}
                    <Column selectionMode="multiple" headerStyle={{ width:"3%" }} exportable={false}/>
                    <Column field="turno" header="Turno" sortable style={{ width:"15%", textAlign:'center' }}/>
                    <Column field="horaInicio" header="Hora de Inicio" sortable style={{ width:"15%", textAlign:'center' }}/>
                    <Column field="horaFin" header="Hora de Fin" sortable style={{ width:"15%", textAlign:'center' }}/>
                    <Column field="linea" header="Linea" sortable style={{ width:"15%", textAlign:'center' }}/>
                    <Column field="fechaCreacion" header="Fecha de creacion" sortable style={{ width:"10%", textAlign:'center' }}/>
                    <Column field="estatus" header="Estatus" sortable style={{ width:"10%", textAlign:'center' }}/>
                    <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ width:"10%" }}/>
                </DataTable>
            ) : (
                    <TablaVacia texto='turnos' />
            )}
        </div>
    )
}

export default TablaTurnos
