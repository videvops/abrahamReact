import React from "react";
import { Button } from 'primereact/button';

export const leftToolbarTemplate = (openNew, confirmDeleteSelected, selectedProducts) => {
    return (
        <React.Fragment>
            <Button 
            label="Nuevo" 
            icon="pi pi-plus" 
            className="p-button-success mr-2" 
            onClick={openNew} 
            />
            
            <Button 
            label="Eliminar" 
            icon="pi pi-trash" 
            className="p-button-danger" 
            onClick={confirmDeleteSelected} 
            disabled={!selectedProducts || !selectedProducts.length} 
            />
        </React.Fragment>
    )
}