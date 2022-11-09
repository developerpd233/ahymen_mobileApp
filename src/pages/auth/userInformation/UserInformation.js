import React from "react";
import { Container } from "../../../containers";
import { ProgressiveImage } from "../../../uiComponents";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import AuthStyle from "../Auth.style";
import CForm from "./Form";
import { useNavigation } from "@react-navigation/native";
import { login, signUp } from "../../../store/actions/Auth.action";

function UserInformation({ route }) {
    const { phone } = route?.params || {};
    console.log(
        "🚀 ~ file: UserInformation.js ~ line 13 ~ UserInformation ~ route?.params",
        route?.params
    );
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const reduxState = useSelector(({ auth, global }) => {
        return {
            loading: auth.signUpLoading,
        };
    });
    console.log(
        "🚀 ~ file: UserInformation.js ~ line 20 ~ reduxState ~ reduxState",
        reduxState
    );

    const submit = (values) => {
        const payload = {
            name: values?.name,
            email: values?.email,
            password: values?.password,
            c_password: values?.c_password,
            phone: phone,
        };
        console.log("values", payload);
        dispatch(signUp(payload));
    };

    return (
        <Container
            backgroundColor={"theme-color"}
            showPattern={true}
            scrollView={true}
            loading={reduxState?.loading}
            scrollViewProps={{
                contentContainerStyle: AuthStyle.container,
            }}
        >
            <View style={AuthStyle.header}>
                <ProgressiveImage
                    style={AuthStyle.headerLogo}
                    source={require("../../../assets/images/logo.png")}
                />
            </View>

            <CForm submit={submit} loading={reduxState?.loading} />
        </Container>
    );
}
export default UserInformation;
