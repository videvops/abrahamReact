import axios from "axios";
import Environment from '../Environment';


const getRoute = Environment();

export class Service {
    //------> Link para hacer peticiones
    baseUrl = getRoute+"/";
    //------> Agregar nuevo registro
    create(entity) {
        return axios.post(this.baseUrl, entity).then((res) => res.data);
    }
    //------> Obtener registros de BD
    readAll() {
        return axios.get(this.baseUrl).then((res) => res.data);
    }
    //------> Modificar registro
    update(entity) {
        return axios.put(this.baseUrl, entity).then((res) => res.data);
    }
    //------> Eliminar registro
    delete(id) {
        return axios.delete(this.baseUrl + "/" + id).then((res) => res.data);
    }
}
