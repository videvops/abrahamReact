import React from "react";
import { Button } from 'primereact/button';

export const productDialogFooter = (hideDialog, saveProduct, boton, product) => {
    const enviarDatos = () => {
        if (Object.values(product).includes("")) {
            console.log("esta vacio")
            return
        }
        saveProduct()
    }
//-------------------------| Valor que regresara |-------------------------
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
            onClick={enviarDatos} 
            disabled={boton}/>
        </React.Fragment>
    );
}