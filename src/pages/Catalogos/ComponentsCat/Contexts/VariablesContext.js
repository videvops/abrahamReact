import React, { useState } from "react";
import { VariablesService } from "../../../../service/VariablesService";
import { ProductContext } from "./ProductContext";

const VariablesProvider = (props) => {
    //--------------------| Importacion de metodos axios |--------------------
    const variablesService = new VariablesService();

    //--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

    //--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        console.log("Creando")
        //variablesService.create(product).then(res=>variablesService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        console.log("actualizando")
        // variablesService.update(product).then(res=>variablesService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    }
    //------> Eliminar producto
    const deleteProduct = (id) => {
        console.log("borrando")
        // variablesService.delete(id).then(res=>variablesService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
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

export default VariablesProvider;