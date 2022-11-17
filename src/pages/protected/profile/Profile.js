import React from 'react';
import {View, TouchableOpacity} from "react-native";
import {Container} from "../../../containers";
import {CText} from "../../../uiComponents";
import Styles from "./Profile.style";
import Icon from '../../../assets/icons/CustomIcon';
import {MappedElement} from "../../../utils/methods";
import {useNavigation} from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import Auth from '../../../store/constants/Auth.constant';

function Profile(props) {

    const navigation = useNavigation();

    const headerProps = {
        headerTitle: 'Profile',
    };

    const dispatch = useDispatch()

    const logout = () => {
    
        dispatch({
            type: Auth.LOGOUT_USER_API,
            loading: false,
            user: null,
            isLoggedIn: false,
        });
    };


    const menu = [
        {
            title: 'My Info',
            onPress: () => navigation.navigate('my_info'),
            icon: 'user-1'
        },
        {
            title: 'My Order',
            onPress: () => navigation.navigate('my_order'),
            icon: 'product'
        },
        {
            title: 'My Wishlist',
            onPress: () => null,
            icon: 'heart'
        },
        {
            title: 'Loremipsum',
            onPress: () => null,
            icon: 'hand-heart'
        },
        {
            title: 'Loremipsum',
            onPress: () => null,
            icon: 'book'
        },
        {
            title: 'Settings',
            onPress: () => null,
            icon: 'setting'
        },
        {
            title: 'Logout',
            onPress: () => {logout()},
            icon: 'setting'
        }
    ];

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index}
                              style={[Styles.listItem, index === 0 && Styles.listItemNone]}
                              onPress={item?.onPress}>
                {item?.icon ? <Icon name={item?.icon} style={Styles.listItemLeftIcon}/> : null}
                <CText style={Styles.listItemText}>{item?.title}</CText>
                <Icon name={'arrow-forward'} style={Styles.listItemRightIcon}/>
            </TouchableOpacity>
        )
    };

    return(
        <Container bottomSpace edges={['left', 'right']} scrollView={true} headerProps={headerProps}>
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <CText style={Styles.headerSubTitle}>Welcome</CText>
                    <CText style={Styles.headerTitle}>Ayham</CText>
                </View>

                <View style={Styles.list}>
                    <MappedElement
                        data={menu}
                        renderElement={renderItem}
                    />
                </View>

            </View>


        </Container>
    )
}
export default Profile;
