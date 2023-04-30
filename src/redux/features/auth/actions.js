import axios from "axios";
import { setToast } from "../../../utils/extraFunctions";
import { getItem, removeItem, setItem } from "../../../utils/localstorage";
import { GET_TOKEN, REMOVE_TOKEN, SHOW_LOGIN_PAGE, SHOW_RESET_PAGE } from "./actionTypes";
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { getItemSession } from "../../../utils/sessionStorage";
import { print } from "../../../utils/print";


export const showLoginPage = () => ({ type: SHOW_LOGIN_PAGE });

export const showResetPage = () => ({ type: SHOW_RESET_PAGE });

export const getToken = (token, user) => ({ type: GET_TOKEN, payload: { token, user } })

export const removeToken = () => ({ type: REMOVE_TOKEN });


export const getSignupSuccess = (data, toast, navigate) => async (dispatch) => {
    try {
        print(data)
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
        print(user);
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
        print("erro no signup: " + err);
        setToast(toast, err.response.data.message, 'error');
    }
};

export const getLoginSuccess = (data, toast, navigate, setIsLoading) => async (dispatch) => {
    try {
        setIsLoading(true)
        const user = await Auth.signIn(data.email, data.password);
        print(user)
        const token = user.signInUserSession.accessToken.jwtToken
        const userData = {
            id: user.attributes.sub,
            email: data.email,
            firstName: user.attributes.given_name,
            lastName: user.attributes.family_name,
            name: user.attributes.name,
        }
        setItem('user', userData);
        setItem('token', token);
        dispatch(getToken(token, userData));
        setIsLoading(false)
        navigate(-1);
    } catch (err) {
        print(err);
        setIsLoading(false)
        setToast(toast, "erro ao fazer login", 'error');
    }
};

export const getLoginByGoogleSuccess = () => async (dispatch) => {
    try {
        const data = await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
        print(data)
    } catch (err) {
        print(err);
    }
};

export const setUserData = (navigate) => async (dispatch) => {
    try {
        print("passou no setuserdata")
        const data = await Auth.currentAuthenticatedUser();
        print(data)
        const token = data.signInUserSession.accessToken.jwtToken
        const userData = {
            id: data.attributes.sub,
            email: data.attributes.email,
            firstName: data.attributes.given_name,
            lastName: data.attributes.family_name,
            name: data.attributes.name,
        }
        setItem('user', userData);
        setItem('token', token);
        dispatch(getToken(token, userData));
        const path = getItemSession('previousPath') ?? '/'
        print('pathhhh:', path)
        navigate(path)
    } catch (err) {
        print(err);
    }
};


export const logoutFromAccount = (toast, navigate) => async (dispatch) => {
    try {
        await Auth.signOut();
        removeItem('token');
        removeItem('user');
        dispatch(removeToken());
        navigate('/')
    } catch (err) {
        print(err);
        setToast(toast, 'Something went wrong', 'error');
    }
};