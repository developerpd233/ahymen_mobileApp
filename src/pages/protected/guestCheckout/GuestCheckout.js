import React, {useState} from 'react';
import {Container, CountriesModal} from "../../../containers";
import {useSelector} from "react-redux";
import {Modal, View} from "react-native";
import CForm from './Form'
import {useNavigation} from "@react-navigation/native";
import Styles from "../checkout/Checkout.style";
import _ from "lodash";
import AuthStyle from "../../auth/Auth.style";

function GuestCheckout(props) {

    const navigation = useNavigation();

    const reduxState = useSelector(({auth, global}) => {
        return {
            loading: false,
            currentCountry: global.currentCountry,
            countries: global.countries,
        }
    });

    const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
    const [selectedCountry, updateSelectedCountry] = useState(reduxState.currentCountry);

    const toggleCountryModal = () => {
        updateCountryModalIsOpen(!countryModalIsOpen)
    };

    const countryOnSelect = (item) => {
        updateSelectedCountry(item);
        toggleCountryModal();
    };

    const submit = (values) => {
        let perifix = `${selectedCountry?.idd?.root}${selectedCountry?.idd?.suffixes?.length > 1 ?  '' : selectedCountry?.idd?.suffixes[0]}`;
        let payload = _.omit(values, ['phone']);
        payload.phone =  `${perifix.replace(/[^\w\s]/gi, '')}${values.phone.replace(/\s+/g, '')}`;

        console.log('payload', payload)
    };


    const headerProps = {
        showCenterLogo: true,
        showCart: false,
        backButtonIcon: 'close',
    };

    return(
        <Container
            bottomSpace
            headerProps={headerProps}
            scrollView={true}
            loading={reduxState?.loading}
        >
            <View style={[Styles.container, {marginVertical: 30}]}>

                <View style={[Styles.sectionListItem, {paddingVertical: 25}]}>

                    <CForm
                        submit={submit}
                        loading={reduxState?.loading}
                        selectedCountry={selectedCountry}
                        toggleCountryModal={toggleCountryModal}
                    />
                </View>

                <Modal
                    transparent={true}
                    visible={countryModalIsOpen}
                    onRequestClose={() => toggleCountryModal()}>
                    <View
                        style={AuthStyle.modalContainer}>
                        <View style={AuthStyle.modalInnerContainer}>
                            <CountriesModal onSelect={(val) => countryOnSelect(val)}/>
                        </View>
                    </View>
                </Modal>
            </View>

        </Container>
    )
}
export default GuestCheckout;
