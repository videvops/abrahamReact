import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { Toolbar } from 'primereact/toolbar'
import { DataTable } from 'primereact/datatable'
import TituloComponent from '../../../../genericos/TituloComponent'

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';

const TablaProductos = ({
    products,
    lazyState, setlazyState, totalRecords,
    // onPage,
    onSort, onFilter,
    actionBodyTemplate, BotonesCabezal, ExportarRegistros, selectedProducts, setSelectedProducts
}) => {
    const [numPagina, setNumPagina] = useState(lazyState.page)
    const [pageInputTooltip, setPageInputTooltip] = useState('Presiona \'Enter\' para cambiar de pagina.')

    const onCustomPageChange1 = (event) => {
        // setlazyState(event.first);
        // console.log('cambio',event)
        setlazyState({ ...lazyState, first: event.first, rows: event.rows, page: event.page })
        // setlazyState(event.rows);
        // setlazyState({ ...lazyState, rows: event.rows })
        // setlazyState(event.page + 1);
        // setlazyState({ ...lazyState, page: event.page })
    }
    //--> Se ejecuta con cada 'enter'
    const onPageInputKeyDown = (event, options) => {
        // 'event' para revisar que presiono enter
        if (event.key === 'Enter') {
            const page = parseInt(numPagina);
            if (page < 0 || page > options.totalPages) {
                setPageInputTooltip(`Ingresa un valor entre 1 y ${options.totalPages}.`);
            }
            else {
                const first = lazyState.page ? options.rows * (page - 1) : 0;
                setPageInputTooltip('Presiona \'Enter\' para cambiar de pagina.');
                setlazyState({ ...lazyState, first: first, page: numPagina })
            }
        }
    }
    //--> Plantilla paginacion
    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Previo</span>
                    <Ripple />
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Siguiente</span>
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
                { label: 15, value: 15 },
                { label: 25, value: 25 }
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <div>
                    <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                        Ir a <InputText size="2" className="ml-1" value={numPagina} tooltip={pageInputTooltip}
                            onKeyDown={(e) => onPageInputKeyDown(e, options)}
                            // onChange={onPageInputChange}
                            // onChange={(e) => setlazyState({ ...lazyState, page: parseInt(e.target.value) })}
                            onChange={(e) => setNumPagina(e.target.value)}
                        />
                    </span>
                    {options.first} - {options.last} de {options.totalRecords}
                </div>
            )
        }
    };
//--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <TituloComponent titulo='Productos' />
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros}  />
            <DataTable value={products} filterDisplay="row" showGridlines rowsPerPageOptions={[5, 10, 25, 50]}
                responsiveLayout="scroll"
                lazy paginator first={lazyState.first} rows={lazyState.rows} totalRecords={totalRecords}
                // onPage={onPage}
                onSort={onSort} sortField={lazyState.sortField}
                sortOrder={lazyState.sortOrder} onFilter={onFilter} filters={lazyState.filters}
                selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}

                paginatorTemplate={template1} onPage={onCustomPageChange1}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false} />
                <Column
                    field="producto" header="Producto"
                    sortable filter filterPlaceholder="Buscar"
                    style={{ minWidth: '16rem' }} />
                <Column
                    field="area" header="Area"
                    sortable filter filterPlaceholder="Buscar"
                    style={{ minWidth: '16rem' }} />
                <Column
                    field="planta" header="Planta"
                    sortable filter filterPlaceholder="Buscar"
                    style={{ minWidth: '16rem' }} />
                <Column
                    field="creadoPor" header="Creado Por"
                    sortable filter filterPlaceholder="Buscar"
                    style={{ minWidth: '16rem' }} />
                <Column
                    header="Editar" body={actionBodyTemplate}
                    style={{ minWidth: '12rem' }} exportable={false} />
            </DataTable>
        </div>
    )
}

export default TablaProductos
