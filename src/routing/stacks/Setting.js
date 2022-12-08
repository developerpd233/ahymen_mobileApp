import * as React from "react";
import {Setting} from "../../pages/protected";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackScreenOptions = {
    headerShown: false
};

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Setting" screenOptions={StackScreenOptions}>
            <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
    );
}
export default HomeStack;
