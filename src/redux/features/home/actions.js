import axios from "axios";
import { GET_DATA_ERROR_HOME, GET_DATA_LOADING_HOME, GET_DATA_SUCCESS_CLOTH, GET_DATA_SUCCESS_SHOE } from "./actionTypes";
import { Product } from "../cart/actions";

export const getDataLoadingHome = () => ({ type: GET_DATA_LOADING_HOME });

export const getDataSuccessCloth = (payload) => ({ type: GET_DATA_SUCCESS_CLOTH, payload });

export const getDataSuccessShoe = (payload) => ({ type: GET_DATA_SUCCESS_SHOE, payload });

export const getDataErrorHome = () => ({ type: GET_DATA_ERROR_HOME });


export const getClothData = () => async (dispatch) => {
    try {
        dispatch(getDataLoadingHome());
        let data = await axios.get('/obterProdutos', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": POST, GET,
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Max-Age": 86400
            },
        });
        dispatch(getDataSuccessCloth(data.produtos));
    } catch (err) {
        console.log("erro no getCloth:" + err);
        dispatch(getDataErrorHome());
    }
};

export const getShoeData = () => async (dispatch) => {
    try {
        dispatch(getDataLoadingHome());
        // let res = await axios.get("/shoeData");
        let dataMock = {
            heading: 'Camisa Barcelona',
            description: 'Camisa do Barcelona para a temporada 23/24', img: ['https://imgnike-a.akamaihd.net/1920x1920/02192515.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A1.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A2.jpg', 'https://imgnike-a.akamaihd.net/1920x1920/02192515A3.jpg'], gender: 'male', handleSection: null
        };
        dispatch(getDataSuccessShoe([dataMock]));
    } catch (err) {
        console.log(err);
        dispatch(getDataErrorHome());
    }
};