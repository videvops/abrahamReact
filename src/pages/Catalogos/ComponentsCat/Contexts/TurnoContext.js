import React, { useState } from "react";
import { TurnoService } from "../../../../service/TurnoService";
import { ProductContext } from "./ProductContext";

const TurnoContextProvider=(props)=>{
//--------------------| Importacion de metodos axios |--------------------
    const turnoService = new TurnoService();
//--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);
//--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        console.log(product)
        turnoService.create(product).then(res =>turnoService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        turnoService.update(product).then(res => turnoService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        turnoService.delete(id).then(res => turnoService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };

//--------------------| Funciones de Crud |--------------------
    return(
        <ProductContext.Provider
        value={{
            createProduct,
            updateProduct,
            deleteProduct,

            products,
            setProducts
        }}
        >
            {props.children}
        </ProductContext.Provider>
    );
}

export default TurnoContextProvider