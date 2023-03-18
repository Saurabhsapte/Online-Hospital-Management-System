import axios from "axios";
import { getToken } from "../../Authentication/auth";


export const BASE_URL = 'http://13.234.121.240:9090/api/';


export const MYAXIOIS = axios.create(
    {
        baseURL: BASE_URL

    }
);

export const PrivateAxios = axios.create({
    baseURL: BASE_URL,
});

PrivateAxios.interceptors.request.use(config => {
      const token = getToken();
    //   console.log(token)
    // debugger
    if (token) {
        //config.headers= `authorization : Bearer ${token}`;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }

}, (error) => { debugger; Promise.reject(error) });

// export const RESOURCEAXIOS = axios.create(
//     {
//         baseURL: 'http://localhost:9092/api/'
//     }
// );