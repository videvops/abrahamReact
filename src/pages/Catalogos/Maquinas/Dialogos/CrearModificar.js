import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Axios from "axios";
// import { productDialogFooter } from "../../ComponentsCat/Botones/CrearRegistro";
import { MensajeAdvertencia, TextoAdvertencia } from "../../../../components/mensajes/Mensajes";
import Environment from '../../../../Environment';
import useBotones from "../../../../components/hooks/useBotones";


const getRoute = Environment();

const CrearModificar = ({ productDialog, titulos, hideDialog, product, updateField, saveProduct }) => {
    //--------------------| Validar campos  |--------------------
    const [validarNombre, setValidarNombre] = useState("")
    const [envioIncorrecto, setEnvioIncorrecto] = useState(false)
    const [nombreIncorrecto, setNombreIncorrecto] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [texto, setTexto] = useState('')
    const expresion=/^[a-zA-Z0-9._-\s]{1,40}$/;                       // Todo menos ',
    

    //--------------------| Dropdown dinamico|--------------------
    //---> Plantas
    const [plantasDisponibles, setPlantasDisponibles] = useState([]);
    useEffect(() => {
        Axios.get(getRoute+"/plantas/list").then((res) => setPlantasDisponibles(res.data));
    }, []);
    //---> Areas
    const [areasDisponibles, setAreasDisponibles] = useState([]);
    useEffect(() => {
        if (product.idPlanta !== undefined) {
            Axios.get(getRoute+`/areas/planta/${product.idPlanta}`).then((res) => setAreasDisponibles(res.data));
        }
    }, [product.idPlanta]);
    //--> Dropdown Lineas Calling rs
    const [lineasDisponibles, setLineasDisponibles] = useState([]);
    useEffect(() => {
        if (product.idArea !== undefined) {
            Axios.get(getRoute+`/lineas/area/${product.idArea}`).then((res) => setLineasDisponibles(res.data));
        }
    }, [product.idArea]);



    const VerificarNombre = (texto) => {
        if (!expresion.test(texto)) {
            setValidarNombre("p-invalid")
            setTexto('Campo no valido')
            setNombreIncorrecto(true)
        } else {
            setTexto('')
            setValidarNombre("")
            setNombreIncorrecto(false)
        }
    }
    const enviarDatos = () => {
        if ([product.idPlanta, product.idArea, product.idLinea, product.maquina].includes('')) {
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

    //--------------------| Botones de confirmacion |--------------------
    //------> Botones para crear registro
    const [botonesAccion] = useBotones(
        "Cancelar", "pi pi-times", "p-button-rounded", hideDialog,
        "Guardar", "pi pi-check", "p-button-rounded", enviarDatos
    )


    //--------------------| Valor que regresara  |--------------------
    return (
        <Dialog
            visible={productDialog} style={{ width: "450px" }}
            header={titulos.VentanaCrear} modal className="p-fluid"
            footer={botonesAccion}
            onHide={hideDialog}
        >
            <div className="field">
                <label>Planta</label>
                <Dropdown
                    optionLabel="planta"
                    optionValue="id"
                    value={product.idPlanta}
                    options={plantasDisponibles}
                    onChange={(e) => { updateField(e.value, "idPlanta") }}
                    placeholder="--Selecciona una planta--"
                />
            </div>
            <div className="field">
                <label>Area</label>
                <Dropdown
                    optionLabel="area"
                    optionValue="id"
                    value={product.idArea}
                    options={areasDisponibles}
                    onChange={(e) => { updateField(e.value, "idArea") }}
                    placeholder="--Selecciona una area--"
                />
            </div>
            <div className="field">
                <label>Linea</label>
                <Dropdown
                    optionLabel="linea"
                    optionValue="id"
                    value={product.idLinea}
                    options={lineasDisponibles}
                    onChange={(e) => { updateField(e.value, "idLinea") }}
                    placeholder="--Selecciona una linea--"
                />
            </div>

            <div className="field">
                <label htmlFor="nombreMaquinas">Maquina</label>
                <InputText
                    id="maquina" // CAMBIAR...
                    value={product.maquina} // CAMBIAR...
                    onChange={(e) => {
                        updateField(e.target.value, "maquina"); // CAMBIAR...
                        VerificarNombre(e.target.value);
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
