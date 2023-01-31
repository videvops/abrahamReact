export const formatearFecha = (fecha) => {
    fecha.setSeconds(0)                     // Formateo de segundos
    const fechaNueva = new Date(fecha)      // Variable de fecha a partir de argumento
    return (
        fechaNueva.getFullYear() + "-" +
        (fechaNueva.getMonth() + 1) + "-" +
        fechaNueva.getDate() + " " +
        fechaNueva.getHours() + ":" +
        fechaNueva.getMinutes() + ":" +
        fechaNueva.getSeconds()
    )
}