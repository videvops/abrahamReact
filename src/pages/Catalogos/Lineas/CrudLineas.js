import React, { useState, useEffect, useRef, useContext } from 'react';
import TablaLineas from './Tabla/TablaLineas';
import Exportar from './Botones/Exportar';
import EliminarUno from './Dialogos/EliminarUno';
import EliminarVarios from './Dialogos/EliminarVarios';
import CrearModificar from './Dialogos/CrearModificar';
import { leftToolbarTemplate } from '../ComponentsCat/Botones/AgregarEliminar'
import { ProductContext } from '../ComponentsCat/Contexts/ProductContext';
import { renderHeader } from '../ComponentsCat/Buscador/Cabezal';
import { LineaService } from '../../../service/LineaService';
import { emptyProduct } from './Objetos/ProductoVacio';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import Spinner from '../../../components/loader/Spinner';
import ErrorSistema from '../../../components/error/ErrorSistema';

const CrudLineas = ({titulos, notificaciones}) => {
//--------------------| Importacion de metodos axios |--------------------
    const lineaService = new LineaService();

//--------------------| Uso de Contextos |--------------------
    const {
        createProduct,
        updateProduct,
        deleteProduct,

        products,
        setProducts
    }=useContext(ProductContext);

//--------------------| Uso de estados |--------------------
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [tieneId, setTieneId] = useState(false)
    const [validarNombre, setValidarNombre] = useState("");                
    const [boton, setBoton] = useState(false);

    // CAMBIAR...
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'id': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'linea': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'area': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const toast = useRef(null);
    const dt = useRef(null);

//--------------------| Barra de Buscar |--------------------
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilter(value);
    }
    //------> Cabezal de buscador
    const header=renderHeader(globalFilter,onGlobalFilterChange,titulos.Buscador,titulos.TituloTabla)

//--------------------| Funciones para mostrar dialogos |--------------------
    //------> Nuevo gasto
    const openNew = () => {
        setProduct(emptyProduct);
        setProductDialog(true);
        setValidarNombre("")
        setBoton(false)
    }
    //------> 
    const hideDialog = () => {
        setProductDialog(false);
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
        setProduct(emptyProduct);
        const data = await lineaService.readAll()
        setProducts(data)
        setProductDialog(false);
    }
    //------> Eliminar 1 producto
    const _deleteProduct = () => {
        console.log("Se elimino el ID: "+product.id);
        deleteProduct(product.id);
        setProduct(emptyProduct);
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
            <React.Fragment>
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
            </React.Fragment>
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
            <TablaLineas
                BotonesCabezal={BotonesCabezal} 
                ExportarRegistros={ExportarRegistros} 
                dt={dt} 
                products={products} 
                selectedProducts={selectedProducts} 
                filters={filters} 
                setSelectedProducts={setSelectedProducts} 
                header={header}
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

export default CrudLineas;