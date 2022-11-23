import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CText } from '../../../../uiComponents'
import { Container } from '../../../../containers'
import Styles from "./Setting.style";
import { MappedElement } from '../../../../utils/methods';
import Icon from '../../../../assets/icons/CustomIcon';


const Setting = () => {
    const headerProps = {
        headerTitle: 'Setting',
    };
    const menu = [
        {
            title: 'Edit Profile',
            onPress: () => editProfile(), //navigation.navigate('my_info'),
            icon: 'user-1'
        },
        {
            title: 'Change Password',
            onPress: () => changePassword(), //navigation.navigate('my_order'),
            icon: 'stepforward'
        },
        {
            title: 'Notification',
            onPress: () => notification(),
            icon: 'heart'
        },
        {
            title: 'Privacy Policy',
            onPress: () => privacyPolicy(),
            icon: 'hand-heart'
        },
        {
            title: 'Terms and Condition',
            onPress: () => termAndCondition(),
            icon: 'book'
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
  return ( 
    <Container bottomSpace edges={['left', 'right']} scrollView={true} headerProps={headerProps}>
    <View style={Styles.container}>
        <View style={Styles.header}>
            <CText style={Styles.headerSubTitle}>Welcome</CText>
            <CText style={Styles.headerTitle}>Ayhman</CText>
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

export default Setting