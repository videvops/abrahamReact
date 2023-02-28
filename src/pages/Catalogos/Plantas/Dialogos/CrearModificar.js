import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import useBotones from "../../../../components/hooks/useBotones";
import { MensajeAdvertencia, TextoAdvertencia } from "../../../../components/mensajes/Mensajes"

const CrearModificar = ({ productDialog, titulos, hideDialog, product, updateField, saveProduct }) => {
    //--------------------| Validar campos  |--------------------
    const [validarNombre, setValidarNombre] = useState("")
    const [envioIncorrecto, setEnvioIncorrecto] = useState(false)
    const [nombreIncorrecto, setNombreIncorrecto] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [texto, setTexto] = useState('')
    const expresion=/^[a-zA-Z0-9._-\s]{1,40}$/;                       // Todo menos ','

    const Verificar = (texto) => {
        if (!expresion.test(texto)) {
            setValidarNombre("p-invalid")
            setTexto('Campo no valido')
            setNombreIncorrecto(true)
        } else {
            setTexto('')
            setValidarNombre("")
            setNombreIncorrecto(false)
        }
    };
    const enviarDatos = () => {
        if (!product.planta) {
            setEnvioIncorrecto(true)
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setEnvioIncorrecto(false)
            }, 3000)
            return
        }
        if (nombreIncorrecto) {
            setEnvioIncorrecto(true)
            setMensaje("El nombre no es valido")
            setTimeout(() => {
                setEnvioIncorrecto(false)
            }, 3000)
            return
        }
        console.log("datos enviados")
        saveProduct()
        hideDialog()
    }
    //------> Botones para crear registro
    // const crearRegistro = productDialogFooter(hideDialog, saveProduct, boton, product, setBoton);
    const [botonesAccion] = useBotones(
        "Cancelar", "pi pi-times", "p-button-rounded", hideDialog,
        "Guardar", "pi pi-check", "p-button-rounded", enviarDatos
    )

    //--------------------| Valor que regresara  |--------------------
    return (
        <Dialog
            style={{ width: "450px" }} modal className="p-fluid"
            header={titulos.VentanaCrear}
            visible={productDialog} footer={botonesAccion} onHide={hideDialog}
        >
            <div className="field">
                <label htmlFor="nombrePlanta">Planta</label>
                <InputText
                    id="planta"
                    value={product.planta}
                    onChange={(e) => {
                        updateField(e.target.value, "planta");
                        Verificar(e.target.value);
                    }}
                    required
                    autoFocus
                    className={validarNombre}
                    maxLength="30"
                />
                {validarNombre && <TextoAdvertencia>{texto}</TextoAdvertencia>}
                {envioIncorrecto && <MensajeAdvertencia>{mensaje}</MensajeAdvertencia>}
            </div>
        </Dialog>
    );
};

export default CrearModificar;
