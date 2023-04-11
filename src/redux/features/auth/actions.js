import axios from "axios";
import { setToast } from "../../../utils/extraFunctions";
import { removeItem, setItem } from "../../../utils/localstorage";
import { GET_TOKEN, REMOVE_TOKEN, SHOW_LOGIN_PAGE, SHOW_RESET_PAGE } from "./actionTypes";
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';


export const showLoginPage = () => ({ type: SHOW_LOGIN_PAGE });

export const showResetPage = () => ({ type: SHOW_RESET_PAGE });

export const getToken = (payload) => ({ type: GET_TOKEN, payload });

export const removeToken = () => ({ type: REMOVE_TOKEN });


export const getSignupSuccess = (data, toast, navigate) => async (dispatch) => {
    try {
        console.log(data)
        const name = data.firstName + " " + data.lastName
        const { user } = await Auth.signUp({
            username: data.email,
            password: data.password,
            attributes: {
                given_name: data.firstName,
                family_name: data.lastName,
                name
            },
            autoSignIn: {
                enabled: true,
            }
        });
        console.log(user);
        // dispatch(getToken(res));
        // setItem('token', res.token);
        setItem('user', {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            name,
        });
        setToast(toast, 'Cadastro realizado com sucesso', 'success');
        navigate("/confirmAccount");
    } catch (err) {
        console.log("erro no signup: " + err);
        setToast(toast, err.response.data.message, 'error');
    }
};

export const getLoginSuccess = (data, toast, navigate) => async (dispatch) => {
    try {
        const user = await Auth.signIn(data.email, data.password);
        console.log(user)
        const token = user.signInUserSession.accessToken.jwtToken
        setItem('user', {
            email: data.email,
            firstName: user.attributes.given_name,
            lastName: user.attributes.family_name,
            name: user.attributes.name,
        });
        setItem('token', token);
        dispatch(getToken(token));
        console.log(user.signInUserSession.accessToken.jwtToken)
        navigate("/");
    } catch (err) {
        console.log(err);
        setToast(toast, err.response.data.message, 'error');
    }
};

export const getLoginByGoogleSuccess = () => async (dispatch) => {
    try {
        const data = await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
        console.log(data)
    } catch (err) {
        console.log(err);
    }
};

export const setUserData = async () => {
    try {
        console.log("passou no setuserdata")
        const data = await Auth.currentAuthenticatedUser();
        console.log(data)
        const token = data.signInUserSession.accessToken.jwtToken
        setItem('user', {
            email: data.attributes.email,
            firstName: data.attributes.given_name,
            lastName: data.attributes.family_name,
            name: data.attributes.name,
        });
        setItem('token', token);
        dispatch(getToken(token));
        console.log(data.signInUserSession.accessToken.jwtToken)
    } catch (err) {
        console.log(err);
    }
};
export const logout = async () => {
    try {
        console.log("passou no logout")
        const data = await Auth.signOut();
        removeItem('token');
        removeItem('user');
        dispatch(removeToken());
        console.log(data)
    } catch (err) {
        console.log(err);
    }
};


export const logoutFromAccount = (toast) => async (dispatch) => {
    try {
        await Auth.signOut();
        removeItem('token');
        removeItem('user');
        dispatch(removeToken());
        setToast(toast, 'Logout Successfully', 'success');
    } catch (err) {
        console.log(err);
        setToast(toast, 'Something went wrong', 'error');
    }
};