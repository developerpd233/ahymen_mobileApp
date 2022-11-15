import React from "react";
import { Container } from "../../../containers";
import { useSelector, useDispatch } from "react-redux";
import AuthStyle from "../Auth.style";
import CForm from "./Form";
import events from "../../../utils/events";
import { useNavigation } from "@react-navigation/native";
import { sendOtp, verifyOtp } from "../../../store/actions/Auth.action";
import ApiSauce from '../../../utils/network'
import { SEND_CODE, VERIFY_CODE } from "../../../config/webservices";
import  Auth  from "../../../store/constants/Auth.constant";
function OtpVerification({ route }) {
    const { phone } = route?.params || {};
    console.log("🚀 ~ file: OtpVerification.js ~ line 13 ~ OtpVerification ~ phone", phone)
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const reduxState = useSelector(({ auth, global }) => {
        return {
            loading: auth?.verifyOtpLoading,
        };
    });

    const submit = async  (values) => {
        console.log("values", values);
        const payload = {
            local_storage_phone: phone,
            verification: values.otp,
        };
        try {
        const resp  = await ApiSauce.post(VERIFY_CODE, payload)
        navigation.navigate("user_information" ,{
            phone:phone
        })
        // dispatch({
        //             type: Auth.LOGIN_USER_API,
        //             loading: false,
        //             user: response?.data
        //             isLoggedIn: true,
        //         });
        console.log('respresprespresprespresprespresprespresp', resp)

            
        } catch (error) {
        navigation.navigate("user_information" ,{
            phone:phone
        })

            // dispatch({
            //     type: Auth.LOGIN_USER_API,
            //     loading: false,
            //     // user: response?.data?.data?.data,
            //     isLoggedIn: true,
            // });
            console.log('errorerrorerrorerror', error)
            
        }
        // dispatch(verifyOtp(payload)).then((response) => {
        //     console.log(response);
        //     // if (response?.response.data?.success) {
        //     //     navigation.navigate("user_information", { phone });
        //     // }
        // });
        // navigation.navigate("user_information", { phone });
    };

    const resendOtp = () => {
        events.emit("restartOTPTimer", {});
    };

    const headerProps = {
        showCenterLogo: false,
        headerRight: true,
        transparent: true,
    };

    return (
        <Container
            headerProps={headerProps}
            backgroundColor={"theme-color"}
            showPattern={true}
            scrollView={true}
            loading={reduxState?.loading}
            scrollViewProps={{
                contentContainerStyle: AuthStyle.container,
            }}
        >
            <CForm
                submit={submit}
                resendOtp={resendOtp}
                loading={reduxState?.loading}
            />
        </Container>
    );
}
export default OtpVerification;
