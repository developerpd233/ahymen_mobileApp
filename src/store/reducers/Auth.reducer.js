import AUTH from "../constants/Auth.constant";

const initialState = {
    loginLoading: false,
    signUpLoading: false,
    isLoggedIn: true,
    isIntialRoute: true,
    user: {},
    getUserProfileLoading: false,
    sendOtpLoading: false,
    reSendOtpLoading: false,
    verifyOtpLoading: false,
    isIntialRootRoute: true,

};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case AUTH.LOGIN_USER_API:
            return {
                ...state,
                loginLoading: action.loading,
                isLoggedIn: action.isLoggedIn,
            };

        case AUTH.LOGOUT_USER_API:
            return { ...state, isLoggedIn: false };

        case AUTH.GET_USER_PROFILE:
            return {
                ...state,
                getUserProfileLoading: action.loading || false,
                user: action.user || {},
                isLoggedIn: action.isLoggedIn || false,
            };

        case AUTH.SIGN_UP_USER_API:
            return { ...state, signUpLoading: action.loading  , isLoggedIn:action.isLoggedIn , user:action.user , isIntialRootRoute:action.isIntialRootRoute};

        case AUTH.UPDATE_USER:
            return { ...state, user: action.user };

        case AUTH.SEND_OTP:
            return { ...state, sendOtpLoading: action.loading };
        case AUTH.RESEND_OTP:
            return { ...state, reSendOtpLoading: action.loading };
        case AUTH.VERIFY_OTP:
            return { ...state, verifyOtpLoading: action.loading };

        default:
            return state;
    }
};
