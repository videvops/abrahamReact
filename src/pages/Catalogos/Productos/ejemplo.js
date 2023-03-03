
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from './service/CustomerService';

export default function LazyLoadDemo() {
    const [loading, setLoading] = useState(false);                      // cargar
    const [totalRecords, setTotalRecords] = useState(0);                // total registros
    const [customers, setCustomers] = useState(null);                   // contenido de tabla
    // const [selectAll, setSelectAll] = useState(false);               
    // const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [lazyState, setlazyState] = useState({                        // Envio
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {
            name: { value: '', matchMode: 'contains' },
            'country.name': { value: '', matchMode: 'contains' },
            company: { value: '', matchMode: 'contains' },
            'representative.name': { value: '', matchMode: 'contains' }
        }
    });

    //--> Funcion oyente
    let networkTimeout = null;
    useEffect(() => {
        loadLazyData();
    }, [lazyState]);

    //--> Funcion envio
    const loadLazyData = () => {
        setLoading(true);

        if (networkTimeout) {
            clearTimeout(networkTimeout);
        }

        //imitate delay of a backend call
        networkTimeout = setTimeout(() => {
            CustomerService.getCustomers({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
                setTotalRecords(data.totalRecords);
                setCustomers(data.customers);
                setLoading(false);
            });
        }, Math.random() * 1000 + 250);
    };
    //--> Pagina
    const onPage = (event) => {
        setlazyState(event);
    };
    //--> Ordenar
    const onSort = (event) => {
        setlazyState(event);
    };
    //--> Filtrar
    const onFilter = (event) => {
        event['first'] = 0;
        setlazyState(event);
    };

    // const onSelectionChange = (event) => {
    //     const value = event.value;

    //     setSelectedCustomers(value);
    //     setSelectAll(value.length === totalRecords);
    // };

    // const onSelectAllChange = (event) => {
    //     const selectAll = event.checked;

    //     if (selectAll) {
    //         CustomerService.getCustomers().then((data) => {
    //             setSelectAll(true);
    //             setSelectedCustomers(data.customers);
    //         });
    //     } else {
    //         setSelectAll(false);
    //         setSelectedCustomers([]);
    //     }
    // };

    // const representativeBodyTemplate = (rowData) => {
    //     return (
    //         <div className="flex align-items-center gap-2">
    //             <img alt={rowData.representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${rowData.representative.image}`} width={32} />
    //             <span>{rowData.representative.name}</span>
    //         </div>
    //     );
    // };

    // const countryBodyTemplate = (rowData) => {
    //     return (
    //         <div className="flex align-items-center gap-2">
    //             <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
    //             <span>{rowData.country.name}</span>
    //         </div>
    //     );
    // };

    return (
        <div className="card">
            <DataTable value={customers} lazy filterDisplay="row" dataKey="id" paginator
                    first={lazyState.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                    onSort={onSort} sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
                    onFilter={onFilter} filters={lazyState.filters} loading={loading} tableStyle={{ minWidth: '75rem' }}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search" />
                <Column field="country.name" sortable header="Country" filterField="country.name" body={countryBodyTemplate} filter filterPlaceholder="Search" />
                <Column field="company" sortable filter header="Company" filterPlaceholder="Search" />
                <Column field="representative.name" header="Representative" body={representativeBodyTemplate} filter filterPlaceholder="Search" />
            </DataTable>
        </div>
    );
}
        