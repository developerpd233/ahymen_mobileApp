import * as React from "react";
import {Cart, AddGiftCard, Checkout, Proceed, GuestCheckout} from "../../pages/protected";
import {createStackNavigator} from "@react-navigation/stack";
import Location from "../../pages/protected/location/Location";

const Stack = createStackNavigator();

const StackScreenOptions = {
    headerShown: false
};

function CartStack() {
    return (
        <Stack.Navigator initialRouteName="cart" screenOptions={StackScreenOptions}>
            <Stack.Screen name="cart" component={Cart} />
            <Stack.Screen name="add_gift_card" component={AddGiftCard} />
            <Stack.Screen name="proceed" component={Proceed} />
            <Stack.Screen name="checkout" component={Checkout} />
            <Stack.Screen name="guest_checkout" component={GuestCheckout} />
            <Stack.Screen name="location" component={Location} />
        </Stack.Navigator>
    );
}
export default CartStack;
