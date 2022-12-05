import React from 'react';
import { Container } from "../../../../containers";
import { CText, CButton, CInput } from "../../../../uiComponents";
import { View } from "react-native";
import Styles from "../../store/Store.style";
import KeyboardView from "../../../../containers/KeyboardView";
import GlobalStyle from "../../../../assets/stylings/GlobalStyle";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { themes } from '../../../../theme/colors';
function AddGiftCard(props) {

    const navigation = useNavigation();

    const headerProps = {
        showCenterLogo: true,
        showCart: true,
    };

    const submit = (values) => {
    
        navigation.navigate('checkout',{
            values
        });
    };

    return (
        <Container
            bottomSpace
            scrollView={true}
            edges={['left', 'right']}
            headerProps={headerProps}>
            <Formik
                onSubmit={(values) => submit(values)}
                initialValues={{}}
                validationSchema={Yup.object().shape({
                    text: Yup.string().required("Please enter text")
                })}>
                {({ handleChange, values, handleSubmit, errors }) => {
                    return (
                        <KeyboardView contentContainerStyle={[GlobalStyle.centerModalCenterViewContainerScroll]}>
                            <View style={GlobalStyle.centerModalCenterViewContainer}>

                                <CText style={Styles.pageTitle}>Add gift card</CText>

                                <CInput
                                    multiline={true}
                                    value={values.text}
                                    onChangeText={handleChange('text')}
                                    error={errors.text}
                                    placeholder="Type your card here"

                                    returnKeyType="next"
                                    inputInnerContainerStyle={Styles.textArea}
                                    style={[GlobalStyle.inputStyle, Styles.textAreaInput]}
                                />
                                <CText style={[Styles.orderItemBottomQuantityText, {
                                    fontSize: 15, paddingVertical: 10
                                }]}>
                                    Share You Feeling
                                </CText>
                                <CText style={[Styles.orderItemBottomQuantityText, {

                                }]}>
                                    Choose the best way to express your feelings
                                </CText>
                                <View style={[GlobalStyle.inputStyle, Styles.textAreaInput, Styles.textArea, { marginVertical: 15, padding: 10, flexDirection: 'row', alignItems: 'center', minHeight: 60 }]}>
                                    <FontAwesome name='link' style={Styles.icon} size={25} color="#818080" />
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <CText style={[Styles.orderItemBottomQuantityText, {
                                            fontFamily: themes.font.medium,
                                            fontSize: 18,
                                        }]}>Link</CText>
                                        <CInput 
                                         multiline={true}
                                         value={values.link}
                                         onChangeText={handleChange('link')}
                                         error={errors.link}
                                         placeholder="Type your card here"
     
                                        //  style={[Styles.orderItemBottomQuantityText, {
                                        //     fontFamily: themes.font.extraLight,
                                        //     fontSize: 14,
                                        // }]} 
                                        style={{width:230}}  />
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
{/* 
                                    <CButton title={'Preview'}
                                        loading={false}
                                        buttonText={Styles.buttonText}
                                        buttonStyle={[Styles.buttonStyle, Styles.borderBtn]}
                                        onPress={() => handleSubmit()} /> */}

                                    <CButton title={'Confirm'}
                                        loading={false}
                                        buttonStyle={Styles.buttonStyle}

                                        onPress={() => handleSubmit()} />
                                </View>

                            </View>
                        </KeyboardView>
                    )
                }}
            </Formik>
        </Container>
    )
}
export default AddGiftCard;
