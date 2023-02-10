import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

const TablaPlantas = ({ BotonesCabezal, ExportarRegistros, dt, products, selectedProducts, filters, setSelectedProducts, header, actionBodyTemplate }) => {
    const [customers1, setCustomers1] = useState([]);
    const [customers2, setCustomers2] = useState([]);
    const [customers3, setCustomers3] = useState([]);
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [first2, setFirst2] = useState(0);
    const [rows2, setRows2] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState("Press 'Enter' key to go to this page.");

    const onCustomPage1 = (event) => {
        console.log("pagina");
        console.log(event.page);
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page + 1);
        //aqui peticion del backend
        //post pagina
    };

    const onPageInputKeyDown = (event, options) => {
        if (event.key === "Enter") {
            const page = parseInt(currentPage);
            if (page < 1 || page > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            } else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst1(first);
                setPageInputTooltip("Press 'Enter' key to go to this page.");
            }
        }
    };

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    };
    const template1 = {
        layout: "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
        PrevPageLink: (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Previous</span>
                    <Ripple />
                </button>
            );
        },
        NextPageLink: (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Next</span>
                    <Ripple />
                </button>
            );
        },
        PageLinks: (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { "p-disabled": true });

                return (
                    <span className={className} style={{ userSelect: "none" }}>
                        ...
                    </span>
                );
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            );
        },
        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
                { label: "All", value: options.totalRecords },
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
        },
        CurrentPageReport: (options) => {
            return (
                <span className="mx-3" style={{ color: "var(--text-color)", userSelect: "none" }}>
                    Go to <InputText size="2" className="ml-1" value={currentPage} tooltip={pageInputTooltip} onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange} />
                    {options.totalPages}
                </span>
            );
        },
    };
    //--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros} />

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
                rowsPerPageOptions={[5, 10, 25]}
                showGridlines
                paginatorTemplate={template1}
                // CAMBIAR...
                globalFilterFields={["id", "planta"]}
                emptyMessage="No se encontraron resultados."
                header={header}
                responsiveLayout="scroll"
            >
                {/* // CAMBIAR.............. */}
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} exportable={false} />
                <Column field="id" header="ID" sortable style={{ width: "7rem", textAlign: "center" }} />
                <Column field="planta" header="Planta" sortable style={{ minWidth: "7rem", textAlign: "center" }} />
                <Column field="descripcion" header="Descripción" sortable style={{ minWidth: "7rem", textAlign: "center" }} />
                <Column field="estatus" header="Estatus" sortable style={{ minWidth: "7rem", textAlign: "center" }} />
                <Column field="fechaCreacion" header="Fecha de Creación" sortable style={{ minWidth: "3rem", textAlign: "center" }} />
                <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ minWidth: "3rem" }} />
            </DataTable>
        </div>
    );
};

export default TablaPlantas;
