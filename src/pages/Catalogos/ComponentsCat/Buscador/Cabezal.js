import React from 'react';
import { InputText } from 'primereact/inputtext';

export const renderHeader = (globalFilter,onGlobalFilterChange,tituloBuscador,tituloTabla) => {
    return (
        <div>
            <div className='flex justify-content-between '>
                <h4 className="mx-0 my-1">{tituloTabla}</h4>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder={tituloBuscador} />
                </span>
            </div>


        </div>
    )
}