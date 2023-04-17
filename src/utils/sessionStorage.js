export const setItemSession = (key, value) => {
    console.log("setando " + key + " com valor: " + value)
    return sessionStorage.setItem(key, JSON.stringify(value));
};


export const getItemSession = (key) => {
    try {
        if (sessionStorage.getItem(key)) {
            console.log(key, sessionStorage.getItem(key))
            return JSON.parse(sessionStorage.getItem(key));
        }
        return undefined;
    } catch (error) {
        console.log("erro dentro do session storagte: ")
        console.log(error)
    }
};


export const removeItemSession = (key) => {
    return sessionStorage.removeItem(key);
};