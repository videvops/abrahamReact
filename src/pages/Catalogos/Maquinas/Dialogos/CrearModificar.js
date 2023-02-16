import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Axios from "axios";
import { productDialogFooter } from "../../ComponentsCat/Botones/CrearRegistro";
import Environment from '../../../../Environment';


const getRoute = Environment();

const CrearModificar = ({ productDialog, titulos, hideDialog, product, updateField, saveProduct }) => {
    //--------------------| Validar campos  |--------------------
    const [validarNombre, setValidarNombre] = useState(""); // Validar nombre de planta
    const [boton, setBoton] = useState(false); // Activar o desactivar boton
    const Advertencia=(<p style={{color:"red", marginTop:"20px", textAlign:"center"}}>Campos no validos</p>); 
    const expresion = /^[a-zA-Z0-9._-\s]{1,40}$/; // Todo menos ','
    

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



    const Verificar = (texto) => {
        if (!expresion.test(texto) || Object.values(texto).includes(" ")) {
            setValidarNombre("p-invalid");
            setBoton(true);
        } else {
            setValidarNombre("");
            setBoton(false);
        }
    };
    //--------------------| Botones de confirmacion |--------------------
    //------> Botones para crear registro
    const crearRegistro = productDialogFooter(hideDialog, saveProduct, boton, product, setBoton);


    //--------------------| Valor que regresara  |--------------------
    return (
        <Dialog visible={productDialog} style={{ width: "450px" }} header={titulos.VentanaCrear} modal className="p-fluid" footer={crearRegistro} onHide={hideDialog}>
            <div className="field">
                <label>Planta</label>
                <Dropdown
                    optionLabel="planta"
                    optionValue="id"
                    value={product.idPlanta}
                    options={plantasDisponibles}
                    onChange={(e) => {
                        updateField(e.value, "idPlanta");
                    }}
                    placeholder="--Selecciona una planta--"
                />
            </div>
            {/* Dropdown areas */}
            <div className="field">
                <label>Area</label>
                <Dropdown
                    optionLabel="area"
                    optionValue="id"
                    value={product.idArea}
                    options={areasDisponibles}
                    onChange={(e) => {
                        updateField(e.value, "idArea");
                    }}
                    placeholder="--Selecciona una area--"
                />
            </div>
            {/* Dropdown Lineas */}
            <div className="field">
                <label>Linea</label>
                <Dropdown
                    optionLabel="linea"
                    optionValue="id"
                    value={product.idLinea}
                    options={lineasDisponibles}
                    onChange={(e) => {
                        updateField(e.value, "idLinea");
                    }}
                    placeholder="--Selecciona una linea--"
                />
            </div>

            <div className="field">
                <label htmlFor="nombreMaquinas">                    
                    Maquina
                </label>
                <InputText
                    id="maquina" // CAMBIAR...
                    value={product.maquina} // CAMBIAR...
                    onChange={(e) => {
                        updateField(e.target.value.trim(), "maquina"); // CAMBIAR...
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
