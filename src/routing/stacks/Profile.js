import * as React from "react";
import {Profile, MyInfo, MyOrder} from "../../pages/protected";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackScreenOptions = {
    headerShown: false
};

function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="profile" screenOptions={StackScreenOptions}>
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="my_info" component={MyInfo} />
            <Stack.Screen name="my_order" component={MyOrder} />
        </Stack.Navigator>
    );
}
export default ProfileStack;
