import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Container, CountriesModal } from '../../../../containers';
import CForm from '../../../protected/checkout/addAddressForm/Form'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import ApiSauce from '../../../../utils/network'
import { SAVE_ADDRESS } from '../../../../config/webservices';
import Toast from 'react-native-simple-toast';
import AuthStyle from '../../../auth/Auth.style';

const addAddressFrom = (props) => {
  const reduxStates = useSelector(({ auth, global }) => {
    console.log("🚀 ~ file: Signup.js ~ line 22 ~ reduxState ~ auth", auth)
    return {
        loading: auth.isLoggedIn,
        currentCountry: global.currentCountry,
        countries: global.countries,
    };
  });

 
  const [apiErrMsg, setApiErrMsg] = useState(false)
  const [isSelected, setSelection] = useState(0);
  console.log("🚀 ~ file: addAddressFrom.js:16 ~ addAddressFrom ~ isSelected", isSelected)
  const [isSelected2, setSelection2] = useState(0);
  console.log("🚀 ~ file: addAddressFrom.js:17 ~ addAddressFrom ~ isSelected2", isSelected2)
  
  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState(reduxStates.currentCountry);
  const navigation = useNavigation()
  console.log('state-----01',isSelected)
  const headerProps = {
    showCenterLogo: true,
    showCart: true,
    backButtonIcon: 'close',
    backOnPress: () => {
      if (props?.route?.params?.isGoBack) {
        navigation.goBack()
      } else {
        navigation.navigate('Store', {
          screen: 'store',
          initial: false
        })
      }
    }
  };
  const reduxState = useSelector(({ root, auth, language }) => {
    return {
      user: auth?.user?.data,
      // loading: auth.sendOtpLoading,
      address: root?.addressData?.address,
      postalCode: root?.addressData?.postalCode,
      language: language?.language?.lan
    };
  });
  const token = reduxState?.user?.token


  console.log("🚀 ~ file: addAddressFrom.js:34 ~ reduxState ~ reduxState", token)

  const countryOnSelect = (item) => {
    updateSelectedCountry(item);
    toggleCountryModal();
  };
  const toggleCountryModal = () => {
    updateCountryModalIsOpen(!countryModalIsOpen);
  };
  const submit = async (values , reset) => {
    const formData = new FormData()
    formData.append("label",values.title)
    formData.append("name",values.name)
    formData.append("address",values.address)
    formData.append("phone",values.phone)
    formData.append("pincode",values.postalCode)
    formData.append("specialRequest[0][addressPrivate]",isSelected)
    formData.append("specialRequest[0][senderPrivate]",isSelected2)
    console.log('payload-56666666666666666666666--data',formData );
    try {
      const res = await ApiSauce.postWithToken(SAVE_ADDRESS, formData, token);
      console.log('api-data-sent', res)
      Toast.show(res?.message, Toast.LONG)
      
      if(res?.success){
        reset()
      }
      navigation.navigate('checkout')
    } catch (err) {
      console.log('api--error', err)
      Toast.show(err?.message, Toast.LONG)
      
    }
    // const api = post('url',payload,token)
    // console.log("🚀 ~ file: Location.js:230 ~ submit ~ values", values)
    // dispatch(saveAddress(values, callback))

  }
  return (
    <Container bottomSpace edges={['left', 'right']} scrollView={true} headerProps={headerProps}>
      <View style={{marginHorizontal:20, marginVertical:10}}>
      <CForm
        loading={reduxState?.loading}
        submit={(submit)}
        selectedCountry={selectedCountry}
        isSelected={isSelected}
        isSelected2={isSelected2}
        checkboxOne={() => setSelection(isSelected == 0 ? 1 : 0 )}
        checkBoxTwo={() => setSelection2(isSelected2 == 0 ? 1 : 0)}
        toggleCountryModal={toggleCountryModal}
      />
      </View>
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
  )
}

export default addAddressFrom

const styles = StyleSheet.create({})