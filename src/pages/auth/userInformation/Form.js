import React, { useRef, memo } from "react";
import { Formik } from "formik";
import Validations from "./Validations";
import { View } from "react-native";
import { CButton, CInput, CText } from "../../../uiComponents";
import AuthStyle from "../Auth.style";

function CForm(props) {
    const { submit, loading } = props;

    const form = useRef(null);
    const fullName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const cpassword = useRef(null);

    return (
        <Formik
            innerRef={form}
            onSubmit={(values) => submit(values)}
            initialValues={{}}
            validationSchema={Validations}
        >
            {({ handleChange, values, handleSubmit, errors }) => {
                return (
                    <View>
                        <View style={AuthStyle.card}>
                            <View style={AuthStyle.cardHeader}>
                                <CText style={AuthStyle.cardHeaderTitle}>
                                    {t('Sign_up')}
                                </CText>
                                <CText style={AuthStyle.cardHeaderSubTitle}>
                                {t('Register_an_account')}
                                </CText>
                            </View>

                            <View style={AuthStyle.cardBody}>
                                <CInput
                                    ref={fullName}
                                    inputLabel={t("Full_name")}
                                    placeholder={t("Martha Nielsen")}
                                    value={values.name}
                                    onChangeText={handleChange("name")}
                                    error={errors.fullName}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        password.current.focus()
                                    }
                                />

                                <CInput
                                    ref={password}
                                    inputLabel={t("Password")}
                                    placeholder={"*************"}
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    secureTextEntry={true}
                                    error={errors.password}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        cpassword.current.focus()
                                    }
                                />

                                <CInput
                                    ref={cpassword}
                                    inputLabel={t("Confirm_password")}
                                    placeholder={"*************"}
                                    value={values.c_password}
                                    secureTextEntry={true}
                                    onChangeText={handleChange("c_password")}
                                    error={errors.password}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        email.current.focus()
                                    }
                                />

                                <CInput
                                    ref={email}
                                    inputLabel={t("Email_address")}
                                    placeholder={t("Martha765@gmail.com")}
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    error={errors.email}
                                    sec
                                    returnKeyType="next"
                                    onSubmitEditing={() => handleSubmit()}
                                />
                            </View>

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
