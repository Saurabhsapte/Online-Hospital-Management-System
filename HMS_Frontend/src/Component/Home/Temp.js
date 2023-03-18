import React, { useEffect, useState } from 'react'
import axios from "axios";

function Temp() {
  
  const [user, setUser] = useState(null)

  const BASE_URL = 'http://localhost:9090/api';

  const MYAXIOIS = axios.create(
    {
        baseURL: BASE_URL
    }
);

 const getUser = () => {
  return MYAXIOIS.get(`/users/1`).then((resp) => resp.data)
}

useEffect(() => {
  getUser().then(data => {
    setUser({ ...data })
    console.log(data);
    // console.log(user);
    // debugger
  })
}, [])


return (
  <div>
    Hello

    {user?.id}


    {user?.firstName}
    <br>
    </br>
    {user?.lastName}
    <br>
    </br>
    {user?.id}
    </div>
  )


}

export default Temp