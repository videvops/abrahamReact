import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Axios from "axios";
import { productDialogFooter } from "../../ComponentsCat/Botones/CrearRegistro";
import Environment from '../../../../Environment';


const getRoute = Environment();

const CrearModificar = ({ productDialog, titulos, hideDialog, product, updateField, saveProduct }) => {

    const [validarNombre, setValidarNombre] = useState("");
    const [validarAbr, setValidarAbr] = useState(""); 
    const [boton, setBoton] = useState(false); 
    const Advertencia=(<p style={{color:"red", marginTop:"20px", textAlign:"center"}}>Campos no validos</p>); 
    const expresion = /^[a-zA-Z0-9._-\s]{1,40}$/; 
    const exprChar =  /^[a-zA-Z0-9._-\s]{1,40}$/; 

 
    const [plantasDisponibles, setPlantasDisponibles] = useState([]);
    useEffect(() => {
        Axios.get(getRoute+"/plantas/list").then((res) => setPlantasDisponibles(res.data));
    }, []);

    const [areasDisponibles, setAreasDisponibles] = useState([]);
    useEffect(() => {
        if (product.idPlanta !== undefined && product.idPlanta !== "" ) {
            Axios.get(getRoute+`/areas/planta/${product.idPlanta}`).then((res) => setAreasDisponibles(res.data));
        }
    }, [product.idPlanta]);

    const [lineasDisponibles, setLineasDisponibles] = useState([]);
    useEffect(() => {
        if (product.idArea !== undefined && product.idArea !== "") {
            Axios.get(getRoute+`/lineas/area/${product.idArea}`).then((res) => setLineasDisponibles(res.data));
        }
    }, [product.idArea]);

    const [maquinasDisponibles, setMaquinasDisponibles] = useState([]);
    useEffect(() => {
        if (product.idLinea !== undefined  && product.idLinea !== "") {
            Axios.post(getRoute+`/maquinas/linea/${product.idLinea}`,).then((res) => setMaquinasDisponibles(res.data));
        }
    }, [product.idLinea]);



    const VerificarAbr = (texto) => {
        if (!exprChar.test(texto) || Object.values(texto).includes(" ")) {
            setValidarAbr("p-invalid");
            setBoton(true);
        } else {
            setValidarAbr("");
            setBoton(false);
        }
    };
    const Verificar = (texto) => {
        if (!expresion.test(texto) || Object.values(texto).includes(" ")) {
            setValidarNombre("p-invalid");
            setBoton(true);
        } else {
            setValidarNombre("");
            setBoton(false);
        }
    };

    const crearRegistro = productDialogFooter(hideDialog, saveProduct, boton, product, setBoton);

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
                        setBoton(false);
                    }}
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
                    onChange={(e) => {
                        updateField(e.value, "idArea");
                        setBoton(false);
                    }}
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
                    onChange={(e) => {
                        updateField(e.value, "idLinea");
                        setBoton(false);
                    }}
                    placeholder="--Selecciona una linea--"
                />
            </div>
            <div className="field">
                <label>Maquinas</label>
                <Dropdown
                    optionLabel="maquina"
                    optionValue="id"
                    value={product.idMaquina}
                    options={maquinasDisponibles}
                    onChange={(e) => {
                        updateField(e.value, "idMaquina");
                        setBoton(false);
                    }}
                    placeholder="--Selecciona una Maquina--"
                />
            </div>
            <div className="field">
                <label htmlFor="variable">                    
                    Variable
                </label>
                <InputText
                    id="variable" 
                    value={product.variable} 
                    onChange={(e) => {
                        updateField(e.target.value, "variable"); 
                        Verificar(e.target.value);
                    }}
                    required
                    autoFocus
                    className={validarNombre}
                    maxLength="40"
                />
            </div>            
            <div className="field">
                <label htmlFor="unidad">                    
                    Unidad
                </label>
                <InputText
                    id="unidad" 
                    value={product.unidad} 
                    onChange={(e) => {
                        updateField(e.target.value.trim(), "unidad"); 
                        VerificarAbr(e.target.value);
                    }}
                    required
                    autoFocus
                    className={validarAbr}
                    maxLength="10"
                />
                {boton && Advertencia}
            </div>
        </Dialog>
    );
};

export default CrearModificar;
