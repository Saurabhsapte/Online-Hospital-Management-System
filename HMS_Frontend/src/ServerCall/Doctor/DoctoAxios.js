import { MYAXIOIS, PrivateAxios } from "../Axios/AxiosHelper";

export const GetAppointmentList = (id) => {
  return PrivateAxios.get(`/doctor/`+id+`/patients`).then(
    (response) => response.data
  );
};

export const updatePatientStatus = (data,admitStatus) =>
{
  return PrivateAxios.put(`/healthhistory/`+admitStatus, data).then((response) => response.data)
} 

export const updateDoctorSchedule = (id,data,days) =>
{
  return PrivateAxios.put('/doctor/'+id+'/schedule/'+days, data).then((response) => response.data)
} 
