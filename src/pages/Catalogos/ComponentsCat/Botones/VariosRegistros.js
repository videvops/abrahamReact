import React from "react";
import { Button } from 'primereact/button';

export const deleteProductsDialogFooter =(hideDeleteProductsDialog,deleteSelectedProducts)=>{
    return(
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
        <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
    </React.Fragment>
    );
}