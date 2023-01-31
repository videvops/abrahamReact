import React, { useState } from "react";
import { PlantaService } from "../../../../service/PlantaService";
import { ProductContext } from "./ProductContext";

const PlantaContextProvider=(props)=>{
//--------------------| Importacion de metodos axios |--------------------
    const plantaService = new PlantaService();

//--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

//--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        plantaService
        .create(product)
        .then((data) => setProducts([...products, data]));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        plantaService
        .update(product)
        .then((data) =>
            setProducts(
            products.map((p) => (p.id === product.id ? data : product))
            )
        );
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        plantaService
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

export default PlantaContextProvider;