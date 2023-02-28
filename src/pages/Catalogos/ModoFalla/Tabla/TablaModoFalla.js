import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { TablaVacia } from "../../../../components/mensajes/Mensajes";

const TablaModoFalla = ({ BotonesCabezal, ExportarRegistros, dt, products, selectedProducts, filters, setSelectedProducts, header, actionBodyTemplate }) => {
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
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id"
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    showGridlines
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrar de {first} a {last} de {totalRecords} productos"
                    // CAMBIAR...
                    globalFilterFields={["id", "modoFalla"]}
                    emptyMessage="No se encontraron resultados."
                    header={header}
                    responsiveLayout="scroll"
                >
                    {/* // CAMBIAR.............. */}
                    <Column selectionMode="multiple" headerStyle={{ width:"3%" }} exportable={false} />
                    <Column field="modoFalla" header="Modos de falla" sortable style={{ width:"30%" , textAlign: "center" }} />
                    <Column field="fechaCreacion" header="Fecha de Creacion" sortable style={{ width:"15%" , textAlign: "center" }} />
                    <Column field="planta" header="Planta " sortable style={{ width:"30%", textAlign: "center" }} />
                    <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ width:"15%" }} />
                </DataTable>
            ) : (
                    <TablaVacia texto='modos de falla' />
            )}
        </div>
    );
};

export default TablaModoFalla;
