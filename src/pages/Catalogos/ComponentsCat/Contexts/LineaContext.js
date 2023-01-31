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
        lineaService
        .create(product)
        .then((data) => setProducts([...products, data]));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        lineaService
        .update(product)
        .then((data) =>
            setProducts(
            products.map((p) => (p.id === product.id ? data : product))
            )
        );
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        lineaService
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

export default LineaContextProvider;