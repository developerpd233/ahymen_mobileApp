import * as React from "react";
import {Home} from "../../pages/protected";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackScreenOptions = {
    headerShown: false
};

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={StackScreenOptions}>
            <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
    );
}
export default HomeStack;
