import React, { useState } from "react";
import { AreaService } from "../../../../service/AreaService";
import { ProductContext } from "./ProductContext";

const AreaContextProvider = (props) => {
    //--------------------| Importacion de metodos axios |--------------------
    const areaService = new AreaService();

    //--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState([]);

    //--------------------| Funciones de Crud |--------------------
    //------> Crear nuevo producto
    const createProduct = (product) => {
        areaService.create(product).then((data) => setProducts([...products, data]));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        areaService.update(product).then((data) => setProducts(products.map((p) => (p.id === product.id ? data : product))));
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        areaService.delete(id).then(() => setProducts(products.filter((p) => p.id !== id)));
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

export default AreaContextProvider;
