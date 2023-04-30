import { print } from "./print";

export const setItemSession = (key, value) => {
    print("setando " + key + " com valor: " + value)
    return sessionStorage.setItem(key, JSON.stringify(value));
};


export const getItemSession = (key) => {
    try {
        if (sessionStorage.getItem(key)) {
            print(key, sessionStorage.getItem(key))
            return JSON.parse(sessionStorage.getItem(key));
        }
        return undefined;
    } catch (error) {
        print("erro dentro do session storagte: ")
        print(error)
    }
};


export const removeItemSession = (key) => {
    return sessionStorage.removeItem(key);
};