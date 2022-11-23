import React, { useRef, memo } from "react";
import { Formik } from "formik";
import Validations from "./Validations";
import { View } from "react-native";
import { CButton, CInput, CText } from "../../../uiComponents";
import AuthStyle from "../Auth.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Auth from "../../../store/constants/Auth.constant";

function CForm(props) {
    const {
        submit,
        loading,
        selectedCountry,
        toggleCountryModal,
        phoneErr,
        onLoginPress,
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
                                    Sign In
                                </CText>
                                <CText style={AuthStyle.cardHeaderSubTitle}>
                                    Sign In with phone number
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
                                    inputLabel={"Phone Number"}
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
                                    title={"Continue"}
                                    loading={loading}
                                    onPress={() => handleSubmit()}
                                />

                                <CText style={AuthStyle.cardBottomText2}>
                                    OR
                                </CText>

                                <CButton
                                    title={"Continue without login"}
                                    loading={loading}
                                    onPress={() => continueWithoutLogin()}
                                />
                            </View>

                            <CText style={AuthStyle.cardBottomText}>
                                {" "}
                                We’ll send OTP for verification{" "}
                            </CText>
                        </View>
                        <View style={AuthStyle.orContainer}>
                            <CText style={AuthStyle.orContainerText}>
                                {" "}
                                - OR -
                            </CText>
                        </View>

                        {/*<CButton*/}
                        {/*    type='outline'*/}
                        {/*    title='Create new account?'*/}
                        {/*    buttonStyle={AuthStyle.bottomButton}*/}
                        {/*/>*/}

                        <CButton
                            type="outline"
                            title="Sign In with Facebook"
                            buttonStyle={AuthStyle.bottomButton}
                        />

                        <CButton
                            type="outline"
                            title="Sign In with Google"
                            buttonStyle={AuthStyle.bottomButton}
                        />
                        <View style={AuthStyle.orContainer}>
                            <CText style={AuthStyle.cardBottomText}>
                                {" "}
                                Already have account{" "}
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
                                    Sign In
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
