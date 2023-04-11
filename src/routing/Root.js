import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TabBar } from "../containers";

import {
    HomeStack,
    CartStack,
    LocationStack,
    ProfileStack,
    StoreStack,
    OrderTraking
} from "./stacks";

const Tab = createBottomTabNavigator();

const Root = ({initial}) => {
    return (
        <Tab.Navigator
            initialRouteName={!initial ? "Home" : "Cart"}
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Store" component={StoreStack} />
            <Tab.Screen name="Cart" component={CartStack} />
            <Tab.Screen name="Location" component={LocationStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
            <Tab.Screen name="OrderTraking" component={OrderTraking} />
        </Tab.Navigator>
    );
};

export default Root;
