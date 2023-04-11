import React, { useEffect, useState } from "react";
import {View} from "react-native";
import {Container} from "../../../../containers";
import {CText} from "../../../../uiComponents";
import Styles from "../Profile.style";
import {useNavigation} from "@react-navigation/native";
import { useSelector  , useDispatch} from "react-redux";

function MyInfo(props) {

    const headerProps = {
        headerTitle: 'My Info',
    };

    const reduxState = useSelector(({ auth }) => {
        
        return {
            loading: false,
            user:auth.user
        };
    });

    let myuser = reduxState?.user?.data?.token ? reduxState?.user : null ;
    return(
        <Container bottomSpace edges={['left', 'right']}
                   scrollView={true}
                   headerProps={headerProps}>
            <View style={Styles.myInfoContainer}>
                <View style={Styles.section}>
                    <CText style={Styles.sectionTitle}>My Profile</CText>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>Title</CText>
                        <CText style={Styles.sectionItemValue}>{myuser?.data?.user?.title ? myuser?.data?.user?.title : '' }</CText>
                    </View>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>First Name</CText>
                        <CText style={Styles.sectionItemValue}>{myuser?.data?.user?.first_name ? myuser?.data?.user?.first_name : '' }</CText>
                    </View>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>Last Name</CText>
                        <CText style={Styles.sectionItemValue}>{myuser?.data?.user?.last_name ? myuser?.data?.user?.last_name : '' }</CText>
                    </View>
                </View>

                <View style={Styles.section}>
                    <CText style={Styles.sectionTitle}>Login Information</CText>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>Phone :</CText>
                        <CText style={Styles.sectionItemValue}>{myuser?.data?.user?.phone}</CText>
                    </View>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>Email Address :</CText>
                        <CText style={Styles.sectionItemValue}>{myuser?.data?.user?.email}</CText>
                    </View>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>Password</CText>
                        <CText style={Styles.sectionItemValue}>*******************</CText>
                    </View>
                </View>
            </View>
        </Container>
    )
}
export default MyInfo;
