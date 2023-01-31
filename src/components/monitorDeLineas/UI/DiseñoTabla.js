import React from "react";
import { DataTable } from "primereact/datatable";

const TablaDesing = ({ datos, children }) => {
//--------------------| Valor que regresara |--------------------
    return(
        <DataTable
            resizableColumns
            columnResizeMode="fit"
            size="small"
            value={datos} 
            responsiveLayout="scroll" 
            style={{ fontSize: "15px", textAlign: "center" }}
        >
            {children}
        </DataTable>
    );
}

export default TablaDesing;
