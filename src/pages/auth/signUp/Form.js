import React, { useRef, memo } from "react";
import { Formik } from "formik";
import Validations from "./Validations";
import { View } from "react-native";
import { CButton, CInput, CText } from "../../../uiComponents";
import AuthStyle from "../Auth.style";

function CForm(props) {
    const { submit, loading, selectedCountry, toggleCountryModal } = props;

    const form = useRef(null);
    const fullName = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const password = useRef(null);

    return (
        <Formik
            innerRef={form}
            onSubmit={(values) => submit(values)}
            initialValues={{
                phone: "",
                password: "",
            }}
            validationSchema={Validations(selectedCountry)}
        >
            {({ handleChange, values, handleSubmit, errors }) => {
                console.log(
                    "🚀 ~ file: Form.js ~ line 28 ~ CForm ~ values",
                    values,
                    errors
                );
                return (
                    <View>
                        <View style={AuthStyle.card}>
                            <View style={AuthStyle.cardHeader}>
                                <CText style={AuthStyle.cardHeaderTitle}>
                                    Login
                                </CText>
                                <CText style={AuthStyle.cardHeaderSubTitle}>
                                    Login with phone number
                                </CText>
                            </View>

                            <CInput
                                ref={phone}
                                type="number"
                                // disabled={true}
                                selectedCountry={selectedCountry}
                                onPress={() => toggleCountryModal()}
                                keyboardType={"numeric"}
                                inputLabel={"Phone Number"}
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
                                error={errors.phone}
                                returnKeyType="next"
                                onSubmitEditing={() => password.current.focus()}
                                // mask={masks.phone}
                            />
                            <CInput
                                ref={password}
                                inputLabel={"Password"}
                                placeholder={"*************"}
                                value={values.password}
                                onChangeText={handleChange("password")}
                                error={errors.password}
                                returnKeyType="next"
                                secureTextEntry={true}
                                onSubmitEditing={() => handleSubmit()}
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
