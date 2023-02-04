import React, { useState, useEffect, useRef, useContext } from 'react';
import Axios from 'axios';
//CAMBIAR...
import Spinner from '../../../components/loader/Spinner';
import Exportar from './Botones/Exportar';
import TablaProducto from './Tabla/TablaProducto';
import EliminarUno from './Dialogos/EliminarUno';
import EliminarVarios from './Dialogos/EliminarVarios';
import CrearModificar from './Dialogos/CrearModificar';
import { leftToolbarTemplate } from '../ComponentsCat/Botones/AgregarEliminar'
import { ProductContext } from '../ComponentsCat/Contexts/ProductContext';
//CAMBIAR...
import { productoVacio } from './Objetos/ProductoVacio';


import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';


const CrudProducto = ({titulos, notificaciones}) => {
//--------------------| Uso de Contextos |--------------------
    const {
        // createProduct,
        // updateProduct,
        deleteProduct,

        products,
        setProducts
    }=useContext(ProductContext);

//--------------------| Uso de estados |--------------------
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(productoVacio);
    const [selectedProducts, setSelectedProducts] = useState(null);
    
    const toast = useRef(null);
    const dt = useRef(null);

//--------------------| Funciones para mostrar dialogos |--------------------
    //------> Nuevo gasto
    const openNew = () => {
        setProduct(productoVacio);
        setProductDialog(true);
        setObjetoParte2([])
    }
    //------> Ocultar dialogo de crear
    const hideDialog = () => {
        setProductDialog(false);
        mostrarM1()
    }
    //------> Ocultar dialogo de eliminar 1 producto
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }
    //------> Ocultar dialogo de eliminar varios productos
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    //------> Ventana para eliminar 1 producto
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    //------> Ventana para eliminar varios productos
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

//--------------------| Acciones de crud |--------------------
    //------> Actualizar campo de producto
    const updateField = (data, field) => {
        setProduct({
        ...product,
        [field]: data,
        });
        console.log(product);
    };
    //------> Agregar nuevo registro
    // const saveProduct = () => {
    //     console.log("[+]ID: " + product.id);
    //     if (!product.id) {
    //         createProduct(product);
    //         toast.current.show({ severity: 'success', summary: 'Atencion!', detail: `${notificaciones.creacion}`, life: 3000 });
    //     } else {
    //         updateProduct(product);
    //         toast.current.show({ severity: 'success', summary: 'Atencion!', detail: `${notificaciones.modificacion}`, life: 3000 });
    //     }
    //     setProduct(productoVacio);
    //     setProductDialog(false);
    // }
    //------> Eliminar 1 producto
    const _deleteProduct = () => {
        console.log("Se elimino el ID: "+product.id);
        deleteProduct(product.id);
        setProduct(productoVacio);
        toast.current.show({ severity: 'error', summary: 'Atencion!', detail: `${notificaciones.eliminacion}`, life: 3000 });
        setDeleteProductDialog(false);
    }
    //------> Eliminar varios productos
    const deleteSelectedProducts = () => {
        selectedProducts.map( producto => {
            console.log("Se elimino el ID: " + producto.id)
            return deleteProduct(producto.id)
        })
        setDeleteProductsDialog(false);                                         // Ocultara dialogo
        setSelectedProducts(null);                                              // Elemetos seleccionados = 0
        toast.current.show({ severity: 'error', summary: 'Atencion!', detail: `${notificaciones.eliminaciones}`, life: 3000 });
    }
    //------> Editar producto
    const _editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    }

//--------------------| Botones en pantalla |--------------------
    //------> Botones para agregar/eliminar productos
    const BotonesCabezal=leftToolbarTemplate(openNew, confirmDeleteSelected, selectedProducts);

    //------> Boton para exportar
    const ExportarRegistros=Exportar(products);

    //------> Botones parte derecha
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-success mr-2" 
                    onClick={() => _editProduct(rowData)} 
                />
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-warning" 
                    onClick={() => confirmDeleteProduct(rowData)} 
                />
            </>
        );
    }

//--------------------| Obtener registros de back-end |--------------------
    const [pagina, setPagina] = useState(0)
    const [first, setFirst] = useState(0)
    const [filas, setFilas] = useState(5)
    const [totalRegistros, setTotalRegistros] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    //---> Obtendra los datos del back-end
    const paginacion = (event) => {
        setFirst(event.first)
        setFilas(event.rows)
        setPagina(event.page)
    }

    const cargarDatos = async (datos) => {
        const informacion = datos
        setIsLoading(true)
        setError(null)
        try{
            const respuesta = await Axios.post("http://localhost:8080/productos/filter", informacion)
            const datos = await respuesta.data.registros
            const total = await respuesta.data.numTotalReg
            setProducts(datos)  
            setTotalRegistros(total)
        } catch(error){
            setError(error.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        cargarDatos({ page: pagina, total: filas })
        return () => {                                      // Funcion de limpieza
            setProducts([])
        }// eslint-disable-next-line
    }, [filas]);

//--------------------| Modal |--------------------
    const [m1, setM1] = useState(true)
    const [m2, setM2] = useState(false)
    const [objetoParte2, setObjetoParte2] = useState([])

    //---> Funciones mostrar y ocultar
    const mostrarM1 = () => {
        setM1(true)
        setM2(false)
    }
    const mostrarM2 = () => {
        setM1(false)
        setM2(true)
    }

//--------------------| Validar ID |--------------------
    const [tieneID, setTieneID] = useState(false)
    useEffect(() => { 
        if (product.id) {
            setTieneID(true)
        } else {
            setTieneID(false)
        }
    }, [product.id])

//--------------------| Valor que regresara |--------------------
    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            {!isLoading && !error && (
                <TablaProducto
                    BotonesCabezal={BotonesCabezal} 
                    ExportarRegistros={ExportarRegistros} 
                    dt={dt} 
                    products={products} 
                    selectedProducts={selectedProducts} 
                    setSelectedProducts={setSelectedProducts} 
                    actionBodyTemplate={actionBodyTemplate}
                    paginacion={paginacion}
                    first={first}
                    setFirst={setFirst}
                    filas={filas}
                    pagina={pagina}
                    setPagina={setPagina}
                    totalRegistros={totalRegistros}
                    titulo={titulos.TituloTabla}
                    cargarDatos={cargarDatos}
                />)}

            {isLoading&&<Spinner/>}
            {error&&<p className='uppercase font-bold text-center'>{error}</p>}

            <CrearModificar
                titulos={titulos}
                productDialog={productDialog}
                hideDialog={hideDialog}
                updateField={updateField}
                product={product}
                m1={m1}
                m2={m2}
                mostrarM1={mostrarM1}
                mostrarM2={mostrarM2}
                objetoParte2={objetoParte2}
                setObjetoParte2={setObjetoParte2}
                tieneID={tieneID}
            />

            <EliminarUno
                deleteProductDialog={deleteProductDialog} 
                _deleteProduct={_deleteProduct}
                hideDeleteProductDialog={hideDeleteProductDialog} 
                product={product}
            />

            <EliminarVarios 
                deleteProductsDialog={deleteProductsDialog}
                deleteSelectedProducts={deleteSelectedProducts}
                hideDeleteProductsDialog={hideDeleteProductsDialog}
                product={product}
            />
        </div>
    );
}

export default CrudProducto