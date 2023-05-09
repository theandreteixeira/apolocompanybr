import { print } from './print'

export const setItem = (key, data) => {
    print(key, data)
    return localStorage.setItem(key, JSON.stringify(data));
};


export const getItem = (key) => {
    print('keyyyy', localStorage.getItem(key))
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
    return undefined;
};

export const removeItem = (key) => {
    return localStorage.removeItem(key);
};