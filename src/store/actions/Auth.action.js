import AUTH from "../constants/Auth.constant";
import { handleError, handleSuccess, post, get } from "../../utils/methods";
import { TOKEN } from "../../utils/asyncStorage/Constants";
import { useNavigation } from "@react-navigation/native";

import {
    _setDataToAsyncStorage,
    getTokenAndSetIntoHeaders,
    getValueIntoLocalStorage,
    removeUserDetail,
} from "../../utils/asyncStorage/Functions";
import { LOGIN, REGISTER, SEND_CODE, VERIFY_CODE } from "../../config/webservices";

export const login = (payload, CB) => async (dispatch) => {
    
    console.log(
        "🚀 ~ file: Auth.action.js ~ line 17 ~ login ~ payload",
        payload
    );

    // dispatch({ type: AUTH.LOGIN_USER_API, loading: false,});
    
    dispatch({ type: AUTH.LOGIN_USER_API, loading: true, isLoggedIn: false});

    try {
        let response = await post(LOGIN, payload);
        console.log("🚀 ~ file: Auth.action.js ~ line 26 ~ login ~ response", response)
        if (response?.data?.error) {
            dispatch({ type: AUTH.LOGIN_USER_API, loading: false });
            handleError(response?.data?.data?.message || "");
        } else {
            await _setDataToAsyncStorage(TOKEN, response?.data?.data?.token);
            await getTokenAndSetIntoHeaders(response?.data?.data?.token);
            dispatch({
                type: AUTH.LOGIN_USER_API,
                loading: false,
                user: response?.data,
                isLoggedIn: true,
            });
        }
        // dispatch({
        //     type: AUTH.LOGIN_USER_API,
        //     loading: false,
        //     user: response?.data,
        //     isLoggedIn: true,
        // });

        // if (response?.data?.error) {
        //     dispatch({ type: AUTH.LOGIN_USER_API, loading: false });
        //     handleError(response?.data?.data?.message || "");
        // } else {
        //     // await _setDataToAsyncStorage(TOKEN, response?.data?.data?.token);
        //     // await getTokenAndSetIntoHeaders(response?.data?.data?.token);
        //     // dispatch({
        //     //     type: AUTH.LOGIN_USER_API,
        //     //     loading: false,
        //     //     user: response?.data?.data?.data,
        //     //     isLoggedIn: true,
        //     // });
        // }
    } catch (error) {
        console.log("🚀 ~ file: Auth.action.js ~ line 42 ~ login ~ error", error)
        alert(error?.data?.message);
        // handleError(error?.data?.error, { autoHide: false });
        // dispatch({ type: AUTH.LOGIN_USER_API, loading: false });
    }
};

export const sendOtp = (payload, CB) => async (dispatch) => {
    dispatch({ type: AUTH.SEND_OTP, loading: true });

    // try {
        console.log('----------');
        let response = await post(SEND_CODE, payload);
        
        if (response?.data?.error) {
            handleError(response?.data?.data?.message || "");
            CB && CB(response?.data);
        } else {
            // navigation.navigate("otp_verification", {
            //     phone: payload.phone,
            // });
            handleSuccess(response?.data?.data?.message);
            {
                return (
                    dispatch({ type: AUTH.SEND_OTP, loading: false }) && {
                        type: AUTH.SEND_OTP,
                        loading: false,
                        response,
                    }
                );
            }

            CB && CB({ ...response?.data?.data, ...payload });
        }
        console.log('-------*********');
        dispatch({ type: AUTH.SEND_OTP, loading: false });
    // } catch (error) {
    //     console.log(error);
    //     alert(error.data.message.invalid+' | '+error.data.message.response)
    //     handleError(error?.data?.error, { autoHide: false });
    //     dispatch({ type: AUTH.SEND_OTP, loading: false });
    // }
};

export const resendOtp = (payload, CB) => async (dispatch) => {};

export const verifyOtp = (payload, CB) => async (dispatch) => {
    dispatch({ type: AUTH.VERIFY_OTP, loading: true });

    try {
        let response = await post(VERIFY_CODE, payload);
        console.log(
            "🚀 ~ file: Auth.action.js ~ line 90 ~ verifyOtp ~ response",
            response
        );

        if (response?.data?.error) {
            handleError(response?.data?.data?.message || "");
            CB && CB(response?.data);
        } else {
            // navigation.navigate("otp_verification", {
            //     phone: payload.phone,
            // });
            handleSuccess(response?.data?.data?.message);
            {
                return (
                    dispatch({ type: AUTH.VERIFY_OTP, loading: false }) && {
                        type: AUTH.VERIFY_OTP,
                        loading: false,
                        response,
                    }
                );
            }
        }
        dispatch({ type: AUTH.VERIFY_OTP, loading: false });
    } catch (error) {
        console.log(
            "🚀 ~ file: Auth.action.js ~ line 58 ~ sendOtp ~ error",
            error
        );
        handleError(error?.data?.error, { autoHide: false });
        dispatch({ type: AUTH.VERIFY_OTP, loading: false });
    }
};

export const signUp = (payload, CB) => async (dispatch) => {
    dispatch({ type: AUTH.SIGN_UP_USER_API, loading: true });
    try {
        let response = await post(REGISTER, payload);
        if (response?.data?.error) {
            handleError(response?.data?.message || "");
            dispatch({ type: AUTH.SIGN_UP_USER_API, loading: false });
        } else {
            dispatch({
                type: AUTH.SIGN_UP_USER_API,
                loading: false,
                user: response?.data?.data,
                isLoggedIn: true,
                isIntialRootRoute:false
            });
        }
    } catch (error) {
        console.log(
            "🚀 ~ file: Auth.action.js ~ line 116 ~ signUp ~ error",
            error?.data?.message
        );
        handleError(error?.data?.message, { autoHide: true });
        dispatch({ type: AUTH.SIGN_UP_USER_API, loading: false });
    }
};

export const getProfile = (payload, CB) => async (dispatch) => {
    // let token = await getValueIntoLocalStorage(TOKEN);
    // if(token) {

    //     await getTokenAndSetIntoHeaders(token);
    //     dispatch({type: AUTH.GET_USER_PROFILE, loading: true});
    //     try {
    //         let response = await post("user/profile", payload);
    //         if(response?.data?.error) {
    //             handleError(response?.data?.data?.message || '');
    //             dispatch({type: AUTH.GET_USER_PROFILE, loading: false});
    //         } else {
    //             dispatch({type: AUTH.GET_USER_PROFILE, loading: false, user: response?.data?.data?.data, isLoggedIn: true});
    //         }
    //     } catch (error) {
    //         handleError(error?.data?.error, {autoHide: false});
    //         dispatch({ type: AUTH.GET_USER_PROFILE, loading: false});
    //     }
    // }
};

export const guestCheckout = (payload, CB) => async (dispatch) => {
    dispatch({ type: AUTH.GUEST_CHECKOUT, loading: true });
    try {
        let response = await post(REGISTER, payload);
        console.log("🚀 ~ file: Auth.action.js ~ line 198 ~ guestCheckout ~ response", response)
        if (response?.data?.error) {
            handleError(response?.data?.message || "");
            dispatch({ type: AUTH.GUEST_CHECKOUT, loading: false });
        } else {
            dispatch({
                type: AUTH.GUEST_CHECKOUT,
                guestLogin:true,
                loading:false,
                user: response?.data,
            });
        }
        await _setDataToAsyncStorage(TOKEN, response?.data?.data?.token);
        await getTokenAndSetIntoHeaders(response?.data?.data?.token);
        handleSuccess(response?.data?.data?.message);

        CB && CB(response?.data)
        
    } catch (error) {
        console.log(
            error
        );
        handleError(error?.data?.data, { autoHide: true });
        dispatch({ type: AUTH.GUEST_CHECKOUT, loading: false });
    }
};

export const userLogout =
    (showToast = true, type, message = "Successfully logout!") =>
    async (dispatch) => {
        // if(showToast) {
        //     if(type === 'expire') {
        //         handleError(message);
        //     } else {
        //         // handleSuccess(message);
        //     }
        // }
        dispatch({ type: AUTH.LOGOUT_USER_API , isLoggedIn:false});
        // await removeUserDetail();
    };
