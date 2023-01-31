import React, { useState } from "react";
import { UsuarioService } from "../../../../service/UsuarioService";
import { ProductContext } from "./ProductContext";

const UsuarioContextProvider=(props)=>{
//--------------------| Importacion de metodos axios |--------------------
    const usuarioService = new UsuarioService();

//--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

//--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        usuarioService
        .create(product)
        .then((data) => setProducts([...products, data]));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        usuarioService
        .update(product)
        .then((data) =>
            setProducts(
            products.map((p) => (p.id === product.id ? data : product))
            )
        );
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        usuarioService
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

export default UsuarioContextProvider;