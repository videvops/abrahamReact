import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";

const TablaStatus = ({ BotonesCabezal, ExportarRegistros, dt, products, selectedProducts, filters, setSelectedProducts, header, actionBodyTemplate }) => {
    //--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros} />

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
                globalFilterFields={["id", "nombreStatus"]}
                emptyMessage="No se encontraron resultados."
                header={header}
                responsiveLayout="scroll"
            >
                {/* // CAMBIAR.............. */}
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} exportable={false} />
                <Column field="id" header="ID" sortable style={{ minWidth: "12rem", textAlign: "center" }} />
                <Column field="nombreStatus" header="Status" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="descripcion" header="Descripcion" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="fechaCreacion" header="Fecha de Creacion" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="fechaModificación" header="Fecha de Modificación" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="creadoPor" header="Creado por" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="modificadoPor" header="Modificado por " sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="idPlanta" header="ID Planta " sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="idEmpresa" header="ID Empresa " sortable style={{ minWidth: "16rem", textAlign: "center" }} />
            </DataTable>
        </div>
    );
};

export default TablaStatus;
