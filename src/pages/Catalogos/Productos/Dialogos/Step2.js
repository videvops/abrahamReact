import React from 'react'
import Axios from 'axios';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';

const Step2 = ({ mostrarM1, hideDialog, objetoParte2, setObjetoParte2, tieneAlgo, setTieneAlgo }) => {
//--------------------| Editar tabla  |--------------------
    //---> Funcion principal
    const onRowEditComplete = (e) => {
        let registros = [...objetoParte2]     
        let { newData, index } = e
        registros[index] = newData
        setObjetoParte2(registros)
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

//--------------------| Envio de datos  |--------------------
    const enviarParte2 = () => {
        const objetoEnviar = { config: objetoParte2 }
        Axios.post("http://localhost:8080/productos/config/velocidades", objetoEnviar)
        console.log("Datos enviados")
        console.log(objetoEnviar)
        hideDialog()
    }

//--------------------| Valor que regresara  |--------------------
    return (
        <>
            {tieneAlgo ? (
                <div>
                    <p>Descripcion: Galleta mini chispa chocolate 20 oz</p>
                    <DataTable value={objetoParte2} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} responsiveLayout="scroll">
                        <Column field="id" header="ID" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                        <Column field="tipo" header="Tipo" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                        <Column field="nombre" header="Nombre" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                        <Column field="velocidadEstandar" header="Velocidad Estándar" editor={(options) => numEditor(options)} style={{ width: '20%' }}/>
                        <Column field="factorConversionI" header="Factor de Conversión Input" editor={(options) => numEditor(options)} style={{ width: '20%' }}/>
                        <Column field="factorConversionO" header="Factor de Conversión Output" editor={(options) => numEditor(options)} style={{ width: '20%' }}/>
                        <Column field="habilitado" header="¿Habilitado?" editor={(options) => dropEditor(options)} style={{ width: '20%' }}/>
                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}/>
                    </DataTable>
                    <div className='mt-5 flex justify-content-end'>
                        <Button label="Atras" className="w-2 p-button-rounded" onClick={mostrarM1} />
                        <Button label="Enviar" className="w-2 p-button-rounded" onClick={enviarParte2}/>
                    </div>
                </div>
            ) : (
                    <div>
                        <p>La linea seleccionada no cuenta con maquinas</p>
                        <p>¿Desea continuar?</p>
                        <div className='mt-5 flex justify-content-end'>
                            <Button label="Atras" className="w-2 p-button-rounded" onClick={mostrarM1} />
                            <Button label="Continuar" className="w-2 p-button-rounded" onClick={()=>setTieneAlgo(true)}/>
                        </div>
                    </div>
            )
            }
        </>
    )
}

export default Step2
