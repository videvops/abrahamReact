import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import Axios from "axios";
import { productDialogFooter } from "../../ComponentsCat/Botones/CrearRegistro";
import Environment from '../../../../Environment';
import { Calendar } from "primereact/calendar";
import {formatearFecha} from "../../../../components/helpers/funciones"

const CrearModificar = ({ productDialog, titulos, hideDialog, product, updateField, saveProduct }) => {
    const getRoute = Environment();
    const [boton, setBoton] = useState(false); 
    const Advertencia=(<p style={{color:"red", marginTop:"20px", textAlign:"center"}}>Campos no validos</p>); 
    
    const [plantasDisponibles, setPlantasDisponibles] = useState([]);
    useEffect(() => {
        Axios.get(getRoute+"/plantas/list").then((res) => setPlantasDisponibles(res.data));
    }, []);
    
    const [areasDisponibles, setAreasDisponibles] = useState([]);
    useEffect(() => {
        if (product.idPlanta !== undefined) {
            Axios.get(getRoute+`/areas/planta/${product.idPlanta}`).then((res) => setAreasDisponibles(res.data));
        }
    }, [product.idPlanta]);

    const [lineasDisponibles, setLineasDisponibles] = useState([]);
    useEffect(() => {
        if (product.idArea !== undefined) {
            Axios.get(getRoute+`/lineas/area/${product.idArea}`).then((res) => setLineasDisponibles(res.data));
        }
    }, [product.idArea]);

    const [productosDisponibles,setProductosDisponibles] = useState([]);
    useEffect(() => {
        if (product.idLinea !== undefined) {
            // Axios.get(getRoute+`/lineas/area/${product.idArea}`).then((res) => setLineasDisponibles(res.data));
            setProductosDisponibles([{id:1,producto:"producto 1"},{id:2,producto:"producto 2"}])
        }
    }, [product.idLinea]);
    
    const crearRegistro = productDialogFooter(hideDialog, saveProduct, boton, product, setBoton);


    return (
        <Dialog visible={productDialog} style={{ width: "450px" }} header={titulos.VentanaCrear} modal className="p-fluid" footer={crearRegistro} onHide={hideDialog}>
            <div className="field">
                <label className="font-bold">Planta</label>
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
                <label className="font-bold">Area</label>
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
                <label className="font-bold">Linea</label>
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
                <label className="font-bold">Producto</label>
                <Dropdown
                    optionLabel="producto"
                    optionValue="id"
                    value={product.idProducto}
                    options={productosDisponibles}
                    onChange={(e) => {
                        updateField(e.value, "idProducto");
                        setBoton(false);

                    }}
                    placeholder="--Selecciona un producto--"
                />
            </div>

            <div className="field">
                <label className="font-bold">Hora Inicio</label>
                <Calendar 
                    id="time24" 
                    dateFormat="yy/mm/dd" 
                    value={product.fechaIni} 
                    onChange={(e) =>{
                        setBoton(false);
                        product.fechaIni= formatearFecha(e.value);
                    }} 
                    showTime 
                    placeholder="--Fecha Inicio--" 
                />
            </div>

            <div className="field">
                <label className="font-bold">Hora Fin</label>
                <Calendar 
                    id="time24" 
                    dateFormat="yy/mm/dd" 
                    value={product.fechaFin} 
                    onChange={(e) =>{ 
                            setBoton(false);
                            product.fechaFin= formatearFecha(e.value);
                        }
                    } 
                    showTime 
                    placeholder="--Fecha Inicio--" 
                />
            </div>
            {boton && Advertencia}
        </Dialog>
    );
};

export default CrearModificar;
