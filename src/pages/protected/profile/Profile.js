import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Switch,Linking } from "react-native";
import { Container } from "../../../containers";
import { CButton, CText } from "../../../uiComponents";
import Styles from "./Profile.style";
import Icon from '../../../assets/icons/CustomIcon';
import { MappedElement } from "../../../utils/methods";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Auth from '../../../store/constants/Auth.constant';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import '../../../utils/i18n/lan';
import { useTranslation } from 'react-i18next';
import {changeLanguage} from '../../../store/actions/Language.action'
import { Image } from 'react-native';
import lanIcon from '../../../assets/images/arabic-icon.png'
import { Icon as MyIcon } from 'react-native-elements';
import { themes } from '../../../theme/colors';

function Profile(props) {
    const { t, i18n } = useTranslation();
    const reduxState = useSelector(({ auth ,language}) => {
        return {
            loading: false,
            user: auth.user,
            language:language?.language?.lan
        };
    });
  const languageStyle = reduxState.language;
  
    const [currentLanguage, setLanguage] = useState('ar');
    const [isEnabled, setIsEnabled] = useState(reduxState?.language !== 'ar' ? true : false);
    const toggleSwitch = () => {
        if(reduxState?.language == 'ar'){
            setIsEnabled(true)
            dispatch(changeLanguage({lan:'en'}));
        }else{
            setIsEnabled(false)
            dispatch(changeLanguage({lan:'ar'}));
        }
    };

   
    const navigation = useNavigation();

  

    const headerProps = {
        headerTitle: t('Profile'),
    };

    const dispatch = useDispatch()

    const logout = async () => {
        try {
            
        await GoogleSignin.signOut()
        dispatch({
            type: Auth.LOGOUT_USER_API,
            user: null,
            isLoggedIn: false,
        });

        } catch (error) {
            dispatch({
                type: Auth.LOGOUT_USER_API,
                user: null,
                isLoggedIn: false,
            });
            
        }
      
    };

    const myProfile = () => {
        reduxState?.user?.data?.token ? navigation.navigate("my_info", {
            isGoBack: true,
        }) :
            dispatch({
                type: Auth.LOGOUT_USER_API,
                loading: false
            })
    };

    const myOrder = () => {
        reduxState?.user?.data?.token ? navigation.navigate("my_order", {
            isGoBack: true,
        }) :
            dispatch({
                type: Auth.LOGOUT_USER_API,
                loading: false
            })
    };

    const myWishlist = () => {
        reduxState?.user?.data?.token ? navigation.navigate("my_wishlist", {
            isGoBack: true,
        }) :
            dispatch({
                type: Auth.LOGOUT_USER_API,
                loading: false
            })
    };
const customerServices = () => {
    Linking.openURL('https://wa.me/966556033144')
}
    const menu = [
        {
            title: t("My_info"),
            onPress: () => myProfile(), //navigation.navigate('my_info'),
            icon: 'user',
            type:'antdesign'
        },
        {
            title: t('My_order'),
            onPress: () => myOrder(), //navigation.navigate('my_order'),
            icon: 'book',
            type:'antdesign'
        },
        {
            title: t('My_Wishlist'),
            onPress: () => myWishlist(),
            icon: 'hearto',
            type:'antdesign'

        },
        // {
        //     title: 'Loremipsum',
        //     onPress: () => null,
        //     icon: 'hand-heart'
        // },
        // {
        //     title: 'Loremipsum',
        //     onPress: () => null,
        //     icon: 'book'
        // },
     
        {
            title: t('Customer_service'),
            onPress: () => { customerServices() },
            icon: 'customerservice',
            type:'antdesign'
            
        },
        {
            title: t('Logout'),
            onPress: () => { logout() },
            icon: 'logout',
            type:'materialIcons'

        },
    ];

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index}
                style={[Styles.listItem, index === 0 && Styles.listItemNone ,{flexDirection: reduxState.language == 'en' ?'row' :'row-reverse' }]}
                onPress={item?.onPress}>
                {item?.icon ? <MyIcon name={item?.icon} type={item?.type} color="rgb(124, 128, 97)" style={[Styles.listItemLeftIcon,  {marginRight:reduxState.language == 'en' ? 20 : 0}]} /> : null}
                <CText style={[Styles.listItemText  ,{paddingRight:15, fontFamily:reduxState.language == 'en'? themes.font.regular : themes.font2.regular }]}>{item?.title}</CText>
                <Icon name={reduxState.language == 'en' ? 'arrow-forward'  : 'back-arrow'} style={[Styles.listItemRightIcon, ]} />
            </TouchableOpacity>
        )   
    };

    return (
        <Container bottomSpace edges={['left', 'right']} scrollView={true} headerProps={headerProps}>
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <CText style={[Styles.headerSubTitle, {fontFamily:reduxState.language == 'en'? themes.font.regular : themes.font2.regular }]}>{t("Welcome")}</CText>
                    <CText style={[Styles.headerTitle, {fontFamily:reduxState.language == 'en'? themes.font.regular : themes.font2.regular }]}>{t("Ahyman")}</CText>
                </View>

                <View style={Styles.list}>
                    <MappedElement
                        data={menu}
                        renderElement={renderItem}
                    />
                </View>
                <View
                    style={[Styles.listItem ,{flexDirection:reduxState.language == 'en' ? "row" : 'row-reverse'}, Styles.listItemNone,]}
                    onPress={() => { }}>
                   <MyIcon name='language' type='ionicon' color="rgb(124, 128, 97)" size={28} />

                    <CText style={[Styles.listItemText,{paddingHorizontal:15, fontFamily:reduxState.language == 'en'? themes.font.regular : themes.font2.regular }]}>{t('English')}</CText>
                    <Switch
                        trackColor={{ false: "#ccd0d1", true:'#6ee33a' }}
                        thumbColor={isEnabled ?'#d4d4d4' : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

            </View>


        </Container>
    )
}
export default Profile;
