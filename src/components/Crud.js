import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from "../services/ProductService";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

const Crud = (props) => {
//--------------------| Importacion de metodos axios |--------------------
    const productService = new ProductService();

//--------------------| Producto vacio |--------------------
    // CAMBIAR..............
    let emptyProduct = {
        id: null,
        nombrePlanta: '',
    };

//--------------------| Uso de estados |--------------------
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    // CAMBIAR...
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'id': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'nombrePlanta': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const toast = useRef(null);
    const dt = useRef(null);

//--------------------| Obtener registros de back-end |--------------------
    useEffect(() => {
        productService.readAll().then((data) => setProducts(data));
    }, [product]); // eslint-disable-line react-hooks/exhaustive-deps

//--------------------| Barra de Buscar |--------------------
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilter(value);
    }
    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <h5 className="mx-0 my-1">{props.titulos.TituloTabla}</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder={props.titulos.Buscador} />
                </span>
            </div>
        )
    }
    const header = renderHeader();

//--------------------| Funciones de Crud |--------------------
    const createProduct = (product) => {
        productService
        .create(product)
        .then((data) => setProducts([...products, data]));
    };

    const updateProduct = (product) => {
        productService
        .update(product)
        .then((data) =>
            setProducts(
            products.map((p) => (p.id === product.id ? data : product))
            )
        );
        // setEditProduct(null);
    };

    const deleteProduct = (id) => {
        productService
        .delete(id)
        .then(() => setProducts(products.filter((p) => p.id !== id)));
    };

//--------------------| Funciones para mostrar dialogos |--------------------
    //------> Nuevo gasto
    const openNew = () => {
        setProduct(emptyProduct);
        setProductDialog(true);
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
        console.log(product);
    };
    //------> Agregar nuevo registro
    const saveProduct = () => {
        console.log("[+]ID: " + product.id);
        if (!product.id) {
            createProduct(product);
            toast.current.show({ severity: 'success', summary: 'Atencion!', detail: 'Planta creada', life: 3000 });
        } else {
            updateProduct(product);
            toast.current.show({ severity: 'success', summary: 'Atencion!', detail: 'Planta modificado', life: 3000 });
        }
        setProduct(emptyProduct);
        setProductDialog(false);
    }
    //------> Eliminar 1 producto
    const _deleteProduct = () => {
        console.log("Producto eliminado: "+product.id);
        deleteProduct(product.id);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'error', summary: 'Atencion!', detail: 'Planta eliminado', life: 3000 });
        setDeleteProductDialog(false);
    }
    //------> Eliminar varios productos
    const deleteSelectedProducts = () => {
        let _products = products.filter(val => selectedProducts.includes(val)); // Producto a eliminar
        console.log("[+]Registros eliminados: "+_products.length);              // N# de productos a eliminar
        // setProducts(_products);                                              // Ver productos a eliminar
        for(let i=0 ; i<_products.length ; i++){
            deleteProduct(_products[i].id);
            console.log("Registro eliminado: "+_products[i].id);
        }
        
        setDeleteProductsDialog(false);                                         // Ocultara dialogo
        setSelectedProducts(null);                                              // Elemetos seleccionados = 0
        toast.current.show({ severity: 'error', summary: 'Atencion!', detail: 'Plantas eliminadas', life: 3000 });
    }
    //------> Editar producto
    const _editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    }

//--------------------| Validar campos  |--------------------
    const [validarNombre,setValidarNombre]=useState("");                // Validar nombre de planta
    const [boton,setBoton]=useState(false);                             // Activar o desactivar boton
    const Advertencia=(<p style={{color:"red"}}>Campo no valido</p>);   // Mensaje de advertencia
    const expresion=/^[a-zA-Z0-9._-]{1,40}$/;                            // Solo nombres y numeros

    const Verificar=(texto)=>{
        if (!expresion.test(texto)){
            setValidarNombre("p-invalid");
            setBoton(true);
        }else{
            setValidarNombre("");
            setBoton(false);
        }
    }

//--------------------| Botones en pantalla |--------------------
    //------> Botones para agregar/eliminar productos
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }
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

//--------------------| Botones de confirmacion |--------------------
    //------> Botones para crear registro
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} disabled={boton}/>
        </React.Fragment>
    );
    //------> Boton de eliminar 1 registro
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={_deleteProduct} />
        </React.Fragment>
    );
    //------> Botones para eliminar varios registros
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

//--------------------| Valor que regresara |--------------------
    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} /*right={rightToolbarTemplate}*/  />

                <DataTable ref={dt} value={products} selection={selectedProducts} 
                filters={filters}
                onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" paginator rows={5} 
                rowsPerPageOptions={[5, 10, 25]} showGridlines 
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrar de {first} a {last} de {totalRecords} productos"
                // CAMBIAR...
                globalFilterFields={['id', 'nombrePlanta']}
                emptyMessage="No se encontraron resultados."
                header={header} responsiveLayout="scroll">
                    {/* // CAMBIAR.............. */}
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}/>
                    <Column field="id" header="ID" sortable style={{ minWidth: '12rem' }}/>
                    <Column field="nombrePlanta" header="Planta" sortable style={{ minWidth: '16rem' }}/>
                    <Column header="Editar" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}/>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header={props.titulos.VentanaCrear} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {/* // CAMBIAR.............. */}
                <div className="field">
                    <label htmlFor="nombrePlanta">Area</label>
                    <InputText 
                    id="nombrePlanta" 
                    value={product.nombrePlanta} 
                    onChange={(e) => {updateField(e.target.value.trim(), "nombrePlanta");Verificar(e.target.value)}} 
                    required 
                    autoFocus 
                    className={validarNombre}
                    maxLength="30" 
                    />
                    {boton && Advertencia}
                </div>
            </Dialog>

            {/* Dialogo para eliminar producto por separado */}
            {/* // CAMBIAR.............. */}
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>Estas seguro de eliminar <b>{product.nombrePlanta}</b>?</span>}
                </div>
            </Dialog>

            {/* Dialogo para eliminar producto seleccionado */}
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>Estas seguro de eliminar el producto seleccionado?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Crud;