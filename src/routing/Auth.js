import React, { useEffect, useState } from "react";
import Welcome from "../pages/welcome/Welcome";
import { SignIn, OtpVerification, UserInformation } from "../pages/auth";
import { useDispatch } from "react-redux";
import { CLoading } from "../uiComponents";
import { createStackNavigator } from "@react-navigation/stack";
import { getValueIntoAsyncStorage } from "../utils/asyncStorage/Functions";
import { WELCOME_SCREEN } from "../utils/asyncStorage/Constants";
import { signUp } from "../store/actions/Auth.action";
import Signup from "../pages/auth/signUp/Signup";

export const Stack = createStackNavigator();

function Auth({ initial }) {
    const dispatch = useDispatch();

    const [initialRouteName, updateInitialRouteName] = useState(null);

    const getAndCheck = async () => {
        let val = await getValueIntoAsyncStorage(WELCOME_SCREEN);
        if (val === "hide") {
            updateInitialRouteName(initial ? "welcome" : "sign_in");
        } else {
            updateInitialRouteName(initial ? "welcome" : "sign_in");
        }
    };

    useEffect(() => {
        (async () => {
            await getAndCheck();
        })();
    }, []);

    // Layout /
    const Layout = (initialRouteName) => {
        if (initialRouteName !== null) {
            return (
                <Stack.Navigator
                    initialRouteName={initialRouteName}
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="welcome" component={Welcome} />
                    <Stack.Screen name="sign_in" component={SignIn} />
                    <Stack.Screen name="login" component={Signup} />

                    <Stack.Screen
                        name="otp_verification"
                        component={OtpVerification}
                    />
                    <Stack.Screen
                        name="user_information"
                        component={UserInformation}
                    />
                </Stack.Navigator>
            );
        } else {
            return <CLoading showAnimation={true} loading={true} />;
        }
    };

    return Layout(initialRouteName);
}

export default React.memo(Auth);