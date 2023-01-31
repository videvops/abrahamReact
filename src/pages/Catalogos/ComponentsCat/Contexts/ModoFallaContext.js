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
        modofallaService.create(product).then((data) => setProducts([...products, data]));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        modofallaService.update(product).then((data) => setProducts(products.map((p) => (p.id === product.id ? data : product))));
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        modofallaService.delete(id).then(() => setProducts(products.filter((p) => p.id !== id)));
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
