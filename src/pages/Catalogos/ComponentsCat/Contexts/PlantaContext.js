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
        plantaService.create(product).then(res => plantaService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    };
    //------> Actualizar producto
    const updateProduct = (product) => {
        plantaService.update(product).then(res =>plantaService.readAll().then(res=>setProducts(res)).catch(e=>console.log(e)));
    }
    //------> Eliminar producto
    const deleteProduct = (id) => {
        plantaService.delete(id).then( res => plantaService.readAll(res=>setProducts(res)).catch(e=>console.log(e)));
    }

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