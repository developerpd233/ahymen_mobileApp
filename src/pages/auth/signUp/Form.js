import React, { useRef, memo, useEffect, useState } from "react";
import { Formik } from "formik";
import Validations from "./Validations";
import { View } from "react-native";
import { CButton, CInput, CText } from "../../../uiComponents";
import AuthStyle from "../Auth.style";
import '../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';
import { useSelector } from "react-redux";
function CForm(props) {
    const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');


    const { submit, loading, selectedCountry, toggleCountryModal } = props;

    const form = useRef(null);
    const fullName = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const password = useRef(null);

    function loginCustom(values) {

        //values = JSON.stringify(values, null, 2)

        alert(values.phone);

        // console.log("🚀 ~ file: SignIn.js ~ line 22 ~ handleCode ~ payload", payload)
        // setIsLoading(true);
        // try {
        //     const sendCodeRes = await ApiSauce.post(SEND_CODE, {
        //        phone: `${payload.phone}`
        //        password: `${payload.phone}`
        //     });
        //     console.log(sendCodeRes,'85');
        //     if (sendCodeRes.success) {
        //         showTowst(
        //             "success",
        //             sendCodeRes.message,
        //             sendCodeRes.data.response
        //         );
        //         navigation.navigate("otp_verification", {phone:`${payload.phone}`});
        //     }
        // } catch (error) {
        //     console.log('error ----- 94   ', error , payload)
        //     alert(error.message.invalid);
        //     // if (!error.success) {
        //     //     setPhoneError(error.message.invalid);
        //     // }
        // } finally {
        //     setIsLoading(false);
        // }
    }
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
        <Formik
            innerRef={form}
            onSubmit={(values) => submit(values)}
            // onSubmit={async (values) => {
            //     // await new Promise((resolve) => setTimeout(resolve, 500));
            //     // alert(JSON.stringify(values, null, 2));
            //     loginCustom(values)
            // }}
            initialValues={{
                phone: "",
                password: "",
            }}
            validationSchema={Validations(selectedCountry)}
        >
            {({ handleChange, values, handleSubmit, errors }) => {
                return (
                    <View>
                        <View style={AuthStyle.card}>
                            <View style={AuthStyle.cardHeader}>
                                <CText style={AuthStyle.cardHeaderTitle}>
                                    {t("Sign_up")}
                                </CText>
                                <CText style={AuthStyle.cardHeaderSubTitle}>
                                 {t("Sign_up_with_phone_number")}
                                </CText>
                            </View>

                            <CInput
                                ref={phone}
                                type="number"
                                // disabled={true}
                                selectedCountry={selectedCountry}
                                onPress={() => toggleCountryModal()}
                                keyboardType={"numeric"}
                                inputLabel={t("Phone_number")}
                                placeholder={"000-000-0000"}
                                value={values.phone}
                                onChangeText={(val) => {
                                    let phone = val;
                                    let reg = /^0+/gi;
                                    if (phone.match(reg)) {
                                        phone = phone.replace(reg, "");
                                    }
                                    handleChange("phone")(phone);
                                }}
                                error={t(errors.phone)}
                                inputErrorStyle={{ textAlign: languageTrans == 'ar' ? 'right' : "left"}}
                                returnKeyType="next"
                                onSubmitEditing={() => password.current.focus()}
                                // mask={masks.phone}
                            />
                            <CInput
                                ref={password}
                                inputLabel={t("Password")}
                                placeholder={"*************"}
                                value={values.password}
                                onChangeText={handleChange("password")}
                                error={t(errors.password)}
                                returnKeyType="next"
                                secureTextEntry={true}
                                onSubmitEditing={() => handleSubmit()}
                                inputErrorStyle={{ textAlign: languageTrans == 'ar' ? 'right' : "left"}}
                            />
                            {/* <CInput
                                ref={email}
                                inputLabel={"Email Address"}
                                placeholder={"Martha765@gmail.com"}
                                value={values.email}
                                onChangeText={handleChange("email")}
                                error={errors.email}
                                returnKeyType="next"
                                onSubmitEditing={() => handleSubmit()}
                            /> */}

                            <CButton
                                title={t("Submit")}
                                loading={loading}
                                onPress={() => handleSubmit()}
                            />
                        </View>
                    </View>
                );
            }}
        </Formik>
    );
}
export default memo(CForm);
