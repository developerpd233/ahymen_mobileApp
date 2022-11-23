import React from "react";
import { Container } from "../../../containers";
import { ProgressiveImage } from "../../../uiComponents";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import AuthStyle from "../Auth.style";
import CForm from "./Form";
import { useNavigation } from "@react-navigation/native";
import { login, signUp } from "../../../store/actions/Auth.action";
import ApiSauce from "../../../utils/network";
import { REGISTER } from "../../../config/webservices";
import Auth from '../../../store/constants/Auth.constant'
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

    const submit = async (values) => {
        

        const payload = {
            name: values?.name,
            email: values?.email,
            password: values?.password,
            c_password: values?.c_password,
            phone: phone,
            registerType:'user',
            bypassPhone:true
        };

        console.log("values", payload);

        

        try {
        const rep  = await ApiSauce.post(REGISTER, payload)
        // alert(rep)
        console.log("🚀 ~ file: UserInformation.js ~ line 52 ~ submit ~ rep", rep)


        dispatch({
                    type: Auth.LOGIN_USER_API,
                    loading: false,
                    user: rep?.data,
                    isLoggedIn: true,
                });
            // console.log("🚀 ~ file: UserInformation.js ~ line 44 ~ submit ~ rep", rep)
            // console.log("🚀 ~ line 35 phone eeeeeeeeeeeeeeeeeee",phone)
            
        } catch (error) {
        alert(error.data)
        console.log("🚀 ~ file: UserInformation.js ~ line 64 ~ submit ~ error", error)

            // dispatch({
            //         type: Auth.LOGIN_USER_API,
            //         loading: false,
            //         user: rep?.data,
            //         isLoggedIn: true,
            //     });
            // alert(error.data);    
            console.log("🚀 ~ file: UserInformation.js ~ line 47 ~ submit ~ error", error)
            
        }
        // dispatch(signUp(payload));
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
