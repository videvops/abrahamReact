import React from 'react'
import Axios from 'axios';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';

const Step2 = ({ mostrarM1, hideDialog, objetoParte2, setObjetoParte2 }) => {
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
    //---> Funcion verificar
    // const [checked, setChecked] = useState(false);
    // const checkEditor = (options) => {
    //     return (
    //         <Checkbox value={options.value} onChange={e => options.editorCallback(e.target.value)} />
    //     )
    // }

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
        <div>
            <p>Descripcion: Galleta mini chispa chocolate 20 oz</p>
            <DataTable value={objetoParte2} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} responsiveLayout="scroll">
                <Column field="id" header="ID" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                <Column field="tipo" header="Tipo" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                <Column field="nombre" header="Nombre" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                <Column field="velocidadEstandar" header="Velocidad Estándar" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                <Column field="factorConversionI" header="Factor de Conversión Input" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                <Column field="factorConversionO" header="Factor de Conversión Output" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                <Column field="habilitado" header="¿Habilitado?" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}/>
            </DataTable>
            <div className='flex'>
                <Button label="Atras" className="p-button-rounded" onClick={mostrarM1} />
                <Button label="Enviar" className="p-button-rounded" onClick={enviarParte2}/>
            </div>
        </div>
    )
}

export default Step2
