import axios from "axios";
import Environment from "../Environment";

const getRoute = Environment()

export class MaquinasService {
    //------> Link para hacer peticiones
    baseUrl = getRoute+"/maquinas";
    //------> Agregar nuevo registro
    create(product) {
        return axios.post(this.baseUrl, product).then((res) => res.data);
    }
    //------> Obtener registros de BD
    readAll() {
        return axios.get(this.baseUrl).then((res) => res.data);
    }
    //------> Modificar registro
    update(product) {
        return axios.put(this.baseUrl, product).then((res) => res.data);
    }
    //------> Eliminar registro
    delete(id) {
        return axios.delete(this.baseUrl + "/" + id).then((res) => res.data);
    }
}
