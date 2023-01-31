import React, { useState } from "react";
import { StatusService } from "../../../../service/StatusService";
import { ProductContext } from "./ProductContext";

const StatusProvider = (props) => {
    //--------------------| Importacion de metodos axios |--------------------
    const statusService = new StatusService();

    //--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

    //--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        statusService.create(product).then((data) => setProducts([...products, data]));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        statusService.update(product).then((data) => setProducts(products.map((p) => (p.id === product.id ? data : product))));
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        statusService.delete(id).then(() => setProducts(products.filter((p) => p.id !== id)));
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

export default StatusProvider;
