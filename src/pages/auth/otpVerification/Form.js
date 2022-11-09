import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View, TouchableOpacity} from 'react-native';
import {CButton, CInput, CText, CountDownTimer} from '../../../uiComponents';
import AuthStyle from '../Auth.style';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import GlobalStyle from "../../../assets/stylings/GlobalStyle";
import {themes} from "../../../theme/colors";

function CForm(props) {
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
                                    Verification
                                </CText>
                                <CText style={AuthStyle.cardHeaderSubTitle}>
                                    A 4- Digit PIN has Been sent to your email address,
                                    enter it below to continue
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
                                        <CText style={AuthStyle.linkButtonText}>Don’t receive OTP code</CText>
                                        <TouchableOpacity style={AuthStyle.linkButtonWithIcon} onPress={resendOtp}>
                                            <CText style={AuthStyle.linkButtonOtherText}>Resend</CText>
                                        </TouchableOpacity>
                                    </View>
                                </CountDownTimer>

                                <CButton title={'Continue'}
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
