import React from "react";
import { Button } from 'primereact/button';

export const deleteProductDialogFooter =(hideDeleteProductDialog,_deleteProduct)=>{
    return(
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={_deleteProduct} />
        </React.Fragment>
    );
}