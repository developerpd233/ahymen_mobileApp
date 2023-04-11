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
import { SEND_CODE , LOGIN } from "../../../config/webservices";
import { showTowst } from "../../../utils/utilFunctions";
import { sendOtp } from "../../../store/actions/Auth.action";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Auth from '../../../store/constants/Auth.constant'
import { LoginManager, AccessToken, Profile ,LoginButton } from 'react-native-fbsdk-next';

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
        handleCode(payload)
   
    };

    const handleCode = async (payload) => {
        setIsLoading(true);
        try {
            const sendCodeRes = await ApiSauce.post(SEND_CODE, {
               phone: `${payload.phone}`
            });
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
          
        } finally {
            setIsLoading(false);
        }
    };

    const RequestGoogleLogin = async () => {

        const configPayload = {
            scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
            webClientId: '803774630900-8bao69qodd7ab57b2gno7ok97gjilhqo.apps.googleusercontent.com',
            offlineAccess: true
        }
        GoogleSignin.configure(configPayload);

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            handleCreate("google", userInfo)
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line 144 ~ handleGoogle ~ error", error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            } else {
            }
        }
    }
    const handleCreate = async (social_type, data, res, accessToken) => {
        setIsLoading(true)
        let formData = new FormData();

        if (social_type == 'google') {
            formData.append('loginType', 'social')
            formData.append('socialType', 'google')
            formData.append('socialId', data.user.id);
            formData.append('GoogleName', data.user.name);
            formData.append('GoogleEmail', data.user.email);
        }
        else if (social_type == 'facebook') {
            formData.append('loginType', 'social')
            formData.append('socialType', 'facebook')
            formData.append('socialId', data.user.id);
            formData.append('GoogleName', data.user.name);
            formData.append('GoogleEmail', data.user.email);
        }
        try {
            const res = await ApiSauce.post(LOGIN, formData);
            handleCheckUserData(res);
        } catch (error) {
            console.log("🚀 ~ file: SignIn.js:138 ~ handleCreate ~ error", error)
            setIsLoading(false);
            console.log(
                '🚀  handleCreate ~ error',
                error,
            );
            if (error.status == 404) {
                alert('somg thing wrong')
            }
        }
        // setIsLoading(false)
    };

    const handleCheckUserData = (loginRes) => {
        if (loginRes) {
            setIsLoading(false)
            dispatch({
                type: Auth.LOGIN_USER_API,
                loading: false,
                user: loginRes?.data,
                isLoggedIn: true,
            });
        }
    }
    const onFBButtonPress = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['email', "public_profile"]);
            const data = await AccessToken.getCurrentAccessToken();
            const currentProfile = await Profile.getCurrentProfile();
        } catch (error) {
            console.log("🚀 ~ file: SignIn.js:171 ~ onFBButtonPress ~ error", error)
            
        }
      
        // handleGetFbEmail(data.accessToken, currentProfile)
    };
    
    const handleGetFbEmail = async (accessToken, data) => {
        setIsLoading(true);
        try {
            const res = await ApiSauce.getWithoutToken(FB_GET_USER(accessToken))
            handleCreate("facebook", data, res, accessToken)
        } catch (error) {
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
                onGooglePress={()=>RequestGoogleLogin()}
                onFacebookPress={()=>{ onFBButtonPress() }}
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
