import React from "react";
import { Button } from 'primereact/button';

const Exportar = (products) => {
//--------------------| Exportar PDF |--------------------
    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable({
                    columns:[                                       // Columnas
                        { header: 'ID', dataKey: 'id' },
                        { header: 'TipoParo', dataKey: 'nombreTipoParo' },
                        { header: 'Descripcion', dataKey: 'descripcion' },
                        { header: 'Fecha de Creacion', dataKey: 'fechaCreacion'},
                    ],
                    body:products,                                  // Registros de BD
                    margin:{top:35},
                    didDrawPage:function(data){
                    doc.text("Catalogo Tipos paro", 20, 30);           // Encabezado   /   CAMBIAR...
                }})

                const fecha=new Date().getTime()                    // Fecha en tiempo real
                doc.save(`TiposParo_export_${fecha}.pdf`);            // template string
            })
        })
    }

//--------------------| Exportar Excel |--------------------
    //---> Funcion Principal
    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(products);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'TiposParo');                  // CAMBIAR...
        });
    }

    //---> Guardar datos en Excel
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });
                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }

//--------------------| Valor que regresara |--------------------
    return (
        <React.Fragment>
            <Button 
            label="Excel" 
            icon="pi pi-file-excel" 
            className="p-button-success mr-2"
            onClick={exportExcel} 
            />
        <Button 
            label="PDF" 
            icon="pi pi-file-pdf" 
            className="p-button-danger"
            onClick={exportPdf} 
            />
        </React.Fragment>
    )
}

export default Exportar;