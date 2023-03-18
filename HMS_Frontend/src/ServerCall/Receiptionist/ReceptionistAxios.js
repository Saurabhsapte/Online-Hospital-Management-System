import { PrivateAxios } from "../Axios/AxiosHelper";

export const GetAllAppointmentList = () => {
  console.log("Inside the Receptionist Call");
  return PrivateAxios.get("/receptionist/patients?pageNumber=0&pageSize=100")
  .then((response) => response.data);
};

export const PostAllAppointedDoctors = (doctor) => {
  return PrivateAxios.post(
    "/patients/{patientId}/doctor/{doctorId}",
    doctor
  ).then((response) => response.data);
};

export const GetPatientForAdmit = (pageNumber,pageSize) => {
  return PrivateAxios.get(
    `receptionist/patients/admit?pageNumber=${pageNumber}&pageSize=${pageSize}`
  ).then((response) => response.data);
};

export const GetPatientForDischarge = (pageNumber,pageSize) => {
  return PrivateAxios.get(
    `receptionist/patients/discharge?pageNumber=${pageNumber}&pageSize=${pageSize}`
  ).then((response) => response.data);
};