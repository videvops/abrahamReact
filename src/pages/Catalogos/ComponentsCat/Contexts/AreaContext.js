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
        areaService.create(product).then( data =>areaService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        areaService.update(product).then(data => areaService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };
    //------> Eliminar producto
    const deleteProduct = (id) => {
        areaService.delete(id).then(data => areaService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
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
