import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';

const TablaUsuarios = ({BotonesCabezal,ExportarRegistros,dt,products,selectedProducts,filters,setSelectedProducts,header,actionBodyTemplate}) => {
    // const valoresFicticios=[
    //     {id:1,usuario:"persona1",nombre:"nombre1",apellidoPaterno:"perez",apellidoMaterno:"materno1", rol:"administrador",empleado:"empleado1"},
    //     {id:2,usuario:"persona2",nombre:"Juan",apellidoPaterno:"paterno2",apellidoMaterno:"materno2", rol:"usuario",empleado:"empleado2"},
    // ]

//--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros}  />

            <DataTable 
            ref={dt} 
            value={products}
            // value={valoresFicticios}
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
            globalFilterFields={['id', 'usuario', 'nombre', 'apellidoPaterno','apellidoMaterno', 'rol', 'empleado']}
            emptyMessage="No se encontraron resultados."
            header={header} 
            responsiveLayout="scroll"
            >
                {/* // CAMBIAR.............. */}
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}/>
                <Column field="id" header="ID" sortable style={{ width: '7rem',textAlign:'center' }}/>
                <Column field="usuario" header="Usuario" sortable style={{ minWidth: '7rem',textAlign:'center' }}/>
                <Column field="nombre" header="Nombre" sortable style={{ minWidth: '7rem',textAlign:'center' }}/>
                <Column field="apellidoPaterno" header="Apellido Paterno" sortable style={{ minWidth: '7rem',textAlign:'center' }}/>
                <Column field="apellidoMaterno" header="Apellido Materno" sortable style={{ minWidth: '7rem',textAlign:'center' }}/>
                <Column field="rol" header="Rol" sortable style={{ minWidth: '7rem',textAlign:'center' }}/>
                <Column field="empleado" header="Empleado" sortable style={{ minWidth: '7rem',textAlign:'center' }}/>
                <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ minWidth: '3rem' }}/>
            </DataTable>
        </div>
    )
}

export default TablaUsuarios
