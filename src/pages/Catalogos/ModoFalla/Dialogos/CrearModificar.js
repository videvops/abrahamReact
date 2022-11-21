import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { productDialogFooter } from "../../ComponentsCat/Botones/CrearRegistro";
import {PlantaService} from "../../../../service/PlantaService";
import { compareNumbers } from "@fullcalendar/core";

const CrearModificar = ({ productDialog, titulos, hideDialog, product, updateField, saveProduct }) => {
    const plantaService = new PlantaService ();
    //--------------------| Validar campos  |--------------------
    const [validarNombre, setValidarNombre] = useState(""); // Validar nombre de planta
    const [boton, setBoton] = useState(false); // Activar o desactivar boton
    const Advertencia = <p style={{ color: "red" }}>Campo no valido</p>; // Mensaje de advertencia
    const expresion = /^[a-zA-Z0-9._-\s]{1,40}$/; // Solo nombres y numeros

    const [plantasDisponibles, setPlantasDisponibles] = useState([]);
    useEffect(()=>{
        plantaService.readAll().then(res=>setPlantasDisponibles(res)).catch(e=>console.log(e))
    },[])

    const Verificar = (texto) => {
        if (!expresion.test(texto)) {
            setValidarNombre("p-invalid");
            setBoton(true);
        } else {
            setValidarNombre("");
            setBoton(false);
        }
    };
    
    //--------------------| Botones de confirmacion |--------------------
    //------> Botones para crear registro
    const crearRegistro = productDialogFooter(hideDialog, saveProduct, boton, product,setBoton);

    //--------------------| Valor que regresara  |--------------------
    return (
        <Dialog visible={productDialog} style={{ width: "450px" }} header={titulos.VentanaCrear} modal className="p-fluid" footer={crearRegistro} onHide={hideDialog}>
            <div className="field">
                <div className="field">
                    <label>Planta</label>
                    <Dropdown 
                    optionLabel="planta" 
                    optionValue="id" 
                    value={product.idPlanta} 
                    options={plantasDisponibles} 
                    onChange={(e) => {
                        updateField(e.value, "idPlanta");
                        setBoton(false);   
                    }} 
                    placeholder="--Selecciona una planta--"
                    />
                </div>
                <label htmlFor="modoFalla">
                    Modo de Falla
                </label>
                <InputText
                    id="modoFalla"
                    value={product.modoFalla || ''}
                        onChange={(e) => {
                        updateField(e.target.value, "modoFalla"); 
                        Verificar(e.target.value);
                    }}
                    required
                    autoFocus
                    className={validarNombre}
                    maxLength="30"
                />
                {boton && Advertencia}
            </div>
        </Dialog>
    );
};

export default CrearModificar;
