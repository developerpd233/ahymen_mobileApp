import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TabBar } from "../containers";

import {
    HomeStack,
    CartStack,
    LocationStack,
    ProfileStack,
    StoreStack,
} from "./stacks";

const Tab = createBottomTabNavigator();

const Root = ({rootIntial}) => {
    return (
        <Tab.Navigator
            initialRouteName={!rootIntial ? "Home" : "Cart"}
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Store" component={StoreStack} />
            <Tab.Screen name="Cart" component={CartStack} />
            <Tab.Screen name="Location" component={LocationStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    );
};

export default Root;
