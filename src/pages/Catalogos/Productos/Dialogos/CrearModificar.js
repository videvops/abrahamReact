import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import Step1 from './Step1'
import Step2 from './Step2'

const CrearModificar = ({
    titulos,
    product,
    productDialog,
    updateField,
    hideDialog,
    m1,
    m2,
    mostrarM1,
    mostrarM2,
    objetoParte2,
    setObjetoParte2
}) => {
//--------------------| Crear objeto para componente 2 |--------------------
    const [resultado, setResultado] = useState([])
    let arreglo = [{
        id: product.idLinea,
        tipo: "linea",
        nombre: "linea1",
        velocidadEstandar: "",
        factorConversionI: "",
        factorConversionO: "",
        habilitado: false
    }]
    useEffect(() => {
        if (resultado.length>0) {
            let i = 0
            while (i < resultado.length) {
                arreglo.push({
                    id: resultado[i].id,
                    tipo: "maquina",
                    nombre: resultado[i].maquina,
                    velocidadEstandar: "",
                    factorConversionI: "",
                    factorConversionO: "",
                    habilitado: false
                })
                i++
            }
            setObjetoParte2(arreglo)
            console.log(arreglo)
        } else {
            setObjetoParte2([])
        }
    }, [resultado])

//--------------------| Valor que regresara |--------------------
    return (
        <Dialog
            visible={productDialog} 
            style={{ width: `${m1 ? 450 : 850}px` }} 
            header={titulos.VentanaCrear} 
            modal 
            className="p-fluid" 
            onHide={hideDialog}
        >
            {m1 && (
                <Step1
                    mostrarM2={mostrarM2}
                    hideDialog={hideDialog}
                    updateField={updateField}
                    product={product}
                    setResultado={setResultado}
                />
            )}
            {m2 && (
                <Step2
                    mostrarM1={mostrarM1}
                    hideDialog={hideDialog}
                    objetoParte2={objetoParte2}
                    setObjetoParte2={setObjetoParte2}
                />
            )}
        </Dialog>
    )
}

export default CrearModificar
