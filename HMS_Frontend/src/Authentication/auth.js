export const doLogin = (data, next) => {
    console.log("Here in Auth ")
    localStorage.setItem('data', JSON.stringify(data))
    next();  
}

export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data == null) {
        return false;
    }
    else {
        return true;
    }
}

export const doLogout = (next) => {
    localStorage.removeItem("data")
    next();
}

export const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).user;
        // String to JSON conversion
    }
    else {
        return undefined;
    }
}

export const getToken = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem('data')).token;
    } else {
        return null;
    }
}