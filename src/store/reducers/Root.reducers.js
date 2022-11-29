import Root from "../constants/Root.constant";
const initialState = {
    categoryLoading: false,
    subcategoryLoading: false,
    categoryLoadingproduct: false,
    trendingLoading: false,
    data: {},
    subcategoryData: {},
    subcategoryProduct: {},
    ordersData:{},
    orderLoading:false,
    // signUpLoading: false,
    // isLoggedIn: true,
    // user: {},
    // getUserProfileLoading: false,
    // sendOtpLoading: false,
    // reSendOtpLoading: false,
    // verifyOtpLoading: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case Root.GET_ALL_CATEGEORY:
            return {
                ...state,
                categoryLoading: action.loading,
                data: action.data,
            };
        case Root.GET_SUB_CATEGEORY:
            return {
                ...state,
                subcategoryLoading: action.loading,
                subcategoryData: action.data,
            };
        case Root.GET_CATEGEORY_PRODUCT:
            return {
                ...state,
                categoryLoadingproduct: action.loading,
                subcategoryProduct: action.data,
            };
        case Root.GET_TRENDING:
            return {
                ...state,
                trendingLoading: action.loading,
                trendingProduct: action.data,
            };
        case Root.SEARCH_CATEGORY:
            return {
                ...state,
                categoryLoading: action.loading,
                data: action.data,
            };
        case Root.SEARCH_SUB_CATEGORY:
            return {
                ...state,
                subcategoryLoading: action.loading,
                subcategoryData: action.data,
            };
        case Root.SEARCH_PRODUCTS:
            return {
                ...state,
                categoryLoadingproduct: action.loading,
                subcategoryProduct: action.data,
            };
            case Root.SAVE_ADDRESS:
                return {
                    ...state,
                    addressLoading: action.loading,
                    addressData: action.data,
                };
            case Root.ORDER:
                return {
                    ...state,
                    orderLoading: action.loading,
                    ordersData: action.data,
            };      
       
  
        default:
            return state;
    }
};
