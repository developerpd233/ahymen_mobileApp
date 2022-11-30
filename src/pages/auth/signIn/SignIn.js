import React, { useState } from "react";
import { Container, CountriesModal } from "../../../containers";
import { CLoading, ProgressiveImage } from "../../../uiComponents";
import { useSelector, useDispatch } from "react-redux";
import { Modal, View } from "react-native";
import AuthStyle from "../Auth.style";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import CForm from "./Form";
import _ from "lodash";
import ApiSauce from "../../../utils/network";
import { useNavigation } from "@react-navigation/native";
import { SEND_CODE } from "../../../config/webservices";
import { showTowst } from "../../../utils/utilFunctions";
import { sendOtp } from "../../../store/actions/Auth.action";

function SignIn(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [phoneError, setPhoneError] = useState(" ");

    const reduxState = useSelector(({ auth, global }) => {
        return {
            // loading: auth.sendOtpLoading,
            currentCountry: global.currentCountry,
            countries: global.countries,
        };
    });

    const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
    const [selectedCountry, updateSelectedCountry] = useState(
        reduxState.currentCountry
    );

    const toggleCountryModal = () => {
        updateCountryModalIsOpen(!countryModalIsOpen);
    };

    const countryOnSelect = (item) => {
        updateSelectedCountry(item);
        toggleCountryModal();
    };

    const submit = async (values) => {
        // setPhoneError("");
        let perifix = `${selectedCountry?.idd?.root}${
            selectedCountry?.idd?.suffixes?.length > 1
                ? ""
                : selectedCountry?.idd?.suffixes[0]
        }`;
        let payload = _.omit(values, ["phone"]);
        payload.phone =  selectedCountry.detail.code+values.phone;
        payload.loginType =  'user';
        console.log(payload);
        handleCode(payload)
    //     const data = await dispatch(
    //         sendOtp({ phone: `+${payload.phone}` })
    //     ).then((response) => {
    //         console.log(response,payload.phone);
    //         // alert(response.data.message)
    //         if (response?.response.data?.success) {
    //             navigation.navigate("otp_verification", {
    //                 phone: `+${payload.phone}`,
    //             });
    //         }
    //     }).catch(function (error) {
            
    //         console.log(error , "66666666666666666");  
    //    });

        // handleCode(payload);
        // navigation.navigate("otp_verification", {
        //     phone: `+${payload.phone}`,
        // });
        console.log("payload", payload);
    };

    const handleCode = async (payload) => {
        console.log("🚀 ~ file: SignIn.js ~ line 79 ~ handleCode ~ payload", payload)
        setIsLoading(true);
        try {
            const sendCodeRes = await ApiSauce.post(SEND_CODE, {
               phone: `${payload.phone}`
            });
            console.log(sendCodeRes,'85');
            if (sendCodeRes.success) {
                showTowst(
                    "success",
                    sendCodeRes.message,
                    sendCodeRes.data.response
                );
                navigation.navigate("otp_verification", {phone:`${payload.phone}`});
            }
        } catch (error) {
            showTowst(
                "error",
                error?.message?.invalid,
                "Please Enter Valid Phone"
            );
            console.log('error ----- 94   ', error , payload)
            // alert(error.message);
            // if (!error.success) {
            //     setPhoneError(error.message.invalid);
            // }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container
            backgroundColor={"theme-color"}
            showPattern={true}
            scrollView={true}
            loading={reduxState?.loading || isLoading}
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

            <CForm
                submit={submit}
                loading={reduxState?.loading}
                selectedCountry={selectedCountry}
                toggleCountryModal={toggleCountryModal}
                phoneErr={phoneError}
                onLoginPress={() => navigation.navigate("login")}
            />

            <Modal
                transparent={true}
                visible={countryModalIsOpen}
                onRequestClose={() => toggleCountryModal()}
            >
                <View style={AuthStyle.modalContainer}>
                    <View style={AuthStyle.modalInnerContainer}>
                        <CountriesModal
                            onSelect={(val) => countryOnSelect(val)}
                        />
                    </View>
                </View>
            </Modal>
        </Container>
    );
}
export default SignIn;
