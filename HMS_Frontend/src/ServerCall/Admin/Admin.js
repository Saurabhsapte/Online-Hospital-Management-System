import { resolvePath } from "react-router-dom";
import { MYAXIOIS, PrivateAxios } from "../Axios/AxiosHelper";

export const loadAllEmployee = (pageNumber,pageSize) => {
  return PrivateAxios.get(`employee?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(
    (response) => response.data
  );
};

export const loadAllPatient = (pageNumber,pageSize) => {
  return PrivateAxios.get(`patients?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(
    (response) => response.data
  );
};

export const addEmployee = (data, id) => {
  return PrivateAxios.post("employee/create/" + id, data).then(
    (response) => response.data
  );
};

export const addDoctor = (doctor) => {
  return PrivateAxios.post("doctor", doctor).then((response) => response.data);
};

export const getTheEmployee = (id) => {
  return PrivateAxios.get("employee/" + id).then((response) => response.data);
};

export const deleteTheEmployee = (id) =>
{
  return PrivateAxios.delete("employee/" + id).then((response) => response.data);
}