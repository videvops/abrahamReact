import React from 'react';
import Crud from './components/Crud';

//--------------------| Estilos CSS |--------------------
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

const App=()=>{
  //------> Nombres en el crud
  const nombres={
    VentanaCrear:"Detalles de Planta",
    Buscador:"Buscar Planta...",
    TituloTabla:"Producto: Plantas"
  }
//--------------------| Valor que regresara |--------------------
  return (
    <React.Fragment>
        <Crud titulos={nombres}/>
    </React.Fragment>
  );
}

export default App;
