import React from 'react'
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';

// const EditarStep2 = ({ edicion,setEdicion }) => {
const EditarStep2 = ({ registrosEditados, setRegistrosEditados }) => {
    //---> Funcion principal
    const onRowEditComplete = (e) => {
        let registros = [...registrosEditados]     
        let { newData, index } = e
        registros[index] = newData
        setRegistrosEditados(registros)
    }
    //---> Editar texto
    const textEditor = (options) => {
        return <InputText
            type="text"
            value={options.value}
            onChange={(e) => options.editorCallback(e.target.value)}
        />;
    };
    //---> Editar numeros
    const numEditor = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
                mode="decimal"
                minFractionDigits={2}
                maxFractionDigits={2}
            />
        )
    }
    //---> Dropdown para si o no
    // operador ternario, implementar
    const opcionesHabilitado = [
        { label: 'Si', value: "true" },
        { label: 'No', value: "false" },
    ];
    const dropEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={opcionesHabilitado}
                optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Seleciona una opcion"
            />
        )
    }

//--------------------| Valor que regresara  |--------------------
    return (
        <div>
            <div>
                <p>Descripcion: Galleta mini chispa chocolate 20 oz</p>
                <DataTable value={registrosEditados} editMode="row" onRowEditComplete={onRowEditComplete} responsiveLayout="scroll">
                    <Column field="id" header="ID"  style={{ width: '20%' }}/>
                    <Column field="tipo" header="Tipo" style={{ width: '20%' }}/>
                    <Column field="nombre" header="Nombre" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                    <Column field="velocidadEstandar" header="Velocidad Estándar" editor={(options) => numEditor(options)} style={{ width: '20%' }}/>
                    <Column field="factorConversionI" header="Factor de Conversión Input" editor={(options) => numEditor(options)} style={{ width: '20%' }}/>
                    <Column field="factorConversionO" header="Factor de Conversión Output" editor={(options) => numEditor(options)} style={{ width: '20%' }}/>
                    <Column field="habilitado" header="¿Habilitado?" editor={(options) => dropEditor(options)} style={{ width: '20%' }}/>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}/>
                </DataTable>
            </div>
        </div>
    )
}

export default EditarStep2
