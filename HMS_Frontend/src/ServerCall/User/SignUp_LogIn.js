import { MYAXIOIS } from "../Axios/AxiosHelper"

export const singup = (user) => {
    return MYAXIOIS.post('/v1/auth/register', user).then((response) => response.data)
}

export const loginUser = (loginDetails) => {
    // debugger
    return MYAXIOIS.post('/v1/auth/login', loginDetails).then((response) => response.data)
}

export const getTheUser = (email) => {
    return MYAXIOIS.get("users/email/"+email).then((response) => response.data);
};
  
export const setNewPassword=(email, password) => {
    return MYAXIOIS.put("/v1/auth/email/"+email+"/forgot/"+password).then((response) => response.data);
};