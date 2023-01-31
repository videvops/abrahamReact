import React from 'react'
import { Dialog } from 'primereact/dialog';
import { deleteProductsDialogFooter } from '../../ComponentsCat/Botones/VariosRegistros';

const EliminarVarios = ({deleteProductsDialog,hideDeleteProductsDialog,product,deleteSelectedProducts}) => {
    const eliminarRegisros=deleteProductsDialogFooter(hideDeleteProductsDialog,deleteSelectedProducts);
//--------------------| Valor que regresara |--------------------
    return (
        <Dialog 
            visible={deleteProductsDialog} 
            style={{ width: '450px' }} 
            header="Confirm" 
            modal 
            footer={eliminarRegisros} 
            onHide={hideDeleteProductsDialog}
        >
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                {product && <span>Estas seguro de eliminar el producto seleccionado?</span>}
            </div>
        </Dialog>
    )
}

export default EliminarVarios
