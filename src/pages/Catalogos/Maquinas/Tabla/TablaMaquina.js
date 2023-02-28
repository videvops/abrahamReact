import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { TablaVacia } from "../../../../components/mensajes/Mensajes";

const TablaMaquinas = ({ BotonesCabezal, ExportarRegistros, dt, products, selectedProducts, filters, setSelectedProducts, header, actionBodyTemplate }) => {
    //--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros} />
            {products.length > 0 ? (
                <DataTable
                    ref={dt}
                    value={products}
                    //value={maquinasFicticios}
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
                    globalFilterFields={["id", "calle", "num_ext", "fecha_creacion", "fecha_modificacion", "creado_por", "modificado_por"]}
                    emptyMessage="No se encontraron resultados."
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width:"3%", minWidth: "3rem" }} exportable={false} />
                    <Column field="maquina" header="Maquina" sortable style={{ width:"15%",textAlign: "center" }} />
                    <Column field="linea" header="Linea" sortable style={{ width:"15%", textAlign: "center" }} />
                    <Column field="area" header="Área" sortable style={{ width:"15%", textAlign: "center" }} />
                    <Column field="planta" header="Planta" sortable style={{ width:"15%", textAlign: "center" }} />
                    <Column field="estatus" header="Estatus " sortable style={{ width:"10%", textAlign: "center" }} />
                    <Column field="fechaCreacion" header="Fecha de Creacion" sortable style={{width:"315%",textAlign: "center" }} />
                    <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ width:"20%", minWidth: "10rem" }} />
                </DataTable>
            ) : (
                    <TablaVacia texto='maquinas' />
            )}
        </div>
    );
};

export default TablaMaquinas;
