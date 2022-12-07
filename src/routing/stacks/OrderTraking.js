import * as React from "react";
// import {Location} from "../../pages/protected";
import Ordertraking from "../../pages/protected/OrderTraking/Ordertraking";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackScreenOptions = {
    headerShown: false
};

function OrdertrakingStake() {
    return (
        <Stack.Navigator initialRouteName="location" screenOptions={StackScreenOptions}>
            <Stack.Screen name="Ordertraking" component={Ordertraking} />
        </Stack.Navigator>
    );
}
export default OrdertrakingStake;
