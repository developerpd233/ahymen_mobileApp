import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View, TouchableOpacity} from 'react-native';
import {CButton, CInput, CText, CountDownTimer} from '../../../uiComponents';
import AuthStyle from '../Auth.style';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import GlobalStyle from "../../../assets/stylings/GlobalStyle";
import {themes} from "../../../theme/colors";
import '../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';
function CForm(props) {
    const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');


    
    const {submit, loading, resendOtp} = props;

    const form = useRef(null);



    return (
        <Formik
            innerRef={form}
            onSubmit={(values) => submit(values)}
            initialValues={{
                otp: ''
            }}
            validationSchema={Validations}
        >
            {({handleChange, values, handleSubmit, errors, setFieldValue}) => {
                return (
                    <View>
                        <View style={[AuthStyle.card,{ marginTop: 20}]}>
                            <View style={AuthStyle.cardHeader}>
                                <CText style={AuthStyle.cardHeaderTitle}>
                                    {t("Verification")}
                                </CText>
                                <CText style={AuthStyle.cardHeaderSubTitle}>
                                    {t('Digit_PIN')}
                                </CText>
                            </View>

                            <View style={AuthStyle.cardBody}>

                                <View style={AuthStyle.otpContainer}>
                                    <OTPInputView
                                        code={values?.otp}
                                        onCodeChanged={handleChange('otp')}
                                        codeInputFieldStyle={[AuthStyle.codeInputFieldStyle]}
                                        codeInputHighlightStyle={AuthStyle.codeInputHighlightStyle}
                                        style={AuthStyle.otpInputView}
                                        onCodeFilled = {(code => {
                                            setFieldValue('otp', code);
                                            handleSubmit()
                                        })}
                                        pinCount={4} />
                                    {errors.otp ? <CText style={GlobalStyle.errorTextStyle}>
                                        {errors.otp}
                                    </CText>  : null}
                                </View>


                                <CountDownTimer text={'Request a new code in'} initialValue={5}>
                                    <View style={AuthStyle.linkButtonContainer}>
                                        <CText style={AuthStyle.linkButtonText}>{t('Dont_receive_OTP_code')}</CText>
                                        <TouchableOpacity style={AuthStyle.linkButtonWithIcon} onPress={resendOtp}>
                                            <CText style={AuthStyle.linkButtonOtherText}>{t('Resend')}</CText>
                                        </TouchableOpacity>
                                    </View>
                                </CountDownTimer>

                                <CButton title={t('Continue')}
                                         loading={loading}
                                         onPress={() => handleSubmit()}/>
                            </View>

                        </View>

                    </View>
                );
            }}
        </Formik>
    );
}
export default memo(CForm);
