import React, { useState, useEffect, useRef, useContext } from 'react';
import TablaUsuarios from './Tabla/TablaUsuarios';
import Exportar from './Botones/Exportar';
import EliminarUno from './Dialogos/EliminarUno';
import EliminarVarios from './Dialogos/EliminarVarios';
import CrearModificar from './Dialogos/CrearModificar';
import { leftToolbarTemplate } from '../ComponentsCat/Botones/AgregarEliminar'
import { LineaService } from '../../../service/LineaService';
import { usuarioVacio } from './Objetos/UsuarioVacio';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import Spinner from '../../../components/loader/Spinner';
import ErrorSistema from '../../../components/error/ErrorSistema';

const CrudUsuarios = ({titulos, notificaciones}) => {
//--------------------| Importacion de metodos axios |--------------------
    const lineaService = new LineaService();
    const [products, setProducts] = useState([]);
    //--------------------| Funciones de Crud |--------------------
    //--> Crear nuevo producto
    const createProduct = (product) => {
        lineaService.create(product).
            then(() => lineaService.readAll().then(res => setProducts(res))).
            catch(e => console.log(e))
    }
    //--> Actualizar producto
    const updateProduct = (product) => {
        lineaService.update(product).
            then(() => lineaService.readAll().then(res => setProducts(res))).
            catch(e => console.log(e))
    }
    //--> Eliminar producto
    const deleteProduct = (id) => {
        lineaService.delete(id).
            then(() => lineaService.readAll().then(res => setProducts(res)).
                catch(e => console.log(e)))
    }

//--------------------| Uso de estados |--------------------
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(usuarioVacio);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [tieneId, setTieneId] = useState(false)
    const [validarNombre, setValidarNombre] = useState("");                
    const [boton, setBoton] = useState(false);

    const toast = useRef(null);
    const dt = useRef(null);

//--------------------| Funciones para mostrar dialogos |--------------------
    //------> Nuevo gasto
    const openNew = () => {
        setProduct(usuarioVacio);
        setProductDialog(true);
        setValidarNombre("")
        setBoton(false)
    }
    //------> Ocultar dialogo crear
    const hideDialog = () => { setProductDialog(false) }
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
    };
    //------> Agregar nuevo registro
    const saveProduct = async() => {
        if (!product.id) {
            createProduct(product);
            toast.current.show({ severity: 'success', summary: 'Atencion!', detail: `${notificaciones.creacion}`, life: 3000 });
        } else {
            updateProduct(product);
            toast.current.show({ severity: 'success', summary: 'Atencion!', detail: `${notificaciones.modificacion}`, life: 3000 });
        }
        setProduct(usuarioVacio);
        const data = await lineaService.readAll()
        setProducts(data)
        setProductDialog(false);
    }
    //------> Eliminar 1 producto
    const _deleteProduct = () => {
        console.log("Se elimino el ID: "+product.id);
        deleteProduct(product.id);
        setProduct(usuarioVacio);
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
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)
    //---> Obtendra los datos del back-end
    useEffect(()=>{
        const cargarDatos=async()=>{
            setIsLoading(true)
            setError(null)
            try{
                const data=await lineaService.readAll()
                setProducts(data)  
            } catch(error){
                setError(error.message)
            }
            setIsLoading(false)
        }
        cargarDatos()
        return () => {                                      // Funcion de limpieza
            setProducts([])
        }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps    

    //--------------------| Abilitar o inhabilitar boton |--------------------
    useEffect(()=>{
        if(product.id){                        // Tiene existe el ID
            setTieneId(false)
        }else{                                  // Sino tiene ID
            setTieneId(true)
        }
    },[product])

    //--------------------| Valor que regresara |--------------------
    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            {!isLoading && !error && (
            <TablaUsuarios
                BotonesCabezal={BotonesCabezal} 
                ExportarRegistros={ExportarRegistros} 
                dt={dt} 
                products={products} 
                selectedProducts={selectedProducts} 
                setSelectedProducts={setSelectedProducts} 
                actionBodyTemplate={actionBodyTemplate} 
            />)}
            {isLoading && <Spinner />}
            {error && <ErrorSistema texto={error} />}

            <CrearModificar
                productDialog={productDialog}
                titulos={titulos}
                saveProduct={saveProduct}
                hideDialog={hideDialog}
                product={product}
                updateField={updateField}
                tieneId={tieneId}
                boton={boton}
                setBoton={setBoton}
                validarNombre={validarNombre}
                setValidarNombre={setValidarNombre}
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

export default CrudUsuarios;