import axios from "axios";
import {logout} from "../store/actions/Auth.action";
import {store} from '../store/store';
import {_setDataToAsyncStorage, getTokenAndSetIntoHeaders} from "./asyncStorage/Functions";
import {TOKEN} from "./asyncStorage/Constants";

export const isUat = false;

let baseUrl = '';

const interceptor = () => {

    axios.defaults.baseURL = baseUrl;

    axios.interceptors.request.use(
        function (config) {
            return config;
        },
        function (error) {
            console.log('error', error);
            return Promise.reject(error.response);
        }
    );
    axios.interceptors.response.use(
        function (response) {
            (async () => {
                if(response?.headers?.token){
                    await _setDataToAsyncStorage(TOKEN, response?.headers?.token);
                    await getTokenAndSetIntoHeaders(response?.headers?.token);
                }
            })();
            if(response?.data?.error && response?.data?.data?.message === 'Session expired.') {
                store.dispatch(logout(true, 'expire', response?.data?.data?.message))
            }
            return response;
        },
        function (error) {
            console.log('error', error);
            console.log('error message', error.response);
            if(error?.response?.status === 401){
                // store.dispatch(logout(true, 'expire', error?.response?.data?.Message))
            }
            return Promise.reject(error.response);
        }
    );
};

export {
    baseUrl,
    interceptor
}
