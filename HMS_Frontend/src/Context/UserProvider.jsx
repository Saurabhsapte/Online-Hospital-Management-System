import React, { useEffect, useState } from 'react'
import { getCurrentUserDetail, isLoggedIn } from '../Authentication/auth'
import UserContext from './UserContext'

function UserProvider({children}) {
    
    const [user, setUser] = useState({
        data: {},       
        login: false
    })
  
    useEffect(() => {
        setUser({ 
            data: getCurrentUserDetail(),
            login: isLoggedIn()
        })
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>

        )
}

export default UserProvider
