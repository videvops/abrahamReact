import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { TablaVacia } from "../../../../components/mensajes/Mensajes";

const TablaPlantas = ({ BotonesCabezal, ExportarRegistros, dt, products, selectedProducts, filters, setSelectedProducts, header, actionBodyTemplate }) => {
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
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros} />
            {products.length > 0 ? (
                <DataTable
                    ref={dt}
                    value={products}
                    selection={selectedProducts}
                    filters={filters}
                    totalRecords={100}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id"
                    paginator
                    onPage={onCustomPage1}
                    rows={rows1}
                    first={first1}
                    paginatorTemplate={template1}
                    
                    showGridlines
                    globalFilterFields={["id", "planta"]}
                    emptyMessage="No se encontraron resultados."
                    header={header}
                    responsiveLayout="scroll"
                    filterDisplay="row"
                >
                    <Column selectionMode="multiple" headerStyle={{ width:"5%"}} exportable={false} />
                    <Column
                        field="planta" header="Planta" sortable filter filterPlaceholder="Buscar"
                        style={{ width: "30%", minWidth: "7rem", textAlign: "center" }} />
                    <Column
                        field="estatus" header="Estatus" sortable filter filterPlaceholder="Buscar"
                        style={{ width: "30%", minWidth: "3rem", textAlign: "center" }} />
                    <Column
                        field="fechaCreacion" header="Fecha de Creación" sortable filter filterPlaceholder="Buscar"
                        style={{ width: "30%", minWidth: "3rem", textAlign: "center" }} />
                    <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ width:"15%", minWidth: "3rem" }} />
                </DataTable>
            ) : (
                    <TablaVacia categoria='plantas' />
            )}
        </div>
    );
};

export default TablaPlantas;
