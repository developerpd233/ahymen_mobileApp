import React, {useRef, memo, useEffect, useState} from 'react';
import {Formik} from 'formik';
// import Validations from './Validations';
import {View} from 'react-native';
import {CButton, CInput, CText} from '../../../uiComponents';
import Styles from "../profile/Profile.style";
import GlobalStyle from "../../../assets/stylings/GlobalStyle";
import Validations from "./Validations";
import {useSelector} from 'react-redux'
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
    const {submit, loading, form} = props;
    
    const reduxState = useSelector(({ root, auth }) => {
        return {
            user:auth?.user?.data?.user,
            // loading: auth.sendOtpLoading,
            address: root?.addressData?.address,
            postalCode:root?.addressData?.postalCode 
        };
    });
    const name = useRef(null);
    const address = useRef(null);
    const postalCode = useRef(null);

    return (
        <Formik
            enableReinitialize={true}
            innerRef={form}
            onSubmit={(values) => submit(values)}
            initialValues={{
                name:reduxState?.user?.name ,
                address:reduxState?.address  ,
                postalCode:reduxState?.postalCode  
            }}
            validationSchema={Validations}
        >
            {({handleChange, values, handleSubmit, errors}) => {
                return (
                    <View style={[Styles.section, {marginHorizontal: 0}]}>
                        <CText style={Styles.sectionTitle}>{t('Add_address')}</CText>
                        <CInput
                            ref={name}
                            inputLabel={t('Name')}
                            placeholder={t('Ahyman')}
                            value={values.name}
                            onChangeText={handleChange('name')}
                            error={errors.name}
                            returnKeyType="next"
                            onSubmitEditing={() => address.current.focus()}
                        />

                        <CInput
                            ref={address}
                                inputLabel={t('Address')}
                            placeholder={t('Address_for_delivery')}
                            value={values.address}
                            onChangeText={handleChange('address')}
                            error={errors.address}
                            multiline={true}
                            inputInnerContainerStyle={{
                                paddingTop: 10,
                                paddingBottom: 15,
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => postalCode.current.focus()}
                        />

                        <CInput
                            ref={postalCode}
                            inputLabel={t('Pincode')}
                            placeholder={'000000'}
                            value={values.postalCode}
                            onChangeText={handleChange('postalCode')}
                            error={errors.postalCode}
                            returnKeyType="next"
                            onSubmitEditing={() => handleSubmit()}
                        />

                        <CButton title={t('Save')}
                                 loading={loading}
                                 onPress={() => handleSubmit()}/>
                    </View>
                );
            }}
        </Formik>
    );
}
export default memo(CForm);
