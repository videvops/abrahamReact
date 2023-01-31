import React from 'react';
import { InputText } from 'primereact/inputtext';

export const renderHeader = (globalFilter,onGlobalFilterChange,tituloBuscador,tituloTabla) => {
    return (
        <div className="flex justify-content-end">
            <h5 className="mx-0 my-1">{tituloTabla}</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder={tituloBuscador} />
            </span>
        </div>
    )
}