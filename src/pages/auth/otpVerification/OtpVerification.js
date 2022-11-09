import React from "react";
import { Container } from "../../../containers";
import { useSelector, useDispatch } from "react-redux";
import AuthStyle from "../Auth.style";
import CForm from "./Form";
import events from "../../../utils/events";
import { useNavigation } from "@react-navigation/native";
import { sendOtp, verifyOtp } from "../../../store/actions/Auth.action";

function OtpVerification({ route }) {
    const { phone } = route?.params || {};
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const reduxState = useSelector(({ auth, global }) => {
        return {
            loading: auth?.verifyOtpLoading,
        };
    });

    const submit = (values) => {
        console.log("values", values);
        const payload = {
            local_storage_phone: phone,
            verification: values.otp,
        };
        dispatch(verifyOtp(payload)).then((response) => {
            console.log(response);
            if (response?.response.data?.success) {
                navigation.navigate("user_information", { phone });
            }
        });
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
