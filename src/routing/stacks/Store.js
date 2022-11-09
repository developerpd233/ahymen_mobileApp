import * as React from "react";
import {
    Store,
    ProductTypes,
    Products,
    ProductDetail,
    AddGiftCard,
    Cart,
    Proceed,
    Checkout,
    GuestCheckout
} from "../../pages/protected";
import {createStackNavigator} from "@react-navigation/stack";
import Location from "../../pages/protected/location/Location";

const Stack = createStackNavigator();

const StackScreenOptions = {
    headerShown: false
};

function StoreStack() {
    return (
        <Stack.Navigator initialRouteName="store" screenOptions={StackScreenOptions}>
            <Stack.Screen name="store" component={Store} />
            <Stack.Screen name="product_types" component={ProductTypes} />
            <Stack.Screen name="products" component={Products} />
            <Stack.Screen name="product_detail" component={ProductDetail} />

            <Stack.Screen name="cart" component={Cart} />
            <Stack.Screen name="guest_checkout" component={GuestCheckout} />

            <Stack.Screen name="add_gift_card" component={AddGiftCard} />
            <Stack.Screen name="proceed" component={Proceed} />
            <Stack.Screen name="checkout" component={Checkout} />
            <Stack.Screen name="location" component={Location} />

        </Stack.Navigator>
    );
}
export default StoreStack;
