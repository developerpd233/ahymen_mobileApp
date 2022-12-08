import React, {useRef, useState} from 'react';
import {Container} from "../../../containers";
import {CInput, CText} from "../../../uiComponents";
import {View, TouchableOpacity} from "react-native";
import Styles from "./Location.style";
import CForm from "./Form";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import PolylineDirection from '@react-native-maps/polyline-direction';
import Icons from '../../../assets/icons/CustomIcon';
import {useNavigation} from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '../../../store/actions/Root.action';
import '../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';

const origin = { latitude: 19.363631, longitude: -99.182545 };
const destination = { latitude: 19.2932543, longitude: -99.1794758 };
const GOOGLE_MAPS_APIKEY = 'AIzawyABlYq9oPRdf7VuOuDw-fKJsfboX-qY5dI';

const customStyle = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#242f3e',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#ffb606',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#242f3e',
            },
        ],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#ffb606',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#263c3f',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#00ff00',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                color: '#38414e',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#212a37',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9ca5b3',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#746855',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#1f2835',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#f3d19c',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#2f3948',
            },
        ],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#17263c',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#515c6d',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#17263c',
            },
        ],
    },
];


function Location(props) {
    const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const headerProps = {
        showCenterLogo: true,
        showCart: true,
        backButtonIcon: 'close',
        backOnPress: () => {
            if(props?.route?.params?.isGoBack) {
                navigation.goBack()
            } else {
                navigation.navigate('Store', {
                    screen: 'store',
                    initial: false
                })
            }
        }
    };



    const reduxState = useSelector(({ auth  , root , cart}) => {
        
        return {
            loading: root.addressLoading,
            // addressData :root.
        };
    });
    

    const submit = (values)=>{
        dispatch(saveAddress(values, callback))

    }
    const callback = (res)=>{
        Toast.show('Location added successfully', Toast.LONG)

        // alert('dd')
        console.log('res ', res )
    }

    return(
        <Container bottomSpace edges={['left', 'right']} scrollView={true} headerProps={headerProps}>


            <View style={Styles.container}>

                <View style={Styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={Styles.map}
                        customMapStyle={customStyle}
                        region={{
                            latitude: 24.978914,
                            longitude:  67.032971,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        {/*<PolylineDirection*/}
                        {/*    origin={origin}*/}
                        {/*    destination={destination}*/}
                        {/*    apiKey={GOOGLE_MAPS_APIKEY}*/}
                        {/*    strokeWidth={4}*/}
                        {/*    strokeColor="#12bc00"*/}
                        {/*/>*/}
                    </MapView>
                </View>

                <View style={Styles.buttonContainer}>
                    <TouchableOpacity style={Styles.button}>
                        <Icons style={Styles.buttonIcon} name={"pin-location"}/>
                        <CText style={Styles.buttonText}>{t('Choose_on_map')}</CText>
                    </TouchableOpacity>
                </View>


                <CForm  loading={reduxState?.loading} submit={submit} />

            </View>

        </Container>

    )
}
export default Location;
