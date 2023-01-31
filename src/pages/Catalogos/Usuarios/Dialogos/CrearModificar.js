import React, {useState} from 'react'
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { productDialogFooter } from '../../ComponentsCat/Botones/CrearRegistro';

const CrearModificar = ({productDialog,titulos,hideDialog,product,updateField,saveProduct}) => {
    const roles=[
        {rol:"Administrador",value:"administrador"},
        {rol:"Usuario",value:"usuario"},
    ]

//--------------------| Validar campos  |--------------------
    const [validarNombre,setValidarNombre]=useState("");                // Validar nombre de planta
    const [boton,setBoton]=useState(false);                             // Activar o desactivar boton
    const Advertencia=(<p style={{color:"red"}}>Campo no valido</p>);   // Mensaje de advertencia
    const expresion=/^[a-zA-Z0-9._-]{1,40}$/;                            // Solo nombres y numeros

    const Verificar=(texto)=>{
        if (!expresion.test(texto)){
            setTimeout(() => {                                          // Validacion despues de 3 seg
                setValidarNombre("p-invalid");
                setBoton(true);
            }, 2000);
        }else{
            setValidarNombre("");
            setBoton(false);
        }
    }

//--------------------| Botones de confirmacion |--------------------
    //------> Botones para crear registro
    const crearRegistro=productDialogFooter(hideDialog,saveProduct,boton);

//--------------------| Valor que regresara  |--------------------
    return (
        <Dialog 
        visible={productDialog} 
        style={{ width: '450px' }} 
        header={titulos.VentanaCrear} 
        modal 
        className="p-fluid" 
        footer={crearRegistro} 
        onHide={hideDialog}
        >
            <div className="field">
                <label>Rol</label>
                <Dropdown
                    value={product.rol} 
                    options={roles}                     // Constantes de select 
                    onChange={ e => {
                        updateField(e.value, "rol");
                        console.log(product.usuario)
                    }} 
                    optionLabel="rol"                   // Elemento del objeto 
                    placeholder="Selecciona un rol" 
                />
            </div>
            <div className="field">
                <label htmlFor="usuario">Usuario</label>
                <InputText 
                id="usuario" 
                value={product.usuario} 
                onChange={(e) => {
                    updateField(e.target.value.trim(), "usuario");
                    Verificar(e.target.value)
                }} 
                required 
                autoFocus 
                className={validarNombre}
                maxLength="10" 
                />
                {boton && Advertencia}
            </div>
            <div className="field">
                <label htmlFor="nombre">Nombre</label>
                <InputText 
                id="nombre" 
                value={product.nombre} 
                onChange={(e) => {
                    updateField(e.target.value.trim(), "nombre");
                    Verificar(e.target.value)
                }} 
                required 
                autoFocus 
                className={validarNombre}
                maxLength="25" 
                />
                {boton && Advertencia}
            </div>
            <div className="field">
                <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                <InputText 
                id="apellidoPaterno" 
                value={product.apellidoPaterno} 
                onChange={(e) => {
                    updateField(e.target.value.trim(), "apellidoPaterno");
                    Verificar(e.target.value)
                }} 
                required 
                autoFocus 
                className={validarNombre}
                maxLength="25" 
                />
                {boton && Advertencia}
            </div>
            <div className="field">
                <label htmlFor="apellidoMaterno">Apellido Materno</label>
                <InputText 
                id="apellidoMaterno" 
                value={product.apellidoMaterno} 
                onChange={(e) => {
                    updateField(e.target.value.trim(), "apellidoMaterno");
                    Verificar(e.target.value)
                }} 
                required 
                autoFocus 
                className={validarNombre}
                maxLength="25" 
                />
                {boton && Advertencia}
            </div>
            <div className="field">
                <label htmlFor="empleado">Empleado</label>
                <InputText 
                id="empleado" 
                value={product.empleado} 
                onChange={(e) => {
                    updateField(e.target.value.trim(), "empleado");
                    Verificar(e.target.value)
                }} 
                required 
                autoFocus 
                className={validarNombre}
                />
                {boton && Advertencia}
            </div>
        </Dialog>
    )
}

export default CrearModificar
