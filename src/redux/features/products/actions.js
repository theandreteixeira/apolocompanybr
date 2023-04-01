import { GET_DATA_ERROR, GET_DATA_LOADING, GET_DATA_SUCCESS, GET_PRICE_RANGE, NAME_A_TO_Z, NAME_Z_TO_A, RATING_HIGH_TO_LOW, RATING_LOW_TO_HIGH, RESET_FILTERS, SET_ALL_FILTERS, SORT_HIGH_TO_LOW, SORT_LOW_TO_HIGH } from "./actionTypes";
import axios from "axios";


export const getDataLoading = () => ({ type: GET_DATA_LOADING });

export const getDataSuccess = (payload) => ({ type: GET_DATA_SUCCESS, payload });

export const getDataError = () => ({ type: GET_DATA_ERROR });

export const sortLowToHigh = () => ({ type: SORT_LOW_TO_HIGH });

export const sortHighToLow = () => ({ type: SORT_HIGH_TO_LOW });

export const ratingLowToHigh = () => ({ type: RATING_LOW_TO_HIGH });

export const ratingHighToLow = () => ({ type: RATING_HIGH_TO_LOW });

export const nameAtoZ = () => ({ type: NAME_A_TO_Z });

export const nameZtoA = () => ({ type: NAME_Z_TO_A });

export const getPriceRange = (payload) => ({ type: GET_PRICE_RANGE, payload });

export const setAllFilters = (payload) => ({ type: SET_ALL_FILTERS, payload });

export const resetFilters = () => ({ type: RESET_FILTERS });



//Action Functions
export const getRequest = (path) => async (dispatch) => {
    try {
        dispatch(getDataLoading());
        // await axios.get('/men');
        await new Promise(res => setTimeout(() => res(true), 4000));
        const dataMock = [
            { title: 'Camisa Barcelona 21/22', description: 'Camisa do Barcelona Casa', color: 'FF0000', rating: 2.9, price: 149.99, size: ['P', 'M'], gender: 'men', img: ['https://imgnike-a.akamaihd.net/1920x1920/02192515.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A1.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A2.jpg'], onClick: undefined, category: 'Futebol' },
            { title: 'Camisa Barcelona 21/22', description: 'Camisa do Barcelona Casa', color: 'FF0000', rating: 2.9, price: 149.99, size: ['P', 'M'], gender: 'men', img: ['https://imgnike-a.akamaihd.net/1920x1920/02192515.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A1.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A2.jpg'], onClick: undefined, category: 'Futebol' },
            { title: 'Camisa Barcelona 21/22', description: 'Camisa do Barcelona Casa', color: 'FF0000', rating: 2.9, price: 149.99, size: ['P', 'M'], gender: 'men', img: ['https://imgnike-a.akamaihd.net/1920x1920/02192515.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A1.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A2.jpg'], onClick: undefined, category: 'Futebol' },
        ];
        dispatch(getDataSuccess(dataMock));
    } catch (err) {
        console.log(err);
        dispatch(getDataError());
    }
};


