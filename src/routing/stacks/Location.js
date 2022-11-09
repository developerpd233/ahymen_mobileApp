import * as React from "react";
// import {Location} from "../../pages/protected";
import Location from "../../pages/protected/location/Location";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackScreenOptions = {
    headerShown: false
};

function LocationStack() {
    return (
        <Stack.Navigator initialRouteName="location" screenOptions={StackScreenOptions}>
            <Stack.Screen name="location" component={Location} />
        </Stack.Navigator>
    );
}
export default LocationStack;
