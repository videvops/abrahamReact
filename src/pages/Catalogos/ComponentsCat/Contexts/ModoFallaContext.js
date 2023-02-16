import React, { useState } from "react";
import { ModoFallaService } from "../../../../service/ModoFallaService";
import { ProductContext } from "./ProductContext";

const ModoFallaProvider = (props) => {
    //--------------------| Importacion de metodos axios |--------------------
    const modofallaService = new ModoFallaService();

    //--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

    //--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        modofallaService.create(product).then((res) => modofallaService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        modofallaService.update(product).then((res) => modofallaService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        modofallaService.delete(id).then(() => modofallaService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
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

export default ModoFallaProvider;
