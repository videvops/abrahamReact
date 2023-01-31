import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';

const TablaTipoParo = ({BotonesCabezal,ExportarRegistros,dt,products,selectedProducts,filters,setSelectedProducts,header,actionBodyTemplate}) => {
//--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros}  />

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
            globalFilterFields={['id', 'nombreTipoParo']}
            emptyMessage="No se encontraron resultados."
            header={header} 
            responsiveLayout="scroll"
            >
                {/* // CAMBIAR.............. */}
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}/>
                <Column field="id" header="ID" sortable style={{ width: '7rem',textAlign:'center' }}/>
                <Column field="nombreTipoParo" header="Tipo Paro" sortable style={{ minWidth: '7rem',textAlign:'center' }}/>
                <Column field="descripcion" header="Descripción" sortable style={{ minWidth: '7rem',textAlign:'center' }}/>
                <Column field="fechaCreacion" header="Fecha de Creación" sortable style={{ minWidth: '3rem',textAlign:'center' }}/>
                <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ minWidth: '3rem' }}/>
            </DataTable>
        </div>
    )
}

export default TablaTipoParo
