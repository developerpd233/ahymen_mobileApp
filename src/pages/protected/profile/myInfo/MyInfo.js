import React from 'react';
import {View} from "react-native";
import {Container} from "../../../../containers";
import {CText} from "../../../../uiComponents";
import Styles from "../Profile.style";

function MyInfo(props) {

    const headerProps = {
        headerTitle: 'My Info',
    };

    return(
        <Container bottomSpace edges={['left', 'right']}
                   scrollView={true}
                   headerProps={headerProps}>
            <View style={Styles.myInfoContainer}>
                <View style={Styles.section}>
                    <CText style={Styles.sectionTitle}>My Profile</CText>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>Title</CText>
                        <CText style={Styles.sectionItemValue}>MR</CText>
                    </View>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>First Name</CText>
                        <CText style={Styles.sectionItemValue}>Ayham</CText>
                    </View>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>Last Name</CText>
                        <CText style={Styles.sectionItemValue}>-------------</CText>
                    </View>
                </View>

                <View style={Styles.section}>
                    <CText style={Styles.sectionTitle}>Login Information</CText>
                    <View style={Styles.sectionItem}>
                        <CText style={Styles.sectionItemTitle}>Email Address :</CText>
                        <CText style={Styles.sectionItemValue}>Ayham@gmail.com</CText>
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
