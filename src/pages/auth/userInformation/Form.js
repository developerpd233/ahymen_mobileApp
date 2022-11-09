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
                                    Sign up
                                </CText>
                                <CText style={AuthStyle.cardHeaderSubTitle}>
                                    Register your account
                                </CText>
                            </View>

                            <View style={AuthStyle.cardBody}>
                                <CInput
                                    ref={fullName}
                                    inputLabel={"Full Name"}
                                    placeholder={"Martha Nielsen"}
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
                                    inputLabel={"Password"}
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
                                    inputLabel={"Confirm Password"}
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
                                    inputLabel={"Email Address"}
                                    placeholder={"Martha765@gmail.com"}
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    error={errors.email}
                                    sec
                                    returnKeyType="next"
                                    onSubmitEditing={() => handleSubmit()}
                                />
                            </View>

                            <CButton
                                title={"Submit"}
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
