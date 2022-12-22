import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Platform, StatusBar } from "react-native";
import { Auth, Root } from "./src/routing";
import { getCountries } from "./src/store/actions/Global.action";
import { CLoading, CText } from "./src/uiComponents";
import SplashScreen from "react-native-splash-screen";
import { Setting } from "./src/pages/protected";
import './src/utils/i18n/lan';
import {useTranslation} from 'react-i18next';
import {changeLanguage} from './src/store/actions/Language.action'
import CForm from './src/pages/protected/checkout/addAddressForm/addAddressFrom.js'

const App = () => {
    const {t, i18n} = useTranslation();

    const dispatch = useDispatch();

        const reduxState = useSelector(({ auth  , root , language}) => {
            console.log("🚀 ~ file: App.js ~ line 13 ~ reduxState ~ auth", auth);
            return {
                getUserProfileLoading: auth.getUserProfileLoading,
                isLoggedIn: auth.isLoggedIn,
                user: auth.user,
                language:language?.language?.lan
            };
        });
       const dY = useSelector((state)=>console.log('============',state))

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);
        dispatch(getCountries());
        dispatch(changeLanguage({lan:'ar'}));
        changeLang()

    }, []);
    useEffect(()=>{
        changeLang()
    },[reduxState?.language])

    const changeLang = () => {
        i18n
          .changeLanguage(reduxState?.language)
          .then(() => {})
          .catch(err => console.log(err));
      };

    const renderRouting = (value, initial) => {
        switch (value) {
            case true:
                return <Root />;
            case false:
                return <Auth initial={initial} />;
            default:
                return null;
        }
    };

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            {reduxState?.getUserProfileLoading ? (
                <CLoading loading={reduxState?.getUserProfileLoading} />
            ) : (
                reduxState?.isLoggedIn ?  <Root /> : <Auth initial={reduxState?.isIntialRoute} />
                // renderRouting(reduxState?.isLoggedIn, reduxState?.isIntialRoute)
            )}
            {/* <Setting /> */}
        </View>
    );
};

export default App;
