import { MYAXIOIS } from "../Axios/AxiosHelper";

export const AddResource = (resource) => {
    return MYAXIOIS.post(`/resources/add`,resource).then((response) => response.data);
}

export const UpdateResources = (data, id) => {
    return MYAXIOIS.put(`/resources/`+id,data).then((response) => response.data);
}

export const GetAllResources = (pageNumber,pageSize) => {
    return MYAXIOIS.get(`/resources?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response) => response.data);
}