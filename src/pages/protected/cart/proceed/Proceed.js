import React from "react";
import { Container, ViewContainer } from "../../../../containers";
import { CText, CButton, CInput, CModal } from "../../../../uiComponents";
import { View } from "react-native";
import Styles from "../../store/Store.style";
import { useNavigation } from "@react-navigation/native";
import GlobalStyle from "../../../../assets/stylings/GlobalStyle";
import Style from "../thanksForOrdering/ThanksForOrdering.style";
import AuthStyle from "../../../auth/Auth.style";
import { useDispatch } from "react-redux";
import { UserInformation } from "../../../auth";
import { getCategory } from "../../../../store/actions/Root.action";
import AUTH from "../../../../store/constants/Auth.constant";

function Proceed(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const headerProps = {
        showCenterLogo: true,
        showCart: true,
        backButtonIcon: "close",
        backOnPress: () => {
            if (props?.route?.params?.isGoBack) {
                navigation.goBack();
            } else {
                navigation.navigate("Store", {
                    screen: "store",
                    initial: false,
                });
            }
        },
    };

    const next = (routeName) => {
        navigation.navigate(routeName, {
            isGoBack: true,
        });
    };

    return (
        <Container
            bottomSpace
            edges={["left", "right"]}
            scrollView={true}
            scrollViewProps={{
                contentContainerStyle: Styles.scrollContainer,
            }}
            headerProps={headerProps}
        >
            <View style={[Styles.container, Styles.center]}>
                <View
                    style={[
                        GlobalStyle.centerModalCenterViewBody,
                        Style.contentBody,
                    ]}
                >
                    <CText style={[Style.title, { fontSize: 22 }]}>
                        Proceed to check out
                    </CText>
                </View>

                <CButton
                    buttonStyle={Style.bottomButton}
                    loading={false}
                    title={"Register An Account"}
                    onPress={() =>
                        dispatch({
                            type: AUTH.LOGIN_USER_API,
                            loading: false,
                            user: {},
                            isLoggedIn: false,
                            isIntialRoute: false,
                        })
                    }
                />

                <View style={Style.orContainer}>
                    <CText style={Style.orContainerText}>- OR -</CText>
                </View>

                <CButton
                    title={"Checkout As A Guest"}
                    type={"outline"}
                    loading={false}
                    onPress={() => next("guest_checkout")}
                />
            </View>
        </Container>
    );
}
export default Proceed;
