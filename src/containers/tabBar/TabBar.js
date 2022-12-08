import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {SafeAreaView} from "../index";
import Styles from './TabBar.style';
import Icon from '../../assets/icons/CustomIcon';
import {MappedElement, getLayoutDirection} from "../../utils/methods";
import {themes} from "../../theme/colors";
import {CText} from "../../uiComponents";
import posed from "react-native-pose";
import '../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';
const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 5;
const SpotLight = posed.View({
    route0: { x: 0 },
    route1: { x: getLayoutDirection() ? -tabWidth : tabWidth },
    route2: { x: getLayoutDirection() ? -tabWidth * 2 : tabWidth * 2 },
    route3: { x: getLayoutDirection() ? -tabWidth * 3 : tabWidth * 3 },
    route4: { x: getLayoutDirection() ? -tabWidth * 4 : tabWidth * 4 },
    route5: { x: getLayoutDirection() ? -tabWidth * 5 : tabWidth * 5 },
});

function TabBar(props) {
    const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');
    const reduxState = useSelector(({ auth, root, language }) => {
        return {
            loading: root.categoryLoadingproduct,
            data: root.subcategoryProduct,
            language:language?.language?.lan

        };
    });


    const {navigation, state} = props;

    const [stateIndex, updateStateIndex] = useState(0);

    const tabName = ['home', 'store', 'cart', 'location', 'profile'];

    useEffect(() => {
        let currentRouteName = getCurrentRouteName(state)?.toLowerCase();
        if(tabName.includes(currentRouteName)){
            updateStateIndex(tabName?.indexOf(currentRouteName))
        }
    }, [state]);

    const getCurrentRouteName = (data) => {
        const routeName = data && data.routes[data.index].state
            ? data.routes[data.index].state.routes[data.routes[data.index].state.index].name
            : data ? data.routes[data.index].name : data.params?.screen || 'home';
        return routeName
    };

    const getTabBarVisibility = (data) => {
        return true;
    };

    const routes = [
        {
            name: t('Home'),
            key: 'home',
            icon: 'home',
            onPress: () => navigation.navigate('Home'),
            fontSize: 32,
            marginTop: -40
        },
        {
            name: t('Search'),
            key: 'store',
            icon: 'search',
            onPress: () => navigation.navigate('Store', {
                screen: 'store',
                initial: false
            }),
            fontSize: 30
        },
        {
            name: t('Cart'),
            key: 'cart',
            icon: 'bookmark',
            onPress: () =>  navigation.navigate('Cart', {
                screen: 'cart',
                initial: false
            }),
            // onPress: () =>  navigation.navigate('Cart'),
            fontSize: 30
        },
        {
            name: t('Location'),
            key: 'location',
            icon: 'pin-location',
            onPress: () => navigation.navigate('Location'),
            fontSize: 30
        },
        {
            name: t('Profile'),
            key: 'profile',
            icon: 'user-2',
            onPress: () => navigation.navigate('Profile'),
            fontSize: 30
        },
    ];

    if(!getTabBarVisibility(state)) { return null }

    return (
        <SafeAreaView edges={['left', 'right', 'bottom']}
                      style={Styles.tabContainer}>

            <View style={Styles.absoluteFillObject}>
                <SpotLight style={[Styles.spotLight, {width: tabWidth}]} pose={`route${state?.index}`}>
                    <View style={Styles.spotLightInner}>
                    </View>
                </SpotLight>
            </View>

            <View style={Styles.tabInnerContainer}>
                <MappedElement
                    data={routes}
                    renderElement={(route, i) => {
                        const isRouteActive = route?.key === getCurrentRouteName(state)?.toLowerCase();
                        return (
                            <TouchableOpacity key={i} onPress={route.onPress} style={Styles.tab}>
                                <Icon name={route.icon}
                                           style={[Styles.tabIcon, {
                                               fontSize: route?.fontSize,
                                               color: isRouteActive ? themes['light'].colors.secondary : themes['light'].colors.gray8
                                           }]} />
                                <CText style={Styles.tabText}>{route?.name}</CText>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
       

        </SafeAreaView>
    );
}

export default React.memo(TabBar)
