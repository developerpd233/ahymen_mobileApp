import React, { useRef, memo, useEffect, useState } from "react";
import { Formik } from "formik";
import Validations from "./Validations";
import { View } from "react-native";
import { CButton, CInput, CText } from "../../../uiComponents";
import AuthStyle from "../Auth.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Auth from "../../../store/constants/Auth.constant";
import '../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';
function CForm(props) {
    const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');


    // useEffect(() => {
    // changeLanguage('ar')
    // }, [])
    // const changeLanguage = value => {
    //   i18n
    //     .changeLanguage(value)
    //     .then(() => setLanguage(value))
    //     .catch(err => console.log(err));
    // };
    const {
        submit,
        loading,
        selectedCountry,
        toggleCountryModal,
        phoneErr,
        onLoginPress,
        onGooglePress,
        onFacebookPress
    } = props;
    
    const form = useRef(null);
    const phone = useRef(null);

    const dispatch = useDispatch()

    const continueWithoutLogin = () => {
    
        dispatch({
            type: Auth.LOGIN_USER_API,
            loading: false,
            user: null,
            isLoggedIn: true,
        });
    };

    return (
        <Formik
            innerRef={form}
            onSubmit={(values) => submit(values)}
            initialValues={{
                phone: "",
            }}
            validationSchema={Validations(selectedCountry)}
        >
            {({ handleChange, values, handleSubmit, errors }) => {
                return (
                    <View>
                        <View style={AuthStyle.card}>
                            <View style={AuthStyle.cardHeader}>
                                <CText style={AuthStyle.cardHeaderTitle}>
                                    {t('Sign_in')}
                                </CText>
                                <CText style={AuthStyle.cardHeaderSubTitle}>
                                {t("Sign_in_with_phone_number")}
                                </CText>
                            </View>

                            <View style={AuthStyle.cardBody}>
                                <CInput
                                    ref={phone}
                                    type="number"
                                    // disabled={true}
                                    selectedCountry={selectedCountry}
                                    onPress={() => toggleCountryModal()}
                                    keyboardType={"numeric"}
                                    inputLabel={t('Phone_number')}
                                    placeholder={"000-000-0000"}
                                    value={values?.phone}
                                    onChangeText={(val) => {    
                                        let phone = val;
                                        let reg = /^0+/gi;
                                        if (phone.match(reg)) {
                                            phone = phone.replace(reg, "");
                                        }
                                        handleChange("phone")(phone);
                                    }}
                                    error={errors.phone || phoneErr}
                                    returnKeyType="next"
                                    onSubmitEditing={() => handleSubmit()}
                                    // mask={masks.phone}
                                />  
                                <CButton
                                    title={t("Continue")}
                                    loading={loading}
                                    onPress={() => handleSubmit()}
                                />

                                <CText style={AuthStyle.cardBottomText2}>
                                {t('Or')}
                                </CText>

                                <CButton
                                    title={t("Continue_without_login")}
                                    loading={loading}
                                    onPress={() => continueWithoutLogin()}
                                />
                            </View>

                            <CText style={AuthStyle.cardBottomText}>
                                {" "}
                                {t('We_send_OTP_for_verification')}{" "}
                            </CText>
                        </View>
                        <View style={AuthStyle.orContainer}>
                            <CText style={AuthStyle.orContainerText}>
                                {" "}
                                - {t('Or')} -
                            </CText>
                        </View>

                        {/*<CButton*/}
                        {/*    type='outline'*/}
                        {/*    title='Create new account?'*/}
                        {/*    buttonStyle={AuthStyle.bottomButton}*/}
                        {/*/>*/}

                        <CButton
                            type="outline"
                            title={t('Sign_in_with_facebook')}
                            buttonStyle={AuthStyle.bottomButton}
                            onPress={onFacebookPress}
                        />

                        <CButton
                            type="outline"
                            title={t('Sign_in_with_google')}
                            buttonStyle={AuthStyle.bottomButton}
                            onPress={onGooglePress}
                        />
                        <View style={AuthStyle.orContainer}>
                            <CText style={AuthStyle.cardBottomText}>
                                {" "}
                                {t('Already_have_account')}{" "}
                            </CText>
                            <TouchableOpacity
                                // onPress={() =>
                                //     props.navigation.navigate("login")
                                // }
                                onPress={onLoginPress}
                            >
                                <CText
                                    style={[
                                        AuthStyle.orContainerText,
                                        { marginTop: 7 },
                                    ]}
                                >
                                   {t('Sign_up')}
                                </CText>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }}
        </Formik>
    );
}
export default memo(CForm);
