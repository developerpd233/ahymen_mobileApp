import React from 'react';
import SafeAreaView from '../safeAreaView/SafeAreaView';
import { View, TouchableOpacity } from 'react-native';
import Styles from './Header.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from '../../assets/icons/CustomIcon';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from "react-redux";
import {getLayoutDirection} from "../../utils/methods";
import {CText, ProgressiveImage} from "../../uiComponents";

function Header(props) {

    const navigation = useNavigation();

    const {headerLeft, headerTitle = ' ', headerTitleElement, headerRight = true, backOnPress, style,
        showCart = false,
        hideBackButton = true,
        backButtonIcon = 'back-arrow',
        showCenterLogo = false,
        goBackWithRoute,
        transparent, theme
    } = props;

    const {isLoggedIn} = useSelector(({auth }) => {
        return {
            isLoggedIn: auth.isLoggedIn,
        }
    });
    const addCart = useSelector(state => state.cart); 
    // console.log("🚀 ~ file: Header.js ~ line 31 ~ Header ~ addCart", addCart)
    console.log("🚀 ~ file: Header.js ~ line 31 ~ Header ~ addCart")
    

    const renderHeaderTitle = (title) => {
        return <CText style={[Styles.headerTitleStyle, theme === 'light' && Styles.headerLight]}
                      numberOfLines={1}>
            {title}
        </CText>
    };

    const backPress = () => {
        // if(goBackWithRoute){
        //     navigation.reset({
        //         index: 0,
        //         routes: [{name: 'Home'}],
        //     });
            // navigation.goBack()
            // navigation.navigate(goBackWithRoute);
        // } else
        if (backOnPress){
            backOnPress()
        } else {
            navigation.goBack()
        }

    };


    const backButton = () => {
        return hideBackButton ? (
            <TouchableOpacity style={Styles.headerButton} onPress={() => backPress()}>
                <Icons name={backButtonIcon} style={[Styles.headerButtonIcon,
                    {transform: [{ scaleX: getLayoutDirection() ? -1 : 1 }]}]}/>
            </TouchableOpacity>
        ) : <View style={{minWidth: 24}}/>
    };

    const menuButton = () => {
        return (
            <TouchableOpacity style={Styles.headerButton} onPress={() => navigation.toggleDrawer()}>
                <AntDesign name="menu" style={Styles.headerButtonIcon}/>
            </TouchableOpacity>
        )
    };

    const cartButton = () => {
        return (
            <TouchableOpacity style={[Styles.headerCartButton, theme === 'light' && Styles.headerCartLight]}
                              onPress={() => navigation.navigate('Cart')}>
               {  addCart?.length  > 0 && <View style={Styles.headerCartBadge}>
                    <CText style={Styles.headerCartBadgeText}>
                        {addCart?.length}
                    </CText>
                </View>}
                <AntDesign name="shoppingcart"
                           style={[Styles.headerCartButtonIcon, theme === 'light' && Styles.headerLight]}/>
            </TouchableOpacity>
        )
    };

    const otherOptionsButton = () => {
        return (
            <View style={[Styles.otherOptions, !showCart && Styles.otherOptionsButtonSpace]}>
                {isLoggedIn && showCart ? cartButton() : null}
            </View>
        )
    };

    const centerLogo = () => {
        return (
            <View style={Styles.headerLogo}>
                <ProgressiveImage style={Styles.headerLogoImage}
                                  source={require('../../assets/images/logo.png')}/>
            </View>
        )
    };

    return (
        <SafeAreaView style={[Styles.headerStyle, transparent && Styles.headerTransparentStyle, style]} edges={['top']}>
            <View style={[Styles.container, transparent && Styles.headerTransparentStyle]}>
                {headerLeft ? menuButton() : backButton()}
                {showCenterLogo ? centerLogo() : headerTitleElement ? headerTitleElement() : headerTitle ? renderHeaderTitle(headerTitle) : null}
                {headerRight ? otherOptionsButton() : null}
            </View>
        </SafeAreaView>
    );
}

export default React.memo(Header);
