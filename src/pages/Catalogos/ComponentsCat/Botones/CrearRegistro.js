import React from "react";
import { Button } from 'primereact/button';
import { compileString } from "sass";

export const productDialogFooter = (hideDialog, saveProduct, boton, product, setBoton) => {
    const enviarDatos = () => {
        if(!Object.values(product).includes("") || !Object.values(product).includes(null)){
            saveProduct();
            setBoton(false)
        }else{
            setBoton(true)
        }
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