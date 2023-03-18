import { PrivateAxios } from "../Axios/AxiosHelper";

export const GetPatientForAccountant = (pageNumber,pageSize) => {
    return PrivateAxios.get(`appointment/patients?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(
    (response) => response.data
  );
};
