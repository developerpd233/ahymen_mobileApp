import React, { useState } from 'react';
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
import Toast from 'react-native-simple-toast';
import '../../../../utils/i18n/lan';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
function AddGiftCard(props) {
    const { t, i18n } = useTranslation();

    const [currentLanguage, setLanguage] = useState('ar');

    const navigation = useNavigation();

    const headerProps = {
        showCenterLogo: true,
        showCart: true,
    };

    const submit = (values) => {

        navigation.navigate('checkout', {
            values
        });
        Toast.show('Gift Data added successfully', Toast.LONG)

    };
    const reduxState = useSelector(({ root, auth, language }) => {
        return {
            user: auth?.user?.data?.user,
            // loading: auth.sendOtpLoading,
            address: root?.addressData?.address,
            postalCode: root?.addressData?.postalCode,
            language: language?.language?.lan
        };
    });

    const languageTrans = reduxState.language
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
                    text: Yup.string().required(t("Please_enter_text"))
                })}>
                {({ handleChange, values, handleSubmit, errors }) => {
                    return (
                        <KeyboardView contentContainerStyle={[GlobalStyle.centerModalCenterViewContainerScroll]}>
                            <View style={GlobalStyle.centerModalCenterViewContainer}>

                                <CText style={Styles.pageTitle}>{t('Add_gift_card')}</CText>

                                <CInput
                                    multiline={true}
                                    value={values.text}
                                    onChangeText={handleChange('text')}
                                    error={errors.text}
                                    placeholder={t('Type_your_card_here')}
                                    inputErrorStyle={{ textAlign: languageTrans == 'ar' ? 'right' : "left"}}
                                    returnKeyType="next"
                                    inputInnerContainerStyle={Styles.textArea}
                                    style={[GlobalStyle.inputStyle, Styles.textAreaInput]}
                                />
                                <CText style={[Styles.orderItemBottomQuantityText, {
                                    fontSize: 15, paddingVertical: 10
                                }]}>
                                    {t('Share_your_feeling')}
                                </CText>
                                <CText style={[Styles.orderItemBottomQuantityText, {

                                }]}>
                                    {t('Choose_the_best_way')}
                                </CText>
                                <View style={[GlobalStyle.inputStyle, Styles.textAreaInput, Styles.textArea, { marginVertical: 15, padding: 10, flexDirection: 'row', alignItems: 'center', minHeight: 60 }]}>
                                    <FontAwesome name='link' style={Styles.icon} size={25} color="#818080" />
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <CText style={[Styles.orderItemBottomQuantityText, {
                                            fontFamily: themes.font.medium,
                                            fontSize: 18,
                                            
                                        }]}>{t('Link')}</CText>
                                        <CInput
                                            multiline={true}
                                            value={values.link}
                                            onChangeText={handleChange('link')}
                                            error={errors.link}
                                            // inputErrorStyle={{ textAlign: languageTrans == 'ar' ? 'right' : "left"}}
                                            placeholder={t('Type_your_card_here')}

                                            //  style={[Styles.orderItemBottomQuantityText, {
                                            //     fontFamily: themes.font.extraLight,
                                            //     fontSize: 14,
                                            // }]} 
                                            style={{ width: 230 }} />
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                    {/* 
                                    <CButton title={'Preview'}
                                        loading={false}
                                        buttonText={Styles.buttonText}
                                        buttonStyle={[Styles.buttonStyle, Styles.borderBtn]}
                                        onPress={() => handleSubmit()} /> */}

                                    <CButton title={t('Confirm')}
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
