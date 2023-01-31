import React from 'react'
import { Dialog } from 'primereact/dialog';
import { deleteProductDialogFooter } from '../../ComponentsCat/Botones/UnRegistro';

const EliminarUno = ({deleteProductDialog,hideDeleteProductDialog,product,_deleteProduct}) => {
//--------------------| Boton de eliminar 1 registro |--------------------
    const unRegistro=deleteProductDialogFooter(hideDeleteProductDialog,_deleteProduct);

//--------------------| Valor que regresara |--------------------
    return (
        <Dialog 
        visible={deleteProductDialog} 
        style={{ width: '450px' }} 
        header="Confirm" 
        modal 
        footer={unRegistro} 
        onHide={hideDeleteProductDialog}
        >
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                {/* CAMBIAR... */}
                {product && <span>Estas seguro de eliminar <b>{product.nombre}</b>?</span>}
            </div>
        </Dialog>
    )
}

export default EliminarUno
