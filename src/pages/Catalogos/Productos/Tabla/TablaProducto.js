import React, { useState } from 'react'
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';

const TablaProducto = ({
    BotonesCabezal,
    ExportarRegistros,
    dt,
    products,
    selectedProducts,
    setSelectedProducts,
    actionBodyTemplate,
    paginacion,
    first,
    setFirst,
    filas,
    pagina,
    setPagina,
    totalRegistros,
    titulo,
    cargarDatos
}) => {
//--------------------| Plantilla |--------------------
    const [pageInputTooltip, setPageInputTooltip] = useState('Presiona \'Enter\' para cambiar de pagina.')
    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = parseInt(pagina);
            if (page < 0 || page > options.totalPages) {
                setPageInputTooltip(`El valor debe ser entre 1 y ${options.totalPages}.`);
            }
            else {
                const first = pagina ? options.rows * (page) : 0;
                setFirst(first);
                setPageInputTooltip('Presiona \'Enter\' para cambiar de pagina.');
                cargarDatos({ page: pagina, total: filas })
            }
        }
    }
    
    const plantilla = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        'RowsPerPageDropdown': (options) => {   // Filas por pagina
            const dropdownOptions = [
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 15, value: 15 },
                { label: 20, value: 20 }
            ];

            return (
                <>
                    <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Registros por página: </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
                </>
            );
        },
        'CurrentPageReport': (options) => {     // Reporte de pagina actual
            return (
                <>
                    <span className='flex' style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                        {options.first} - {options.last} de {options.totalRecords}
                    </span>
                    <div>
                        Página <InputText size="1" className="ml-1" value={pagina} tooltip={pageInputTooltip}
                        onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={(event)=>setPagina(event.target.value)}/>
                    </div>
                </>
            )
        }
    };

//--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros}  />

            <DataTable
                header={titulo}
                ref={dt} 
                value={products} 
                selection={selectedProducts} 
                onSelectionChange={(e) => setSelectedProducts(e.value)} 
                showGridlines 
                emptyMessage="No se encontraron resultados."
                responsiveLayout="scroll"
                filterDisplay="row"
            >
                {/* // CAMBIAR.............. */}
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}/>
                <Column
                    field="producto"
                    header="Producto"
                    sortable
                    style={{ textAlign: 'center' }}
                    filter filterPlaceholder="Buscar"
                />
                <Column
                    field="area"
                    header="Area"
                    sortable
                    style={{ textAlign: 'center' }}
                    filter filterPlaceholder="Buscar"
                />
                <Column
                    field="planta"
                    header="Planta"
                    sortable
                    style={{ textAlign: 'center' }}
                    filter filterPlaceholder="Buscar"
                />
                <Column
                    field="fechaCreacion"
                    header="Fecha de creación"
                    sortable
                    style={{ textAlign: 'center' }}
                    filter filterPlaceholder="Buscar"
                />
                <Column
                    header="Editar"
                    body={actionBodyTemplate}
                    exportable={false}
                    style={{ minWidth: '3rem' }}
                />
            </DataTable>
            <Paginator
                template={plantilla}
                first={first}
                rows={filas}
                totalRecords={totalRegistros}
                rowsPerPageOptions={[5, 10, 15, 20]}
                onPageChange={paginacion}
            />
        </div>
    )
}

export default TablaProducto
