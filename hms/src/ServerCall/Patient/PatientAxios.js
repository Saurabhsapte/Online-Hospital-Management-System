import { getCurrentUserDetail } from "../../Authentication/auth";
import { MYAXIOIS } from "../Axios/AxiosHelper";
import { PrivateAxios } from "../Axios/AxiosHelper";

export const AddAppoinment = (patient,id) => {
  return PrivateAxios.post(
    `/patients/`+id+`/healthHistory`,
    patient
  ).then((response) => response.data);
};

export const GetAllHealthHistory = (id) => {
  return PrivateAxios.get(
    `/patient/`+id+`/healthhistory`
  ).then((response) => response.data);
};

export const GetAllAppintmentHistory = (id) => {
  return PrivateAxios.get(`/patient/`+id+`/appointmenthistory`).then(
    (response) => response.data
  );
};
