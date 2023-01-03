import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Container, CountriesModal} from '../../../../containers';
import CForm from '../../../protected/checkout/addAddressForm/Form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import ApiSauce from '../../../../utils/network';
import {SAVE_ADDRESS} from '../../../../config/webservices';
import Toast from 'react-native-simple-toast';
import AuthStyle from '../../../auth/Auth.style';
import {CInput} from '../../../../uiComponents';
import {useTranslation} from 'react-i18next';
import {autoComplete} from '../../../../store/actions/Root.action';
import SelectDropdown from 'react-native-select-dropdown';
import {themes} from '../../../../theme/colors';
import WebView from 'react-native-webview';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
const addAddressFrom = props => {
  const reduxStates = useSelector(({auth, global}) => {
    console.log('🚀 ~ file: Signup.js ~ line 22 ~ reduxState ~ auth', auth);
    return {
      loading: auth.isLoggedIn,
      currentCountry: global.currentCountry,
      countries: global.countries,
    };
  });

  const [apiErrMsg, setApiErrMsg] = useState(false);
  const [isSelected, setSelection] = useState(0);
  const [location, setLocation] = useState('');
  console.log(
    '🚀 ~ file: addAddressFrom.js:16 ~ addAddressFrom ~ isSelected',
    isSelected,
  );
  const [isSelected2, setSelection2] = useState(0);
  const [addressData, setAdressData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isDropDown, setIsDropDown] = useState(false);
 const [timer, setTimer] = useState(false);
  console.log(
    '🚀 ~ file: addAddressFrom.js:35 ~ addAddressFrom ~ selectedAddress',
    selectedAddress,
  );

  console.log(
    '🚀 ~ file: addAddressFrom.js:17 ~ addAddressFrom ~ isSelected2',
    isSelected2,
  );

  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState(
    reduxStates.currentCountry,
  );
  const Ccode = selectedCountry?.detail?.code;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  console.log('state-----01', isSelected);
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
  const reduxState = useSelector(({root, auth, language}) => {
    return {
      user: auth?.user?.data,
      // loading: auth.sendOtpLoading,
      address: root?.addressData?.address,
      postalCode: root?.addressData?.postalCode,
      language: language?.language?.lan,
    };
  });
  const token = reduxState?.user?.token;
  const languageTrans = reduxState.language;

  const countryOnSelect = item => {
    console.log('country-code', item);
    updateSelectedCountry(item);
    toggleCountryModal();
  };
  const toggleCountryModal = () => {
    updateCountryModalIsOpen(!countryModalIsOpen);
  };
  const myLan = reduxStates.language;

  const {t, i18n} = useTranslation();
  const submit = async (values, reset) => {
    const formData = new FormData();
    formData.append('label', values.title);
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('phone', `${Ccode}${values.phone}`);
    formData.append('pincode', values.postalCode);
     formData.append('auto_address_json', JSON.stringify(selectedAddress));
    formData.append('specialRequest[0][addressPrivate]', isSelected);
    formData.append('specialRequest[0][senderPrivate]', isSelected2);
    console.log('payload-56666666666666666666666--data', formData);
    try {
      const res = await ApiSauce.postWithToken(SAVE_ADDRESS, formData, token);
      console.log('api-data-sent', res);
      Toast.show(res?.message, Toast.LONG);

      if (res?.success) {
        reset();
      }
      navigation.navigate('checkout');
    } catch (err) {
      console.log('api--error', err);
      Toast.show(err?.message, Toast.LONG);
    }
    // const api = post('url',payload,token)
    // console.log("🚀 ~ file: Location.js:230 ~ submit ~ values", values)
    // dispatch(saveAddress(values, callback))
  };
  const handleSubmit = val => {
    console.log('🚀 ~ file: addAddressFrom.js:123 ~ handleSubmit ~ val', val);
    setLocation(val);
    if (val.length > 3) {
      const payload = {
        question: val,
      };
      try {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        const payload = {
          question: val,
        };
        dispatch(autoComplete(payload, callBack));
          // fakeApi()
      }, 500);
      setTimer(newTimer);

        
      } catch (error) {
        console.log(
          '🚀 ~ file: addAddressFrom.js:133 ~ handleSubmit ~ error',
          error,
        );
      }

      // console.log('val', val)
      // clearTimeout(timer);
      // const newTimer = setTimeout(() => {
      //   const payload = {
      //     question: val,
      //   };
      //   dispatch(autoComplete(payload, callBack));
      //     // fakeApi()
      // }, 1000);
      // setTimer(newTimer);
    } else if(val === ''){
      setIsDropDown(false)
    }
  };

  const callBack = res => {
    console.log('🚀 ~ file: addAddressFrom.js:117 ~ callBack ~ res', res);
    setAdressData(res.data);
    setIsDropDown(true)
    // renderDropDown(res.data)
  };

  // const renderDropDown = ()=>{
  //     <Text style={{backgroundColor:'red'}}>kdndkj</Text>
  // }
  return (
    <Container
      bottomSpace
      edges={['left', 'right']}
      scrollView={true}
      headerProps={headerProps}>
      <View style={{marginHorizontal: 20}}>
        <CInput
          inputLabel={t('Select_Address')}
          placeholder={t('Select_Address')}
          value={location}
          onChangeText={val => handleSubmit(val)}
          returnKeyType="done"
          inputErrorStyle={{
            textAlign: languageTrans == 'ar' ? 'right' : 'left',
          }}
        />
        {isDropDown && (
          <View
            style={{
              backgroundColor: '#FFF',
              marginTop: -30,
              borderWidth: 1,
              borderColor: themes['light'].colors.lightenGray,
              borderTopWidth: 0,
              borderBottomEndRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <ScrollView
              style={{
                height: 150,
                paddingVertical: 10,
                padding: 6,
                marginBottom: 10,
              }}
              showsVerticalScrollIndicator={false}>
              {addressData.map(val => {
                console.log(
                  '🚀 ~ file: addAddressFrom.js:158 ~ addAddressFrom ~ val',
                  val,
                );
                return (
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      padding: 5,
                      borderBottomWidth: 1,
                      borderColor: themes['light'].colors.lightenGray,
                    }} onPress={()=> (setIsDropDown(false) , setSelectedAddress(val))} 
                    >
                    <Text
                      style={{
                        fontSize: 15,
                        color: themes['light'].colors.dark,
                      }}>
                      {val.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* <SelectDropdown  data={addressData}
                            onSelect={(selectedItem, index) => {
                              setSelectedAddress(selectedItem)
                              // handleSelectedValue(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              // text represented after item is selected
                              // if data array is an array of objects then return selectedItem.property to render after item is selected
                              return selectedItem.label;
                            }}
                            rowTextForSelection={(item, index) => {
                              // text represented for each item in dropdown
                              // if data array is an array of objects then return item.property to represent item in dropdown
                              return item.label;
                            }}
                            buttonStyle={{
                              borderWidth: 1,
                              // marginTop: 10,
                              paddingHorizontal: 15,
                              width: '100%',
                              borderColor: 'rgba(124, 128, 97, 0.30)',
                              borderRadius: 10,
                              backgroundColor: '#FFF',
                              // paddingHorizontal: 15,
                            }}
                            dropdownStyle={{ 
                              marginTop:-40,
                              paddingHorizontal: 15,
                              borderColor: 'rgba(124, 128, 97, 0.30)',
                              borderBottomLeftRadius: 10,
                              borderBottomRightRadius: 10,
                              opacity:1,
                              backgroundColor: '#FFF',
                             
                            }}
                            buttonTextStyle={{
                              textTransform: 'capitalize',
                              color:themes['light'].colors.fontColor,
                              fontFamily: myLan === 'en' ? themes.font.regular : themes.font2.regular,
                              flex: 1,
                              fontSize: 16,
                              textAlign: 'left',
                              marginLeft:0
                            }}
                            rowTextStyle={{
                              textTransform: 'capitalize',
                              color:themes['light'].colors.fontColor,
                              fontFamily: myLan === 'en' ? themes.font.regular : themes.font2.regular,
                              flex: 1,
                              fontSize: 16,
                              textAlign: 'left',
                              marginLeft:0
                            }}
                            defaultButtonText={t('Select_Address')}
                            // renderDropdownIcon={() => renderIcon()}
                            dropdownIconPosition="right"/> */}
        {selectedAddress?.map_url && (
          <View style={{height: 300, marginVertical: 10}}>
            <WebView
              source={{
                uri: selectedAddress?.map_url,
              }}
            />
          </View>
        )}
      </View>

      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <CForm
          loading={reduxState?.loading}
          submit={submit}
          selectedCountry={selectedCountry}
          isSelected={isSelected}
          isSelected2={isSelected2}
          checkboxOne={() => setSelection(isSelected == 0 ? 1 : 0)}
          checkBoxTwo={() => setSelection2(isSelected2 == 0 ? 1 : 0)}
          toggleCountryModal={toggleCountryModal}
        />
      </View>
      <Modal
        transparent={true}
        visible={countryModalIsOpen}
        onRequestClose={() => toggleCountryModal()}>
        <View style={AuthStyle.modalContainer}>
          <View style={AuthStyle.modalInnerContainer}>
            <CountriesModal
              onSelect={val => {
                countryOnSelect(val),
                  console.log('code___+++___country', val?.detail?.code);
              }}
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default addAddressFrom;

const styles = StyleSheet.create({});
