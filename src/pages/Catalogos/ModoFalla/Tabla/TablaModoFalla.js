import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { TablaVacia } from "../../../../components/mensajes/Mensajes";

import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';
import TituloComponent from "../../../../genericos/TituloComponent";

const TablaModoFalla = ({ BotonesCabezal, ExportarRegistros, dt, products, selectedProducts, setSelectedProducts, actionBodyTemplate }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(5);
    const [pageInputTooltip, setPageInputTooltip] = useState('Presiona \'Enter\' key para ir a esta pagina.')
    
    const onCustomPage1 = (event) => {
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page + 1);
    }

    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = parseInt(currentPage);
            if (page < 1 || page > options.totalPages) {
                setPageInputTooltip(`El valor debe de estar entre 1 y ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst1(first);
                setPageInputTooltip('Presiona \'Enter\' key para ir a esta pagina.');
            }
        }
    }

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }
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
                { label: 25, value: 25 },
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Ir a <InputText size="2" className="ml-1" value={currentPage} tooltip={pageInputTooltip}
                        onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange}/>
                </span>
            )
        }
    };
    //--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <TituloComponent titulo='Modos de Falla' />
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros} />
            {products.length > 0 ? (
                <DataTable
                    ref={dt}
                    value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id"
                    paginator
                    
                    paginatorTemplate={template1}
                    first={first1} rows={rows1} onPage={onCustomPage1}

                    showGridlines
                    globalFilterFields={["id", "modoFalla"]}
                    emptyMessage="No se encontraron resultados."
                    responsiveLayout="scroll"
                    filterDisplay="row"
                >
                    <Column selectionMode="multiple" headerStyle={{ width:"3%" }} exportable={false} />
                    <Column
                        field="modoFalla" header="Modos de falla" sortable filter filterPlaceholder="Buscar"
                        style={{ width: "30%", textAlign: "center" }} />
                    <Column
                        field="fechaCreacion" header="Fecha de Creacion" sortable filter filterPlaceholder="Buscar"
                        style={{ width: "15%", textAlign: "center" }} />
                    <Column
                        field="planta" header="Planta " sortable filter filterPlaceholder="Buscar"
                        style={{ width: "30%", textAlign: "center" }} />
                    <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ width:"15%" }} />
                </DataTable>
            ) : (
                    <TablaVacia texto='modos de falla' />
            )}
        </div>
    );
};

export default TablaModoFalla;
