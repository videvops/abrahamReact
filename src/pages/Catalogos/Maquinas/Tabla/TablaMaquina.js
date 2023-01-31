import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";

const TablaMaquinas = ({ BotonesCabezal, ExportarRegistros, dt, products, selectedProducts, filters, setSelectedProducts, header, actionBodyTemplate }) => {
    const maquinasFicticios = [
        { id: 1, nombreMaquina: "Maquina 1", idPlanta: "planta 1", idEmpresa: "empresa 1", idLinea: "linea1", fechaModificación: "10-12-2004", idStatus: "activo", modificadoPor: "des1", fechaCreacion: "12-03-2022", idCreadoPor: "1" },
        { id: 2, nombreMaquina: "Maquina 2", idPlanta: "planta 2", idEmpresa: "empresa 2", idLinea: "linea2", fechaModificación: "12-03-2006", idStatus: "inactivo", modificadoPor: "des2", fechaCreacion: "10-10-2021", idCreadoPor: "2" },
        { id: 3, nombreMaquina: "Maquina 3", idPlanta: "planta 3", idEmpresa: "empresa 3", idLinea: "linea3", fechaModificación: "11-0planta 1-2007", idStatus: "pendiente", modificadoPor: "des3", fechaCreacion: "15-06-2019", idCreadoPor: "3" },
        { id: 4, nombreMaquina: "Maquina 4", idPlanta: "planta 4", idEmpresa: "empresa 4", idLinea: "linea4", fechaModificación: "23-11-2008", idStatus: "activo", modificadoPor: "des4", fechaCreacion: "09-02-2023", idCreadoPor: "4" },
    ];

    //--------------------| Valor que regresara |--------------------
    return (
        <div className="card">
            <Toolbar className="mb-4" left={BotonesCabezal} right={ExportarRegistros} />

            <DataTable
                ref={dt}
                // value={products}
                value={maquinasFicticios}
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
                globalFilterFields={["id", "calle", "num_ext", "fecha_creacion", "fecha_modificacion", "creado_por", "modificado_por"]}
                emptyMessage="No se encontraron resultados."
                header={header}
                responsiveLayout="scroll"
            >
                {/* // CAMBIAR.............. */}
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} exportable={false} />
                <Column field="id" header="ID" sortable style={{ minWidth: "12rem", textAlign: "center" }} />
                <Column field="nombreMaquina" header="Maquina" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="fechaCreacion" header="Fecha de Creacion" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="fechaModificación" header="Fecha de Modificación" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="idCreadoPor" header="Creado por" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="modificadoPor" header="Modificado por " sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="idLinea" header="ID Linea" sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="idPlanta" header="ID Planta " sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="idEmpresa" header="ID Empresa " sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column field="idStatus" header="ID Status " sortable style={{ minWidth: "16rem", textAlign: "center" }} />
                <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ minWidth: "3rem" }} />
            </DataTable>
        </div>
    );
};

export default TablaMaquinas;
