export const PromedioEfecto = (porcentajes) => {
    const json = JSON.stringify(porcentajes);
    let data = JSON.parse(json); //Convirtiendo a objeto javascript
    let suma = 0;
    let contador = 0;
    for (let x in data) {
        //Recorriendo el objeto
        suma += data[x].eficiencia; //Ahora que es un objeto javascript, tiene propiedades
        contador++;
    }
    let resultado = suma / contador;
    return resultado;
};

export const PromedioDisponibilidad = (porcentajes) => {
    const json = JSON.stringify(porcentajes);
    let data = JSON.parse(json); //Convirtiendo a objeto javascript
    let suma = 0;
    let contador = 0;
    for (let x in data) {
        //Recorriendo el objeto
        suma += data[x].disponibilidad; //Ahora que es un objeto javascript, tiene propiedades
        contador++;
    }
    let resultado = suma / contador;
    return resultado;
};

export const PromedioVelocidad = (porcentajes) => {
    const json = JSON.stringify(porcentajes);
    let data = JSON.parse(json); //Convirtiendo a objeto javascript
    let suma = 0;
    let contador = 0;
    for (let x in data) {
        //Recorriendo el objeto
        suma += data[x].rendimiento; //Ahora que es un objeto javascript, tiene propiedades
        contador++;
    }
    let resultado = suma / contador;
    return resultado;
};

export const PromedioCalidad = (porcentajes) => {
    const json = JSON.stringify(porcentajes);
    let data = JSON.parse(json); //Convirtiendo a objeto javascript
    let suma = 0;
    let contador = 0;
    for (let x in data) {
        //Recorriendo el objeto
        suma += data[x].calidad; //Ahora que es un objeto javascript, tiene propiedades
        contador++;
    }
    let resultado = suma / contador;
    return resultado;
};

export const PromedioProducto = (porcentajes) => {
    const json = JSON.stringify(porcentajes);
    let data = JSON.parse(json); //Convirtiendo a objeto javascript
    let suma = 0;
    let contador = 0;
    for (let x in data) {
        //Recorriendo el objeto
        suma += data[x].productoTerminado; //Ahora que es un objeto javascript, tiene propiedades
        contador++;
    }
    let resultado = suma / contador;
    return resultado;
};
