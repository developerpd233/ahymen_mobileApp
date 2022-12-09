import React, {useRef, memo, useState} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View} from 'react-native';
import {CButton, CInput} from '../../../uiComponents';
import '../../../utils/i18n/lan';
import { useTranslation } from 'react-i18next';

function CForm(props) {
    const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');

    const {submit, loading, selectedCountry, toggleCountryModal} = props;

    const form = useRef(null);
    const fullName = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);

    return (
        <Formik
            innerRef={form}
            onSubmit={(values) => submit(values)}
            initialValues={{
                phone: ''
            }}
            validationSchema={Validations(selectedCountry)}
        >
            {({handleChange, values, handleSubmit, errors}) => {
                return (
                    <View>

                            <CInput
                                ref={fullName}
                                inputLabel={t('Full_name')}
                                placeholder={t('Martha_nielsen')}
                                value={values.fullName}
                                onChangeText={handleChange('fullName')}
                                error={errors.fullName}
                                returnKeyType="next"
                                onSubmitEditing={() => phone.current.focus()}
                            />

                        <CInput
                            ref={phone}
                            type="number"
                            // disabled={true}
                            selectedCountry={selectedCountry}
                            onPress={() => toggleCountryModal()}
                            keyboardType={'numeric'}
                            inputLabel={t('Phone_number')}
                            placeholder={'000-000-0000'}
                            value={values.phone}
                            onChangeText={(val) => {
                                let phone = val;
                                let reg = /^0+/gi;
                                if (phone.match(reg)) {
                                    phone = phone.replace(reg, '');
                                }
                                handleChange('phone')(phone)
                            }}
                            error={errors.phone}
                            returnKeyType="next"
                            onSubmitEditing={() => handleSubmit()}
                            // mask={masks.phone}
                        />

                            <CInput
                                ref={email}
                                inputLabel={t('Email_address')}
                                placeholder={t('Martha765@gmail.com')}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                error={errors.email}
                                returnKeyType="next"
                                onSubmitEditing={() => handleSubmit()}
                            />



                            <CButton title={t('Submit')}
                                     loading={loading}
                                     onPress={() => handleSubmit()}/>


                    </View>
                );
            }}
        </Formik>
    );
}
export default memo(CForm);
