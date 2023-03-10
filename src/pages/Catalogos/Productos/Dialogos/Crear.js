import React, { useEffect, useState } from 'react'

import Axios from 'axios'
import Step1 from './Step1'
import Step2 from './Step2'
import { Dialog } from 'primereact/dialog'

import { RECUPERAR_DATOS_PRODUCTO } from '../../../../genericos/Uris'
import Environment from '../../../../Environment'
const getRoute = Environment()

const Crear = ({
    m1, m2,
    titulos, edicion,
    mostrarM1, mostrarM2,
    product, productDialog,
    hideDialog, updateField,
    objetoParte2, setObjetoParte2,
    setProducts, lazyState, setIsLoading
}) => {
    //--------------------| Crear objeto para componente 2 |--------------------
    const [tieneMaquinas, setTieneMaquinas] = useState(false)
    const [idProducto, setIdProduto] = useState({})
    const [informacion, setInformacion] = useState({})

    //--> Obtiene informacion parte 1
    useEffect(() => { 
        if (tieneMaquinas) {
            Axios.get(`${getRoute}/${RECUPERAR_DATOS_PRODUCTO}/${idProducto}`).then((res) => {
                console.log(res.data)
                setInformacion(res.data)
            })
        }
        // eslint-disable-next-line
    }, [tieneMaquinas])

    //--> Crea tabla de componente 2
    useEffect(() => {
        // Tiene informacion
        if (informacion.lineasAsignadas) {
            console.log(informacion)
            let arregloLM = []
            // Linea sin configuracion
            if (!informacion.lineasAsignadas[0].config) {
                arregloLM.push({
                    id: informacion.lineasAsignadas[0].id,
                    tipo: "linea",
                    nombre: informacion.lineasAsignadas[0].linea,
                    velocidadEstandar: 0,
                    factorConversionI: 0,
                    factorConversionO: 0,
                    habilitado:"false"
                })
            }
            // Linea configurada
            else {
                arregloLM.push({
                    id: informacion.lineasAsignadas[0].id,
                    tipo: "linea",
                    nombre: informacion.lineasAsignadas[0].linea,
                    velocidadEstandar: informacion.lineasAsignadas[0].config.velocidadEstandar,
                    factorConversionI: informacion.lineasAsignadas[0].config.factorConversionI,
                    factorConversionO: informacion.lineasAsignadas[0].config.factorConversionO,
                    habilitado:`${informacion.lineasAsignadas[0].config.habilitado}`
                })
            }
            //--> Maquinas configuradas
            if (informacion.lineasAsignadas[0].maquinasConfig) {
                console.log("Informacion maquinas config", informacion.lineasAsignadas[0].maquinasConfig)
                let j = 0
                while (j < informacion.lineasAsignadas[0].maquinasConfig.length) {
                    arregloLM.push({
                        id: informacion.lineasAsignadas[0].maquinasConfig[j].id,
                        tipo: "maquina",
                        nombre: informacion.lineasAsignadas[0].maquinasConfig[j].nombre,
                        velocidadEstandar: informacion.lineasAsignadas[0].maquinasConfig[j].velocidadEstandar,
                        factorConversionI: informacion.lineasAsignadas[0].maquinasConfig[j].factorConversionI,
                        factorConversionO: informacion.lineasAsignadas[0].maquinasConfig[j].factorConversionO,
                        habilitado:`${informacion.lineasAsignadas[0].maquinasConfig[j].habilitado}`
                    })
                    j++
                }
            }
            //--> Maquinas sin configurar
            if (informacion.lineasAsignadas[0].maquinasNoConfig.length>0) {
                let i = 0
                while (i < informacion.lineasAsignadas[0].maquinasNoConfig.length) {
                    arregloLM.push({
                        id: informacion.lineasAsignadas[0].maquinasNoConfig[i].id,
                        tipo: "maquina",
                        nombre: informacion.lineasAsignadas[0].maquinasNoConfig[i].maquina,
                        velocidadEstandar: 0,
                        factorConversionI: 0,
                        factorConversionO: 0,
                        habilitado:"false"
                    })
                    i++
                }
            }
            setObjetoParte2(arregloLM)
        }
        return () => {
            setObjetoParte2([])
        }
        // eslint-disable-next-line
    }, [informacion])

//--------------------| Valor que regresara |--------------------
    return (
        <Dialog
            visible={productDialog} 
            style={{ width: `${m1 ? 450 : 900}px` }} 
            header={titulos.VentanaCrear} 
            modal 
            className="p-fluid" 
            // onHide={hideDialog}
            onHide={m1 ? hideDialog : () => { }}
        >
            {m1 && (
                <Step1
                    edicion={edicion}
                    product={product}
                    mostrarM2={mostrarM2}
                    hideDialog={hideDialog}
                    updateField={updateField}
                    setIdProduto={setIdProduto}
                    setTieneMaquinas={setTieneMaquinas} />
            )}
            {m2 && (
                <Step2
                    mostrarM1={mostrarM1}
                    hideDialog={hideDialog}
                    objetoParte2={objetoParte2}
                    tieneMaquinas={tieneMaquinas}
                    setObjetoParte2={setObjetoParte2}
                    setTieneMaquinas={setTieneMaquinas}
                    idProducto={informacion.idProducto}

                    lazyState={lazyState}
                    setProducts={setProducts}
                    setIsLoading={setIsLoading}
                />
            )}
        </Dialog>
    )
}

export default Crear
