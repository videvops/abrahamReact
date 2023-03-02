import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
// import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { TablaVacia } from '../../../../components/mensajes/Mensajes';
import TituloComponent from '../../../../genericos/TituloComponent';

const TablaProducto = ({
    dt,
    filas,
    first,
    pagina,
    titulo,
    products,
    setFirst,
    setPagina,
    paginacion,
    cargarDatos,
    BotonesCabezal,
    totalRegistros,
    selectedProducts,
    ExportarRegistros,
    actionBodyTemplate,
    setSelectedProducts,
}) => {
//--------------------| Componente Lazy |--------------------
    let loadLazyTimeout = null
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {
            'producto': { value: '', matchMode: 'contains' },
            'area': { value: '', matchMode: 'contains' },
            'planta': { value: '', matchMode: 'contains' },
        }
    })
    
    useEffect(() => { 
        lazyAccion()
    }, [lazyState]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const lazyAccion = () => {
        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }
        loadLazyTimeout = setTimeout(() => {
            // customerService.getCustomers({ lazyEvent: JSON.stringify(lazyParams) }).then(data => {
            //     setTotalRecords(data.totalRecords);
            //     setCustomers(data.customers);
            //     setLoading(false);
            // });
            console.log("Peticion enviada")
            // console.log(lazyState)
            // const objetoBackEnd = { lazyEvent: JSON.stringify(lazyState) }
            // console.log(JSON.stringify(lazyState))
        }, Math.random() * 1000 + 250);
    }

    const onPage = (event) => {
        console.log(event)
        paginacion()
        setlazyState({ ...lazyState, page: event.page, rows: event.rows })
    }
    //--> Filtros por columna
    const onFilter = (event) => {
        event['first'] = 0;
        setlazyState({ ...lazyState, filters: event.filters })
    }
    const onSort = (event) => {
        setlazyState({ ...lazyState, sortField: event.sortField,sortOrder:event.sortOrder })
    }
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
    }

//--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <TituloComponent titulo='Productos' />
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros}  />
            {products.length > 0 ? (
                <div>
                    <DataTable
                        //--> Se mostrara en pantalla
                        ref={dt} header={titulo} value={products}
                        //--> Paginacion
                        paginator paginatorTemplate={plantilla} first={first} rows={filas}
                        totalRecords={totalRegistros} rowsPerPageOptions={[5, 10, 15, 20]} onPage={onPage}
                        //--> Lazy
                        lazy onFilter={onFilter} filters={lazyState.filters}
                        onSort={onSort} sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
                        //--> Seleccionar 1 o muchos registros
                        selection={selectedProducts} 
                        onSelectionChange={(e) => setSelectedProducts(e.value)} 
                        //--> Caracterizticas de la tabla
                        showGridlines filterDisplay="row" responsiveLayout="scroll" emptyMessage="No hay resultados."
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false} />
                        <Column
                            field="producto" header="Producto"
                            sortable filter filterPlaceholder="Buscar"
                            style={{ textAlign: 'center' }} />
                        <Column
                            field="area" header="Area"
                            sortable filter filterPlaceholder="Buscar"
                            style={{ textAlign: 'center' }} />
                        <Column
                            field="planta" header="Planta"
                            sortable filter filterPlaceholder="Buscar"
                            style={{ textAlign: 'center' }} />
                        <Column
                            header="Editar" body={actionBodyTemplate}
                            style={{ minWidth: '3rem' }} exportable={false} />
                        
                    </DataTable>
                    {/* <Paginator
                        template={plantilla}
                        first={first}
                        rows={filas}
                        totalRecords={totalRegistros}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        onPageChange={onPage} /> */}
                </div>
            ) : (
                    <TablaVacia categoria="productos" />
            )}
        </div>
    )
}

export default TablaProducto
