import React from "react";
import { Button } from 'primereact/button';

export const productDialogFooter =(hideDialog,saveProduct,boton) => {
    return(
        <React.Fragment>
            <Button 
            label="Cancelar" 
            icon="pi pi-times" 
            className="p-button-text" 
            onClick={hideDialog} 
            />
            <Button 
            label="Guardar" 
            icon="pi pi-check" 
            className="p-button-text" 
            onClick={saveProduct} 
            disabled={boton}/>
        </React.Fragment>
    );
}