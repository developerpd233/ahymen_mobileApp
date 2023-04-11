import React, {useState} from 'react';
import {Container, CountriesModal} from "../../../containers";
import {useDispatch, useSelector} from "react-redux";
import {Modal, View} from "react-native";
import CForm from './Form'
import {useNavigation} from "@react-navigation/native";
import Styles from "../checkout/Checkout.style";
import _ from "lodash";
import AuthStyle from "../../auth/Auth.style";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { guestCheckout } from '../../../store/actions/Auth.action';

function GuestCheckout(props) {

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const reduxState = useSelector(({auth, global}) => {
        return {
            loading: auth.guestLoading,
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

    // const submit = (values) => {
    //     let perifix = `${selectedCountry?.idd?.root}${selectedCountry?.idd?.suffixes?.length > 1 ?  '' : selectedCountry?.idd?.suffixes[0]}`;
    //     let payload = _.omit(values, ['phone']);
    //     payload.phone =  `${perifix.replace(/[^\w\s]/gi, '')}${values.phone.replace(/\s+/g, '')}`;

    //     console.log('payload', payload)
    // };
    const submit = (values) => {
        let payload = _.omit(values, ['phone']);
        payload.phone =  selectedCountry.detail.code+values.phone;
        registerGuestUser(values)
    };

    const callbacl  = () =>{
        navigation.navigate('checkout')
    }

    const registerGuestUser = (values)=>{
        const payload = {
            registerType:'guest',     
                    name        : values.fullName,
                    email       : values.email,
                    phone       : `${values.phone}`,

        }
        dispatch(guestCheckout(payload , callbacl))

    //     axios.post('https://ayhman.webappcart.com/api/register', {

    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //         },
            
    //         registerType:'guest',     
    //         name        : values.fullName,
    //         email       : values.email,
    //         phone       : `${values.phone}`,

    //     })

    //     .then(function (response) {

    //         dispatch({
    //             type: AUTH.SIGN_UP_USER_API,
    //             loading: false,
    //             user: response?.data?.data,
    //              isIntialRootRoute:false
    //         });
    //     console.log(response.data.data.token+"60");    
    //     // _storeData(response.data.data.token)
      
    //     alert(response.data.message)
    //     navigation.navigate("Checkout");


    //    }).catch(function (error) {
            
    //         let emailError='';
    //         let phoneError='';

    //         if(error.data.data.email){emailError="\n"+error.data.data.email}    
    //         if(error.data.data.phone){phoneError="\n"+error.data.data.phone}
                
    //         alert(error.data.message+emailError+phoneError)    
    //    });
    }
//       const _storeData = async (token) => {
//         console.log("Sssss" , token)
//           try {
//             await AsyncStorage.setItem(
//               'guestToken',
//               token
//             );
// _retrieveData()
//           } catch (error) {
//             console.log(error+"68");
//           }
//         };

//         const _retrieveData = async () => {
//           try {
//             const value = await AsyncStorage.getItem('guestToken');
//             if (value !== null) {
//               // We have data!!
//               console.log(value+"76");
//             }
//           } catch (error) {
//             // Error retrieving data
//             console.log(error+"80");
//           }
//         };


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
