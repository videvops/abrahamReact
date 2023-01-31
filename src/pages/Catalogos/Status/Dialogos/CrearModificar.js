import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
// import { productDialogFooter } from '../Botones/CrearRegistro';
import { productDialogFooter } from "../../ComponentsCat/Botones/CrearRegistro";

const CrearModificar = ({ productDialog, titulos, hideDialog, product, updateField, saveProduct }) => {
    //--------------------| Validar campos  |--------------------
    const [validarNombre, setValidarNombre] = useState(""); // Validar nombre de planta
    const [boton, setBoton] = useState(false); // Activar o desactivar boton
    const Advertencia = <p style={{ color: "red" }}>Campo no valido</p>; // Mensaje de advertencia
    const expresion = /^[a-zA-Z0-9._-]{1,40}$/; // Solo nombres y numeros

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
    const crearRegistro = productDialogFooter(hideDialog, saveProduct, boton);

    //--------------------| Valor que regresara  |--------------------
    return (
        <Dialog visible={productDialog} style={{ width: "450px" }} header={titulos.VentanaCrear} modal className="p-fluid" footer={crearRegistro} onHide={hideDialog}>
            <div className="field">
                {/* CAMBIAR.... */}
                <label
                    htmlFor="nombreModoFalla" // CAMBIAR...
                >
                    Status
                </label>
                <InputText
                    id="nombreStatus" // CAMBIAR...
                    value={product.nombreStatus} // CAMBIAR...
                    onChange={(e) => {
                        updateField(e.target.value.trim(), "nombreStatus"); // CAMBIAR...
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
