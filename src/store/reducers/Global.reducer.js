import GLOBAL from "../constants/Global.constant";

const initialState = {
    allCountries: [],
    countries: [],
    currentCountry: {},
    getCountriesLoading: true,
    uuid: '',
    termAndConditions: {},
    currentLocation: {},
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GLOBAL.GET_COUNTRIES:
            return { ...state,
                countries: action.countries.sort((a, b) => a.name.common.localeCompare(b.name.common)),
                currentCountry: action.currentCountry,
                allCountries: action.allCountries.sort((a, b) => a.name.common.localeCompare(b.name.common)),
                getCountriesLoading: action.loading
            };

        case GLOBAL.SET_UUID:
            return { ...state, uuid: action.id };

        case GLOBAL.VIEW_TERMS_AND_CONDITIONS:
            return { ...state, termAndConditions: action.data };

        case GLOBAL.CURRENT_LOCATION:
            return { ...state, currentLocation: action.data };
        default:
            return state;
    }
};
