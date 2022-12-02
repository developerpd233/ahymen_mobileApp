import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Platform, StatusBar } from "react-native";
import { Auth, Root } from "./src/routing";
import { getCountries } from "./src/store/actions/Global.action";
import { CLoading, CText } from "./src/uiComponents";
import SplashScreen from "react-native-splash-screen";
import { Setting } from "./src/pages/protected";

const App = () => {
    const dispatch = useDispatch();

        const reduxState = useSelector(({ auth  , root , tranaslate}) => {
            console.log("🚀 ~ file: App.js ~ line 13 ~ reduxState ~ auth", tranaslate);
            return {
                getUserProfileLoading: auth.getUserProfileLoading,
                isLoggedIn: auth.isLoggedIn,
                user: auth.user,
            };
        });

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);
        dispatch(getCountries());
        // dispatch(getProfile());
    }, []);

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
