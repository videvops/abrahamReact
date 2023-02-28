import React, { useState, useEffect, useRef, useContext } from 'react';
import Axios from 'axios';

import Crear from './Dialogos/Crear';
import Spinner from '../../../components/loader/Spinner';
import Exportar from './Botones/Exportar';
import TablaProducto from './Tabla/TablaProducto';
import EliminarUno from './Dialogos/EliminarUno';
import EliminarVarios from './Dialogos/EliminarVarios';
import { ProductContext } from '../ComponentsCat/Contexts/ProductContext';
import { leftToolbarTemplate } from '../ComponentsCat/Botones/AgregarEliminar'

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { productoVacio } from './Objetos/ProductoVacio';
import Desicion from './Dialogos/Desicion';
import Editar from './Dialogos/Editar';
import ErrorSistema from '../../../components/error/ErrorSistema'

import Environment from '../../../Environment';
const getRoute = Environment()

const CrudProducto = ({titulos, notificaciones}) => {
//--------------------| Uso de Contextos |--------------------
    const {
        deleteProduct,
        products,
        setProducts
    }=useContext(ProductContext);

    const edicionVacio = { idProducto: null, producto: "", lineasAsignadas: null }
//--------------------| Variables |--------------------
    //---> Objetos
    const [edicion, setEdicion] = useState(edicionVacio)        // Informacion para actualizar
    const [product, setProduct] = useState(productoVacio)
    //---> Modales
    const [productDialog, setProductDialog] = useState(false)
    const [deleteProductDialog, setDeleteProductDialog] = useState(false)
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState(null)
    //---> Para editar registro
    const [modalDesicion, setModalDesicion] = useState(false)       // Pregunta al usuario
    const [modalEditar, setModalEditar] = useState(false)           // Editar registro
    const [dataProducto, setDataProducto] = useState({})            // Informacion de 1 producto

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
        setEdicion(edicionVacio)
    }
    //------> Ocultar dialogo de eliminar 1 producto
    const hideDeleteProductDialog = () => { setDeleteProductDialog(false) }
    //------> Ocultar dialogo de eliminar varios productos
    const hideDeleteProductsDialog = () => { setDeleteProductsDialog(false) }
    //------> Ventana para eliminar 1 producto
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    //------> Ventana para eliminar varios productos
    const confirmDeleteSelected = () => { setDeleteProductsDialog(true) }

//--------------------| Acciones de crud |--------------------
    //------> Actualizar campo de producto
    const updateField = (data, field) => {
        setProduct({
        ...product,
        [field]: data,
        });
        // console.log(product);
    };
    const actualizarEdicion = (data, field) => {
        setEdicion({
        ...edicion,
        [field]: data,
        });
        // console.log(edicion);
    };

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

    const decision = (informacion) => {
        setModalDesicion(true)
        setDataProducto(informacion)
        // console.log(informacion)
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
                    onClick={() => decision(rowData)} 
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
            const respuesta = await Axios.post(getRoute + "/productos/filter", informacion)
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

//--------------------| Modal Creacion |--------------------
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

//--------------------| Valor que regresara |--------------------
    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            {!isLoading && !error && (
                <TablaProducto
                    dt={dt} 
                    products={products} 
                    cargarDatos={cargarDatos}
                    //--> paginacion
                    first={first}
                    filas={filas}
                    pagina={pagina}
                    setFirst={setFirst}
                    setPagina={setPagina}
                    paginacion={paginacion}
                    totalRegistros={totalRegistros}
                    //--> Acciones de tabla
                    BotonesCabezal={BotonesCabezal} 
                    selectedProducts={selectedProducts} 
                    ExportarRegistros={ExportarRegistros} 
                    actionBodyTemplate={actionBodyTemplate}
                    setSelectedProducts={setSelectedProducts} 
                    titulo={titulos.TituloTabla}
                />
            )}

            {isLoading && <Spinner />}
            {error && <ErrorSistema texto={error}/>}

            <Crear
                m1={m1}
                m2={m2}
                product={product}
                titulos={titulos}
                edicion={edicion}
                mostrarM1={mostrarM1}
                mostrarM2={mostrarM2}
                hideDialog={hideDialog}
                updateField={updateField}
                objetoParte2={objetoParte2}
                productDialog={productDialog}
                setObjetoParte2={setObjetoParte2} />

            <Desicion
                openNew={openNew}
                setEdicion={setEdicion}
                dataProducto={dataProducto}
                modalDesicion={modalDesicion}
                setModalEditar={setModalEditar}
                setModalDesicion={setModalDesicion} />

            <Editar
                edicion={edicion}
                setEdicion={setEdicion}
                modalEditar={modalEditar}
                edicionVacio={edicionVacio}
                setModalEditar={setModalEditar}
                actualizarEdicion={actualizarEdicion} />

            <EliminarUno
                product={product}
                _deleteProduct={_deleteProduct}
                deleteProductDialog={deleteProductDialog} 
                hideDeleteProductDialog={hideDeleteProductDialog} />

            <EliminarVarios 
                product={product}
                deleteProductsDialog={deleteProductsDialog}
                deleteSelectedProducts={deleteSelectedProducts}
                hideDeleteProductsDialog={hideDeleteProductsDialog} />
        </div>
    );
}

export default CrudProducto