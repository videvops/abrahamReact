import React, { useState, useEffect, useRef, useContext } from "react";
import { MaquinasService } from "../../../service/MaquinasService";
import { emptyProduct } from "./Objetos/ProductoVacio";
import Exportar from "./Botones/Exportar";
import { leftToolbarTemplate } from "../ComponentsCat/Botones/AgregarEliminar";
import { ProductContext } from "../ComponentsCat/Contexts/ProductContext";
import { renderHeader } from "../ComponentsCat/Buscador/Cabezal";
import EliminarVarios from "./Dialogos/EliminarVarios";
import EliminarUno from "./Dialogos/EliminarUno";
import CrearModificar from "./Dialogos/CrearModificar";
import TablaMaquinas from "./Tabla/TablaMaquina";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import Spinner from "../../../components/loader/Spinner";
import ErrorSistema from "../../../components/error/ErrorSistema";

const Crud = (props) => {
    //--------------------| Importacion de metodos axios |--------------------
    const maquinasService = new MaquinasService();

    //--------------------| Uso de Contextos |--------------------
    const {
        createProduct,
        updateProduct,
        deleteProduct,

        products,
        setProducts,
    } = useContext(ProductContext);

    //--------------------| Uso de estados |--------------------
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState("");
    const [tieneId, setTieneId] = useState(false);
    // CAMBIAR...
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        nombreArea: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const toast = useRef(null);
    const dt = useRef(null);

    //--------------------| Barra de Buscar |--------------------
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilter(value);
    };
    //------> Cabezal de buscador
    const header = renderHeader(globalFilter, onGlobalFilterChange, props.titulos.Buscador, props.titulos.TituloTabla);

    //--------------------| Funciones para mostrar dialogos |--------------------
    //------> Nuevo gasto
    const openNew = () => {
        setProduct(emptyProduct);
        setProductDialog(true);
    };
    //------>
    const hideDialog = () => {
        setProductDialog(false);
    };
    //------> Ocultar dialogo de eliminar 1 producto
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };
    //------> Ocultar dialogo de eliminar varios productos
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };
    //------> Ventana para eliminar 1 producto
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };
    //------> Ventana para eliminar varios productos
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    //--------------------| Acciones de crud |--------------------
    //------> Actualizar campo de producto
    const updateField = (data, field) => {
        setProduct({
            ...product,
            [field]: data,
        });
    };
    //------> Agregar nuevo registro
    const saveProduct = () => {
        console.log(product)
        if (!product.id) {
            console.log("creando")
            createProduct(product);
            toast.current.show({
                severity: "success",
                summary: "Atencion!",
                detail: "Maquina creada",
                life: 3000,
            });
        } else {
            console.log("editando")
            updateProduct(product);
            toast.current.show({
                severity: "success",
                summary: "Atencion!",
                detail: "Maquina Actualizada",
                life: 3000,
            });
        }
        setProduct(emptyProduct);
        setProductDialog(false);
    };
    //------> Eliminar 1 producto
    const _deleteProduct = () => {
        deleteProduct(product.id);
        setProduct(emptyProduct);
        toast.current.show({
            severity: "error",
            summary: "Atencion!",
            detail: "Modos de falla eliminado",
            life: 3000,
        });
        setDeleteProductDialog(false);
    };
    //------> Eliminar varios productos
    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => selectedProducts.includes(val)); // Producto a eliminar
        for (let i = 0; i < _products.length; i++) {
            deleteProduct(_products[i].id);
        }
        setDeleteProductsDialog(false); // Ocultara dialogo
        setSelectedProducts(null); // Elemetos seleccionados = 0
        toast.current.show({
            severity: "error",
            summary: "Atencion!",
            detail: "Maquinas eliminadas",
            life: 3000,
        });
        maquinasService.readAll().then((data) => setProducts(data));
    };
    //------> Editar producto
    const _editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    //--------------------| Botones en pantalla |--------------------
    //------> Botones para agregar/eliminar productos
    const BotonesCabezal = leftToolbarTemplate(openNew, confirmDeleteSelected, selectedProducts);

    //------> Boton para exportar
    const ExportarRegistros = Exportar(products);

    //------> Botones parte derecha
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        console.log(rowData);
                        _editProduct(rowData);
                    }}
                />

                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    //--------------------| Obtener registros de back-end |--------------------
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function CargarDatos() {
        setIsLoading(true);
        setError(null);
        try {
            const data = await maquinasService.readAll(); // Hasta que no se termine de ejecutar la maquina
            setProducts(data);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    // let content = <p>Sin registros</p>;
    // if (true) {
    //     // if(!isLoading && !error){
    //     content = <TablaMaquinas BotonesCabezal={BotonesCabezal} ExportarRegistros={ExportarRegistros} dt={dt} products={products} selectedProducts={selectedProducts} filters={filters} setSelectedProducts={setSelectedProducts} header={header} actionBodyTemplate={actionBodyTemplate} />;
    // }

    // if(error)content=<p>{error}</p>
    // if(isLoading)content=<p>Cargando...</p>

    useEffect(() => {
        CargarDatos();
        return () => {
            setProducts([])
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     maquinasService.readAll().then((data) => setProducts(data));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps
    //--------------------| Abilitar o inhabilitar boton |--------------------
    useEffect(() => {
        if (product.id) {
            // Tiene existe el ID
            setTieneId(false);
        } else {
            // Sino tiene ID
            setTieneId(true);
        }
    }, [product]);

    //--------------------| Valor que regresara |--------------------
    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            {!isLoading && !error && (<TablaMaquinas BotonesCabezal={BotonesCabezal} ExportarRegistros={ExportarRegistros} dt={dt} products={products} selectedProducts={selectedProducts} filters={filters} setSelectedProducts={setSelectedProducts} header={header} actionBodyTemplate={actionBodyTemplate} />)}
            {isLoading && <Spinner />}
            {error && <ErrorSistema texto={error} />}

            <CrearModificar productDialog={productDialog} titulos={props.titulos} saveProduct={saveProduct} hideDialog={hideDialog} product={product} updateField={updateField} tieneId={tieneId} />

            <EliminarUno deleteProductDialog={deleteProductDialog} _deleteProduct={_deleteProduct} hideDeleteProductDialog={hideDeleteProductDialog} product={product} />

            <EliminarVarios deleteProductsDialog={deleteProductsDialog} deleteSelectedProducts={deleteSelectedProducts} hideDeleteProductsDialog={hideDeleteProductsDialog} product={product} />
        </div>
    );
};

export default Crud;
