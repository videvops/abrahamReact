import React, { useState } from "react";
import { DireccionService } from "../../../../service/DireccionService";
import { ProductContext } from "./ProductContext";

const DireccionContextProvider=(props)=>{
//--------------------| Importacion de metodos axios |--------------------
    const direccionService = new DireccionService();

//--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

//--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        direccionService
        .create(product)
        .then((data) => setProducts([...products, data]));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        direccionService
        .update(product)
        .then((data) =>
            setProducts(
            products.map((p) => (p.id === product.id ? data : product))
            )
        );
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        direccionService
        .delete(id)
        .then(() => setProducts(products.filter((p) => p.id !== id)));
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

export default DireccionContextProvider;