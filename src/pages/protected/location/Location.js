import React, {useRef, useState} from 'react';
import {CButton, CInput, CText} from '../../../uiComponents';
import {View, TouchableOpacity, Modal, Text} from 'react-native';
import Styles from './Location.style';
import CForm from './Form';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import PolylineDirection from '@react-native-maps/polyline-direction';
import Icons from '../../../assets/icons/CustomIcon';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {saveAddress} from '../../../store/actions/Root.action';
import '../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';
import AuthStyle from '../../auth/Auth.style';
import {Container, CountriesModal} from '../../../containers';
import Toast from 'react-native-simple-toast';
import {useEffect} from 'react';
import {GET_ALL_ADDRESS} from '../../../config/webservices';
import ApiSauce from '../../../utils/network';
import {useIsFocused} from '@react-navigation/native';
const origin = {latitude: 19.363631, longitude: -99.182545};
const destination = {latitude: 19.2932543, longitude: -99.1794758};
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
  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState(0);
  const [currentLanguage, setLanguage] = useState('ar');
  const [apiData, setApiData] = useState();
  console.log('🚀 ~ file: Form.js:16 ~ CForm ~ apiData', apiData);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const reduxState = useSelector(({auth, root, cart}) => {
    console.log(
      '🚀 ~ file: Location.js:189 ~ reduxState ~ reduxState',
      reduxState,
    );

    return {
      loading: root.addressLoading,
      currentCountry: root,
    };
  });

  const reduxStates = useSelector(({auth}) => {
    return {
      user: auth.user,
    };
  });
  const reduxStatess = useSelector(({auth, global}) => {
    console.log('🚀 ~ file: Signup.js ~ line 22 ~ reduxState ~ auth', auth);
    return {
      loading: auth.isLoggedIn,
      currentCountry: global.currentCountry,
      countries: global.countries,
    };
  });
  const usersToken = reduxStates.user?.data?.token;
  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState(
    reduxStatess.currentCountry,
  );
  const navigation = useNavigation();

  const headerProps = {
    showCenterLogo: true,
    showCart: true,
    backButtonIcon: 'close',
    backOnPress: () => {
      if (props?.route?.params?.isGoBack) {
        navigation.goBack();
      } else {
        navigation.navigate('Store', {
          screen: 'store',
          initial: false,
        });
      }
    },
  };

  useEffect(() => {
    GetAddressApis();
  }, [isFocused]);
  const GetAddressApis = async () => {
    try {
      const GetAddressData = await ApiSauce.getWithToken(
        GET_ALL_ADDRESS,
        usersToken,
      );
      console.log('get--all-address', GetAddressData);
      setApiData(GetAddressData?.data);
    } catch (err) {
      console.log('err-in_get_address_api', err);
    }
  };
  const countryOnSelect = item => {
    updateSelectedCountry(item);
    toggleCountryModal();
  };
  const toggleCountryModal = () => {
    updateCountryModalIsOpen(!countryModalIsOpen);
  };

  const submit = (values, isSelected2) => {
    const payload = {
      //   name:values.name,
      //   name:values.name,
      //   name:values.name,name:values.name
      //   ,name:values.name
    };

    // const api = post('url',payload,token)
    console.log('🚀 ~ file: Location.js:230 ~ submit ~ values', values);
    dispatch(saveAddress(values, callback));
  };
  const callback = res => {
    console.log('🚀 ~ file: Location.js:239 ~ callback ~ res', res);

    Toast.show('Location added successfully', Toast.LONG);
    navigation.navigate('checkout');
    // alert('dd')n
    console.log('res ', res);
  };
  const locationAdd = () => {
    
    navigation.navigate('Cart', {
      screen: 'addAddressForm',
      isGoBack: true,
    });
  };




  return (
    <Container
      bottomSpace
      edges={['left', 'right']}
      scrollView={true}
      headerProps={headerProps}>
      <View style={Styles.container}>
        <View style={Styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={Styles.map}
            customMapStyle={customStyle}
            region={{
              latitude: 24.978914,
              longitude: 67.032971,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            {/* <PolylineDirection
                           origin={origin}
                           destination={destination}
                           apiKey={GOOGLE_MAPS_APIKEY}
                           strokeWidth={4}
                           strokeColor="#12bc00"
                        /> */}
          </MapView>
        </View>

        <View style={Styles.buttonContainer}>
          <TouchableOpacity style={Styles.button}>
            <Icons style={Styles.buttonIcon} name={'pin-location'} />
            <CText style={Styles.buttonText}>{t('Choose_on_map')}</CText>
          </TouchableOpacity>
        </View>

        <View style={Styles.addLocationContainer}>
          <CText style={Styles.addLocationTitle}>{t('Add_new_address')}</CText>
          <CButton
            buttonStyle={[Styles.addLocationButton, {width: 180}]}
            buttonText={Styles.addLocationButtonText}
            iconStyle={Styles.addLocationButtonIcon}
            iconType={'left'}
            iconName={'plusmark'}
            onPress={() => locationAdd()}
            title={t('Add_new_address')}
          />
        </View>
        {apiData?.map(dataApi => {
          console.log(
            '🚀 ~ file: Location.js:283 ~ apiData.map ~ val',
            dataApi,
          );
          return (
            <CForm
              loading={reduxState?.loading}
              submit={submit}
              selectedCountry={selectedCountry}
              isSelected={isSelected}
              isSelected2={isSelected2}
              checkboxOne={() => setSelection(!isSelected)}
              checkBoxTwo={() => setSelection2(isSelected2 == 0 ? 1 : 0)}
              toggleCountryModal={toggleCountryModal}
              data={dataApi}
            />
          );
        })}

        {/* <CForm  
                loading={reduxState?.loading} 
                submit={submit}
                selectedCountry={'+1'}
                isSelected={isSelected}
                isSelected2={isSelected2}
                checkboxOne={()=>setSelection(!isSelected)}
                checkBoxTwo={()=>setSelection2(isSelected2 == 0 ? 1 : 0)}
                toggleCountryModal={toggleCountryModal}
                 /> */}
        <Modal
          transparent={true}
          visible={countryModalIsOpen}
          onRequestClose={() => toggleCountryModal()}>
          <View style={AuthStyle.modalContainer}>
            <View style={AuthStyle.modalInnerContainer}>
              <CountriesModal onSelect={val => countryOnSelect(val)} />
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
}
export default Location;
