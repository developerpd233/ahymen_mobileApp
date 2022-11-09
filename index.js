import React from "react";
import App from './App';
import {AppRegistry, LogBox, StatusBar, View} from 'react-native';
import {name as appName} from './app.json';
import {store} from "./src/store/store";
import {Provider} from "react-redux";
import {initialWindowMetrics, SafeAreaProvider} from "react-native-safe-area-context";
import {interceptor} from "./src/utils/intercepter";
import Toast from "react-native-toast-message";
import {navigationRef} from "./src/routing/Ref";
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
LogBox.ignoreAllLogs();

interceptor();

const theme = {
    colors: {
        background: "white",
    },
};
const Container = () => {

    // const routeNameRef = useRef();

    return (
        <NavigationContainer theme={theme} ref={navigationRef}>
            <App />
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
    )
};


function Angelica() {

    return (
        <Provider store={store}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                animated={true}
                barStyle={'dark-content'}/>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <Container />
            </SafeAreaProvider>
        </Provider>
    )

}

AppRegistry.registerComponent(appName, () => Angelica);
