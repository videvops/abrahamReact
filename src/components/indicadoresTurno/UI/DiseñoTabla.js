import React from "react";
import { DataTable } from "primereact/datatable";

const TablaDesing = ({ datos, children }) => {
//--------------------| Valor que regresara |--------------------
    return(
        <DataTable
            value={datos} 
            responsiveLayout="scroll" 
            style={{ fontSize: "20px", textAlign: "center" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Registros de {first} a {last} de {totalRecords} registros"
        >
            {children}
        </DataTable>
    );
}

export default TablaDesing;