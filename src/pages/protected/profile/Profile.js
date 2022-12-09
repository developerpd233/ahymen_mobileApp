import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Switch } from "react-native";
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
  
  console.log("🚀 ~ file: Profile.js:28 ~ Profile ~ languageStyle", languageStyle)
    const [currentLanguage, setLanguage] = useState('ar');
    const [isEnabled, setIsEnabled] = useState(reduxState?.language !== 'en' ? true : false);
    console.log("🚀 ~ file: Profile.js:30 ~ Profile ~ reduxState", reduxState)
    const toggleSwitch = () => {
        if(reduxState?.language == 'en'){
            console.log("🚀 ~ file: Profile.js:33 ~ toggleSwitch ~ reduxState", reduxState)
            setIsEnabled(true)
            dispatch(changeLanguage({lan:'ar'}));
        }else{
            setIsEnabled(false)
            dispatch(changeLanguage({lan:'en'}));
        }
    };

    // useEffect(() => {
    // changeLanguage('ar')
    // }, [])
    // const changeLanguage = value => {
    //   i18n
    //     .changeLanguage(value)
    //     .then(() => setLanguage(value))
    //     .catch(err => console.log(err));
    // };

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

        console.log('line 42 myProfile ------------', reduxState?.user?.data?.token)
        console.log("🚀 ~ file: Profile.js:86 ~ myProfile ~ reduxState", reduxState)
        reduxState?.user?.data?.token ? navigation.navigate("my_info", {
            isGoBack: true,
        }) :
            console.log("🚀 ~ file: Profile.js:90 ~ myProfile ~ reduxState", reduxState)
            dispatch({
                type: Auth.LOGOUT_USER_API,
                loading: false
            })
    };

    const myOrder = () => {

        console.log('line 54 myOrder ------------', reduxState?.user?.data?.token)
        console.log("🚀 ~ file: Profile.js:100 ~ myOrder ~ reduxState", reduxState)
        reduxState?.user?.data?.token ? navigation.navigate("my_order", {
            isGoBack: true,
        }) :
            console.log("🚀 ~ file: Profile.js:104 ~ myOrder ~ reduxState", reduxState)
            dispatch({
                type: Auth.LOGOUT_USER_API,
                loading: false
            })
    };

    const myWishlist = () => {

        console.log('line 66 myWishlist ------------', reduxState?.user?.data?.token)
        console.log("🚀 ~ file: Profile.js:114 ~ myWishlist ~ reduxState", reduxState)
        reduxState?.user?.data?.token ? navigation.navigate("my_wishlist", {
            isGoBack: true,
        }) :
            dispatch({
                type: Auth.LOGOUT_USER_API,
                loading: false
            })
    };

    const menu = [
        {
            title: t("My_info"),
            onPress: () => myProfile(), //navigation.navigate('my_info'),
            icon: 'user-1'
        },
        {
            title: t('My_order'),
            onPress: () => myOrder(), //navigation.navigate('my_order'),
            icon: 'product'
        },
        {
            title: t('My_Wishlist'),
            onPress: () => myWishlist(),
            icon: 'heart'
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
            title: t('Settings'),
            onPress: () => null,
            icon: 'setting'
        },
        {
            title: t('Logout'),
            onPress: () => { logout() },
            icon: 'close'
        }
    ];

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index}
                style={[Styles.listItem, index === 0 && Styles.listItemNone ,{flexDirection: reduxState.language == 'en' ?'row' :'row-reverse' }]}
                onPress={item?.onPress}>
                {item?.icon ? <Icon name={item?.icon} style={[Styles.listItemLeftIcon,  {marginRight:reduxState.language == 'en' ? 20 : 0}]} /> : null}
                <CText style={[Styles.listItemText  ,{paddingRight:15}]}>{item?.title}</CText>
                <Icon name={reduxState.language == 'en' ? 'arrow-forward'  : 'back-arrow'} style={[Styles.listItemRightIcon, ]} />
            </TouchableOpacity>
        )
    };

    return (
        <Container bottomSpace edges={['left', 'right']} scrollView={true} headerProps={headerProps}>
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <CText style={[Styles.headerSubTitle]}>{t("Welcome")}</CText>
                    <CText style={Styles.headerTitle}>{t("Ahyman")}</CText>
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
                   {/* <Icon name='camera' type='fontisto' color="#000" size={30} /> */}

                    <Image source={lanIcon} style={[Styles.listItemLeftIcon, { width:22, height:22}] } resizeMode='contain'/>
                    <CText style={[Styles.listItemText,{paddingHorizontal:15}]}>{t('Arabic')}</CText>
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
