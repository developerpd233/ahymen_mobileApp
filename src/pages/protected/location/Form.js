import React, { useRef, memo, useEffect, useState } from 'react';
import { Formik } from 'formik';
// import Validations from './Validations';
import { View } from 'react-native';
import { CButton, CheckBox, CInput, CText } from '../../../uiComponents';
import Styles from "../profile/Profile.style";
import GlobalStyle from "../../../assets/stylings/GlobalStyle";
import Validations from "./Validations";
import { useSelector } from 'react-redux'
import '../../../utils/i18n/lan';
import { useTranslation } from 'react-i18next';
function CForm(props) {



    console.log("🚀 ~ file: Form.js:15 ~ CForm ~ isSelected2", isSelected2)



    const {

        selectedCountry,
        toggleCountryModal,
        phoneErr,

    } = props;
    const { t, i18n } = useTranslation();

    const [currentLanguage, setLanguage] = useState('ar');


    // useEffect(() => {
    // changeLanguage('ar')
    // }, [])
    // const changeLanguage = value => {
    //   i18n
    //     .changeLanguage(value)
    //     .then(() => setLanguage(value))
    //     .catch(err => console.log(err));
    // };
    const { submit, loading, form, checkBoxTwo, checkboxOne, isSelected2, isSelected } = props;

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
    console.log('reduxState--------------', languageTrans)
    const name = useRef(null);
    const address = useRef(null);
    const postalCode = useRef(null);
    const phone = useRef(null);


    return (
        <Formik
            enableReinitialize={true}
            innerRef={form}
            onSubmit={(values) => submit(values, isSelected2)}
            initialValues={{
                name: reduxState?.user?.name,
                address: reduxState?.address,
                postalCode: reduxState?.postalCode,
                phone: ''
            }}
            validationSchema={Validations}

        >

            {({ handleChange, values, handleSubmit, errors }) => {
                console.log('firstfirstfirst', errors)
                return (
                    <View style={[Styles.section, { marginHorizontal: 0 }]}>
                        <CText style={Styles.sectionTitle}>{t('Add_address')}</CText>
                        <CInput
                            ref={name}
                            inputLabel={t('Name')}
                            placeholder={t('Ahyman')}
                            value={values.name}
                            onChangeText={handleChange('name')}
                            error={t(errors.name)}
                            returnKeyType="next"
                            onSubmitEditing={() => address.current.focus()}
                            inputErrorStyle={{ textAlign: languageTrans == 'ar' ? 'right' : "left" }}
                        />


                    { !isSelected && <CInput
                            ref={address}
                            inputLabel={t('Address')}
                            // editable={!isSelected}
                            inputErrorStyle={{ textAlign: languageTrans == 'ar' ? 'right' : "left" }}
                            placeholder={t('Address_for_delivery')}
                            value={values.address}
                            onChangeText={handleChange('address')}
                            error={t(errors.address)}
                            multiline={true}
                            inputInnerContainerStyle={{
                                paddingTop: 10,
                                paddingBottom: 15,
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => postalCode.current.focus()}
                        />
                   }
                        <CInput
                            ref={phone}
                            inputErrorStyle={{ textAlign: languageTrans == 'ar' ? 'right' : "left" }}
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
                            error={t(errors.phone) || t(phoneErr)}
                            returnKeyType="next"
                            onSubmitEditing={() => handleSubmit()}
                        // mask={masks.phone}
                        />
                     { !isSelected &&  <CInput
                            ref={postalCode}
                            // editable={0}
                            inputLabel={t('Pincode')}
                            placeholder={'000000'}
                            value={values.postalCode}
                            onChangeText={handleChange('postalCode')}
                            error={t(errors.postalCode)}
                            returnKeyType="next"
                            inputErrorStyle={{ textAlign: languageTrans == 'ar' ? 'right' : "left" }}
                            onSubmitEditing={() => handleSubmit()}
                        />
                     }
                        <CheckBox
                            value={isSelected}
                            onChange={checkboxOne}
                            title={t('I_dont_the_adress')}
                            containerStyles={{ flexDirection: languageTrans == "ar" ? "row" : 'row-reverse', backgroundColor: '#f8f8f8', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 8 }}
                            myStyle2={{ marginRight: 10 }}
                            stylesTitle={{ fontSize: 15, color: "#666869", textAlign: languageTrans == "ar" ? 'right' : 'left', flex: 1 }} />

                        <CheckBox
                            value={isSelected2}
                            onChange={checkBoxTwo}
                            title={t('Keep_my_identity_secret')}
                            containerStyles={{ flexDirection: languageTrans == "ar" ? "row" : 'row-reverse', backgroundColor: '#f8f8f8', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 8 }}
                            myStyle2={{ marginRight: 10 }} stylesTitle={{ fontSize: 15, color: "#666869", textAlign: languageTrans == "ar" ? 'right' : 'left', flex: 1 }} />

                        <CButton title={t('Save')}
                            loading={loading}
                            onPress={() => handleSubmit()} />
                    </View>
                );
            }}
        </Formik>
    );
}
export default memo(CForm);
