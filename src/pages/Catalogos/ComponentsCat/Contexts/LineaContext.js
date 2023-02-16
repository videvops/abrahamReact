import React, { useState } from "react";
import { LineaService } from "../../../../service/LineaService";
import { ProductContext } from "./ProductContext";

const LineaContextProvider=(props)=>{
//--------------------| Importacion de metodos axios |--------------------
    const lineaService = new LineaService();

//--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

//--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        lineaService.create(product).then(res => lineaService.readAll().then(res=>setProducts(res))).catch(e=>console.log(e));
    }
    //------> Actualizar producto
    const updateProduct = (product) => {
        lineaService.update(product).then(res => lineaService.readAll().then(res =>setProducts(res))).catch(e=>console.log(e));
    }
    //------> Eliminar producto
    const deleteProduct = (id) => {
        lineaService.delete(id).then(res=>lineaService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    }
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

export default LineaContextProvider;