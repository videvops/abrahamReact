import React, { useState } from "react";
import { MaquinasService } from "../../../../service/MaquinasService";
import { ProductContext } from "./ProductContext";

const MaquinaProvider = (props) => {
    //--------------------| Importacion de metodos axios |--------------------
    const maquinaService = new MaquinasService();

    //--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

    //--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        maquinaService.create(product).then((data) => setProducts([...products, data]));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        maquinaService.update(product).then((data) => setProducts(products.map((p) => (p.id === product.id ? data : product))));
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        maquinaService.delete(id).then(() => setProducts(products.filter((p) => p.id !== id)));
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

export default MaquinaProvider;
