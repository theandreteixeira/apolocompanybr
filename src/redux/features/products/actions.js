import { GET_DATA_ERROR, GET_DATA_LOADING, GET_DATA_SUCCESS, GET_PRICE_RANGE, NAME_A_TO_Z, NAME_Z_TO_A, RATING_HIGH_TO_LOW, RATING_LOW_TO_HIGH, RESET_FILTERS, SET_ALL_FILTERS, SORT_HIGH_TO_LOW, SORT_LOW_TO_HIGH } from "./actionTypes";
import axios from "axios";
import { Product } from "../cart/actions";


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
        await new Promise(res => setTimeout(() => res(true), 3000));
        let barcelona = new Product({
            name: 'Camisa Barcelona',
            description: 'Camisa do Barcelona para a temporada 23/24',
            photos: ['https://imgnike-a.akamaihd.net/1920x1920/02192515.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A1.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A2.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A3.jpg'],
            gender: 'Masculino',
            price: 149.99,
            category: 'Futebol',
            color: 'Azul',
            rating: 4.9,
            handleSection: null,
            sizes: ['P', 'M', 'G', 'GG']
        });
        let liverpool = new Product({
            name: 'Camisa Nike Liverpool I 2022/23 Torcedor Pro Masculina',
            description: 'Camisa do Barcelona para a temporada 23/24',
            photos: ['https://imgnike-a.akamaihd.net/1920x1920/021924P1.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/021924P1A1.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/021924P1A2.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/021924P1A3.jpg'],
            gender: 'Masculino',
            price: 149.99,
            category: 'Futebol',
            color: 'Azul',
            rating: 4.9,
            handleSection: null,
            sizes: ['P', 'M', 'G', 'GG']
        });
        let brasil = new Product({
            name: 'Camisa Nike Brasil II 2022/24 Torcedor Pro Masculina',
            description: 'Camisa do Barcelona para a temporada 23/24',
            photos: ['https://imgnike-a.akamaihd.net/1920x1920/02284415.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02284415A1.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02284415A2.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02284415A3.jpg'],
            gender: 'Masculino',
            price: 149.99,
            category: 'Futebol',
            color: 'Azul',
            rating: 4.9,
            handleSection: null,
            sizes: ['P', 'M', 'G', 'GG']
        });
        dispatch(getDataSuccess([barcelona, liverpool, brasil]));
    } catch (err) {
        console.log(err);
        dispatch(getDataError());
    }
};


