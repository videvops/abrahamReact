import React, { useState } from "react";
import { MaquinasService } from "../../../../service/MaquinasService";
import { ProductContext } from "./ProductContext";

const TiempoPorSKUProvider = (props) => {
    //--------------------| Importacion de metodos axios |--------------------
    const tiempoPorSKUService = new TiempoPorSKUService();

    //--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

    //--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
       console.log(product)
        // tiempoPorSKUService.create(product).then(res=>tiempoPorSKUService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        tiempoPorSKUService.update(product).then(res=>tiempoPorSKUService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    }
    //------> Eliminar producto
    const deleteProduct = (id) => {
        tiempoPorSKUService.delete(id).then(res=>tiempoPorSKUService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };

    //--------------------| Funciones de Crud |--------------------
    return (
        <ProductContext.Provider
            value={{
                createProduct,
                updateProduct,
                deleteProduct,

                products,
                setProducts,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};

export default TiempoPorSKUProvider;
