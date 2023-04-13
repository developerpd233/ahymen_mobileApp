import React, { useRef, useState, useEffect } from 'react';
import { Container } from '../../../containers';
import {
  CListItem,
  CText,
  CButton,
  ProgressiveImage,
} from '../../../uiComponents';
import { View } from 'react-native';
import Styles from './Checkout.style';
import ThanksForOrdering from './../cart/thanksForOrdering/ThanksForOrdering';
import { useNavigation } from '@react-navigation/native';
import { handleError, MappedElement } from '../../../utils/methods';
import { useDispatch, useSelector } from 'react-redux';
import ApiSauce from '../../../utils/network';
import {
  GET_ALL_ADDRESS,
  GET_TOKEN,
  NEW_ORDER,
} from '../../../config/webservices';
import { removeAllProduct } from '../../../store/actions/Cart.action';
import { getValueIntoLocalStorage } from '../../../utils/asyncStorage/Functions';
import { TOKEN } from '../../../utils/asyncStorage/Constants';
import '../../../utils/i18n/lan';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
// import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import ModalDropdown from 'react-native-modal-dropdown';
import { themes } from '../../../theme/colors';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import SelectDropdown from 'react-native-select-dropdown';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import TelrSdk from 'rn-telr-sdk';
const methodsConst = ['VISA', 'PAYPAL', 'MASTER'];

function Checkout({ route }) {
  const { t, i18n } = useTranslation();
  const { values, totalSum } = route?.params || '';
  const dispatch = useDispatch();
  const form = useRef(null);
  const cardNumber = useRef(null);
  const nameOnCard = useRef(null);
  const expiry = useRef(null);
  const cvv = useRef(null);
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const reduxState = useSelector(({ auth, root, cart }) => {
    return {
      loading: false,
      data: cart,
      user: auth.user,
    };
  });
  const { first_name, last_name, phone, email } = reduxState?.user?.data?.user || ''
  const usersToken = reduxState.user?.data?.token;
  const [selectedMethod, updateMethod] = useState('VISA');
  const [thanksModal, updateThanksModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [webUrl, setWebUrl] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [valueOne, setValueOne] = useState(null);
  const [items, setItems] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [telrModalVisible, setTelrModalVisible] = useState(false);

  const [paymentRequest, setPaymentRequest] = useState(null);

  const [billing_name_first, setBilling_name_first] = React.useState('');

  const [billing_name_last, setBilling_name_last] = React.useState(last_name || 'none');

  const [tran_amount, setTran_amount] = React.useState(totalSum);

  const headerProps = {
    showCenterLogo: true,
    showCart: true,
    backButtonIcon: 'close',
  };
  const reduxStates = useSelector(({ language }) => {
    return {
      language: language?.language?.lan,
    };
  });
  const myLan = reduxStates.language;
  const renderCheck = val => {
    let url = require('../../../assets/images/uncheck.png');
    if (val === selectedMethod) {
      url = require('../../../assets/images/check.png');
    }
    return (
      <ProgressiveImage
        source={url}
        style={Styles.sectionListItemHeaderCheckImage}
      />
    );
  };

  const onSelectMethod = val => {
    updateMethod(selectedMethod !== val ? val : '');
  };

  const locationAdd = () => {
    navigation.navigate('Cart', {
      screen: 'addAddressForm',
      isGoBack: true,
    });
  };
  const renderItem = item => {
    return (
      <CListItem
        activeOpacity={1}
        type={'horizontal'}
        image={{ uri: item?.ProductImage[0] }}
        orderNumber={`${t('Item')} # ${item?.ProductId} `}
        title={item?.ProductName}
        price={`${t('SAR')} ${Number(item?.ProductPrice) * Number(item?.quantity)}`}
        qun={item?.quantity}
        listItemView={{ marginBottom: 5 }}
        imageStyle={{ minHeight: 80, minWidth: 85 }}
        priceStyle={Styles.orderPriceStyle}
      />
    );
  };



  const handle_order = async values => {
    setLoading(true);
    if (selectedAddress == null) {
      setLoading(false);
      Toast.show(items?.length > 0 ? t('Please_select_the_address') : t('Please_add_new_address'), Toast.LONG);
    } else {
      const token = await getValueIntoLocalStorage(TOKEN);
      const tokenRes = await ApiSauce.getWithToken(GET_TOKEN, token);
      try {
        BraintreeDropIn.show({
          clientToken: tokenRes?.data[0],

          countryCode: '+966', //apple pay setting
          currencyCode: 'SAR', //apple pay setting
          orderTotal: 'Total Price',
          googlePay: false,
          applePay: false,
          vaultManager: false,
          payPal: true,
          cardDisabled: false,
          darkTheme: true,
        })
          .then(result => handleData(result.nonce, token))
          .catch(error => {
            setLoading(false);
            if (error.code === 'USER_CANCELLATION') {
              // update your UI to handle cancellation
            } else {
              // update your UI to handle other errors
              // for 3D secure, there are two other specific error codes: 3DSECURE_NOT_ABLE_TO_SHIFT_LIABILITY and 3DSECURE_LIABILITY_NOT_SHIFTED
            }
          });
      } catch (error) {
      }
    }
  };
  const handleData = async (userToken) => {
    const formData = new FormData();
    await reduxState?.data.map((e, ind) => {
      let totalSum = 0;
      reduxState?.data?.forEach(obj => {
        let objSum = obj.ProductPrice
          ? obj.ProductPrice * obj.quantity
          : obj?.price * obj.quantity;
        totalSum += objSum;
      });
      formData.append(`product[${ind}][id]`, e.ProductId),
        formData.append(`product[${ind}][quantity]`, e.quantity);
    });
    let totalSum = 0;
    reduxState?.data?.forEach(obj => {
      let objSum = obj.ProductPrice
        ? obj.ProductPrice * obj.quantity
        : obj?.price * obj.quantity;
      totalSum += objSum;
    });
    let getCurrentDate = moment(new Date()).format('YYYY-MM-D');
    let strDate = String(getCurrentDate);
    formData.append(`subtotal`, totalSum);
    formData.append(`confirm`, 'yes');
    formData.append(`address_id`, selectedAddress?.id);
    formData.append(`address2`, 'Travelodge Liverpool Central The Strand');
    formData.append(`delivery_date`, strDate);
    // 01/06/2023
    // formData.append(`nonce_token`, producttoken);
    formData.append(`giftCardText`, values?.text || '');
    formData.append(`giftCardLink`, values?.link || '');
    formData.append(`delivery_time`, selectedTime);
    try {
      const response = await ApiSauce.postWithToken(
        NEW_ORDER,
        formData,
        userToken,
      );
      updateThanksModal(true);
      dispatch(removeAllProduct());
      setWebUrl(response.data);
    } catch (error) {
      handleError(error?.data?.data, { autoHide: true });
      console.log(
        '🚀 ~ file: Checkout.js:119 ~ consthandle_order= ~ error',
        error,
        formData,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAddressApi();
  }, [isFocused]);
  const GetAddressApi = async () => {
    try {
      const GetAddressData = await ApiSauce.getWithToken(
        GET_ALL_ADDRESS,
        usersToken,
      );
      setAllItems(GetAddressData?.data);
      handleApiData(GetAddressData?.data);
    } catch (err) {
      console.log('err-in_get_address_api', err);
    }
  };

  const handleApiData = abc => {
    const fil = [];
    abc?.map(abc => {
      fil.push(abc.label);
    });
    setItems(fil);
  };

  const handleSelectedValue = e => {
    setValueOne(e);
    const ghg = allItems?.filter(val => {
      return val.label == e;
    });
    setSelectedAddress(ghg?.[0]);
    setBilling_name_first(ghg?.[0]?.name)
  };
  const changeValue = val => {
  };
  const renderIcon = () => {
    return (
      <Icon
        name="downcircle"
        type="antdesign"
        size={20}
        color={themes.light.colors.primary}
      />
    );
  };
  const telrModalClose = () => {
    setTelrModalVisible(false);
    Toast.show('Transaction aborted by user', Toast.LONG)
  };
  const didFailWithError = message => {
    setTelrModalVisible(false);
    Toast.show(message, Toast.LONG)
  };
  const didPaymentSuccess = async response => {
    setTelrModalVisible(false);
    Toast.show(response.message, Toast.LONG)
    const token = await getValueIntoLocalStorage(TOKEN);
    handleData(token)
  };

  const showTelrPaymentPage = () => {
    if (selectedAddress == null) {
      setLoading(false);
      Toast.show(items?.length > 0 ? t('Please_select_the_address') : t('Please_add_new_address'), Toast.LONG);
      return;
    }
    else if (billing_name_first == null || billing_name_first == '') {
      Toast.show('Enter first name', Toast.LONG)
      return;
    } else if (billing_name_last == null || billing_name_last == '') {
      Toast.show('Enter last name', Toast.LONG)
      return;
    } else if (tran_amount == null || tran_amount == '') {
      Toast.show('Enter amount', Toast.LONG)
      return;
    }
    var paymentRequest = {
      sdk_env: 'prod', //prod//dev
      something_went_wrong_message: 'Something went wrong', //this message for suppose someitng is happen wrong with payment then you can config this one.
      store_id: '28061', //"15996", //"28092",//"15996",//"27115", //"15996", //StoreID 15996
      key: 'XGP8-V9fJm^zhdx7', //"pQ6nP-7rHt@5WRFv",//"DgzZG~7RTR-cxfTB",//"pQ6nP-7rHt@5WRFv", //"kGXc~7fncK#PshkM",//"pQ6nP-7rHt@5WRFv", //pQ6nP-7rHt@5WRFv
      device_type: 'Android', //Android
      device_id: 'FB4C4D58-FFD5-4DED-A54B-6104DA244C342',
      app_name: 'TelrSDKsdf', //enter app name
      app_version: '1.0', //app version
      app_user: '12345633', //app user
      app_id: '102863o777', //app user id
      tran_test: '1', //1=test, 0=production
      tran_type: 'sale', //sale
      tran_class: 'paypage',
      tran_cartid: `${Math.floor(Math.random() * 100) + 6}`, //enter cart id it shoud be unique for every transaction //1234567890
      tran_description: 'Test Mobile API', // enter tran description
      tran_currency: 'SAR',
      tran_amount: tran_amount.toString(),
      tran_language: 'en',
      tran_firstref: '',
      billing_name_title: 'Mr',
      billing_name_first: billing_name_first,
      billing_name_last: billing_name_last,
      billing_address_line1: selectedAddress?.label,
      billing_address_city: 'Riyads',
      billing_address_region: 'Saudi Arabias',
      billing_address_country: 'SA',
      billing_custref: '43210s',
      billing_email: email,
      billing_phone: selectedAddress?.phone,
    };
    setPaymentRequest(paymentRequest);
    setTelrModalVisible(true);
  };
  return (
    <Container
      loading={isLoading}
      bottomSpace
      edges={['left', 'right']}
      scrollView={true}
      headerProps={headerProps}>
      <View style={[Styles.container, { marginBottom: 30 }]}>
        <CText style={Styles.title}>{t('Checkout')}</CText>
        {/* <CListItem
                    activeOpacity={1}
                    type={'horizontal'}
                    image={require('../../../assets/images/flowers/one.png')}
                    // orderNumber={'Item # 01010'}
                    title={'Flower type'}
                    price={'$299'}
                    qun={2}
                    // listItemView={{margin: 0}}
                    imageStyle={{minHeight: 80, minWidth: 85}}
                    priceStyle={Styles.orderPriceStyle}
                />
                  <CListItem
                    activeOpacity={1}
                    type={'horizontal'}
                    image={require('../../../assets/images/flowers/one.png')}
                    // orderNumber={'Item # 01010'}
                    title={'Flower type'}
                    price={'$299'}
                    qun={2}
                    // listItemView={{margin: 0}}
                    imageStyle={{minHeight: 80, minWidth: 85}}
                    priceStyle={Styles.orderPriceStyle}
                /> */}

        <View style={Styles.orderList}>
          <MappedElement data={reduxState?.data} renderElement={renderItem} />
        </View>
        <View>
          {items?.length > 0 && <SelectDropdown
            data={items}
            onSelect={(selectedItem, index) => {
              handleSelectedValue(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={{
              borderWidth: 1,
              marginTop: 10,
              paddingHorizontal: 15,
              width: '100%',
              borderColor: 'rgba(124, 128, 97, 0.30)',
              borderRadius: 10,
              backgroundColor: '#FFF',
              paddingHorizontal: 15,
            }}
            dropdownStyle={{
              marginTop: -25,
              paddingHorizontal: 15,
              borderColor: 'rgba(124, 128, 97, 0.30)',
              borderRadius: 10,
              backgroundColor: '#FFF',
            }}
            buttonTextStyle={{
              textTransform: 'capitalize',
              color: themes['light'].colors.fontColor,
              fontFamily: myLan === 'en' ? themes.font.regular : themes.font2.regular,
              flex: 1,
              fontSize: 16,
              textAlign: 'left',
              marginLeft: 0,
            }}
            rowTextStyle={{
              textTransform: 'capitalize',
              color: themes['light'].colors.fontColor,
              fontFamily:
                myLan === 'en' ? themes.font.regular : themes.font2.regular,
              flex: 1,
              fontSize: 16,
              textAlign: 'left',
              marginLeft: 0,

            }}

            defaultButtonText={t('Select_Address')}
            renderDropdownIcon={() => renderIcon()}
            dropdownIconPosition="right"
          />

          }
          {/* <DropDownPicker 
          onSelectItem={(va)=>{
            setValueOne(va)
          }}
          placeholder={t('Select_Address')}
          open={open}
          setOpen={setOpen}
          value={value}
          items={items}
          setValue={setValue}
          style={[
            Styles.addLocationButton,
            {
              borderWidth: 1,
              marginTop: 10,
              paddingHorizontal: 15,
              borderColor: 'rgba(124, 128, 97, 0.30)',
            },
          ]}
          textStyle={[Styles.addLocationTitle, {textTransform:'capitalize',fontFamily:myLan === 'en' ? themes.font.regular : themes.font2.regular}]}
          dropDownContainerStyle={{
            borderColor: 'rgba(124, 128, 97, 0.30)',
            paddingHorizontal: 5,
          }}
        />   */}
        </View>

        <View>
          <SelectDropdown
            data={[t('Morning'), t('Evening')]}
            onSelect={(selectedItem, index) => {
              setSelectedTime(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={{
              borderWidth: 1,
              marginTop: 10,
              paddingHorizontal: 15,
              width: '100%',
              borderColor: 'rgba(124, 128, 97, 0.30)',
              borderRadius: 10,
              backgroundColor: '#FFF',
              paddingHorizontal: 15,
            }}
            dropdownStyle={{
              marginTop: -25,
              paddingHorizontal: 15,
              borderColor: 'rgba(124, 128, 97, 0.30)',
              borderRadius: 10,
              backgroundColor: '#FFF',
            }}
            buttonTextStyle={{
              textTransform: 'capitalize',
              color: themes['light'].colors.fontColor,
              fontFamily:
                myLan === 'en' ? themes.font.regular : themes.font2.regular,
              flex: 1,
              fontSize: 16,
              textAlign: 'left',
              marginLeft: 0,
            }}
            rowTextStyle={{
              textTransform: 'capitalize',
              color: themes['light'].colors.fontColor,
              fontFamily:
                myLan === 'en' ? themes.font.regular : themes.font2.regular,
              flex: 1,
              fontSize: 16,
              textAlign: 'left',
              marginLeft: 0,
            }}
            defaultButtonText={t('Select_time')}
            renderDropdownIcon={() => renderIcon()}
            dropdownIconPosition="right"
          />
        </View>

        <View style={Styles.addLocationContainer}>
          <CText style={Styles.addLocationTitle}>{t('Add_new_address')}</CText>
          <CButton
            buttonStyle={[Styles.addLocationButton, { width: 180 }]}
            buttonText={Styles.addLocationButtonText}
            iconStyle={Styles.addLocationButtonIcon}
            iconType={'left'}
            iconName={'plusmark'}
            onPress={() => locationAdd()}
            title={t('Add_new_address')}
          />
        </View>

        <View style={Styles.addLocationContainer}>
          <CText style={Styles.addLocationTitle}>{t('Add_gift_card')}</CText>
          <CButton
            buttonStyle={[Styles.addLocationButton, { width: 180 }]}
            buttonText={Styles.addLocationButtonText}
            iconStyle={Styles.addLocationButtonIcon}
            iconType={'left'}
            iconName={'plusmark'}
            onPress={() => navigation.navigate('add_gift_card')}
            title={t('Add_gift_card')}
          />
        </View>

        <CText style={Styles.title}>{t('Choose_payment_method')}</CText>

        {/* <View style={Styles.sectionList}>
                    <Collapse style={Styles.sectionListItem}
                              isExpanded={selectedMethod === 'VISA'}
                              onToggle={() => onSelectMethod('VISA')}>
                        <CollapseHeader>
                            <View style={Styles.sectionListItemHeader}>
                                {renderCheck('VISA')}
                                <CText style={Styles.sectionListItemHeaderTitle}>Visa card</CText>
                                <ProgressiveImage source={require('../../../assets/images/visa.png')}
                                                  style={Styles.sectionListItemHeaderRightImage}/>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={Styles.sectionListItemBody}>
                            <CForm form={form} submit={()=>{}} cardNumber={cardNumber} nameOnCard={nameOnCard} expiry={expiry} cvv={cvv}/>
                            </View>
                        </CollapseBody>
                    </Collapse>
                    <Collapse style={Styles.sectionListItem}
                              isExpanded={selectedMethod === 'MASTER'}
                              onToggle={() => onSelectMethod('MASTER')}>
                        <CollapseHeader>
                            <View style={Styles.sectionListItemHeader}>
                                {renderCheck('MASTER')}
                                <CText style={Styles.sectionListItemHeaderTitle}>Master card</CText>
                                <ProgressiveImage source={require('../../../assets/images/masterCard.png')}
                                                  // resizeMode={'contain'}
                                                  style={[Styles.sectionListItemHeaderRightImage, Styles.master]}/>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={Styles.sectionListItemBody}>
                            <CForm form={form} submit={()=>{}} cardNumber={cardNumber} nameOnCard={nameOnCard} expiry={expiry} cvv={cvv}/>

                            </View>
                        </CollapseBody>
                    </Collapse>
                    <Collapse style={Styles.sectionListItem}
                              isExpanded={selectedMethod === 'PAYPAL'}
                              onToggle={() => onSelectMethod('PAYPAL')}>
                        <CollapseHeader>
                            <View style={Styles.sectionListItemHeader}>
                                {renderCheck('PAYPAL')}
                                <CText style={Styles.sectionListItemHeaderTitle}>Paypal</CText>
                                <ProgressiveImage source={require('../../../assets/images/paypal.png')}
                                                  // resizeMode={'contain'}
                                                  style={[Styles.sectionListItemHeaderRightImage, Styles.paypal]}/>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={Styles.sectionListItemBody}>
                            <CForm form={form} submit={()=>{}} cardNumber={cardNumber} nameOnCard={nameOnCard} expiry={expiry} cvv={cvv}/>

                            </View>
                        </CollapseBody>
                    </Collapse>

                </View> */}

        <CButton
          buttonStyle={Styles.buttonSpace}
          iconName={'arrow-forward'}
          title={t('Proceed_to_checkout')}
          onPress={showTelrPaymentPage}
        />
      </View>
      <TelrSdk
        backButtonText={'Back'}
        buttonBackStyle={Styles.buttonBackStyle}
        buttonBackColor={Styles.buttonBackColor}
        backButtonTextStyle={Styles.backButtonTextStyle}
        paymentRequest={paymentRequest}
        telrModalVisible={telrModalVisible}
        telrModalClose={telrModalClose}
        didFailWithError={didFailWithError}
        didPaymentSuccess={didPaymentSuccess}
      />

      <ThanksForOrdering
        isOpen={thanksModal}
        onClose={() => (
          updateThanksModal(!thanksModal), navigation.navigate('Home')
        )}
        trackOrder={() => {
          navigation.navigate('OrderTraking', {
            screen: 'Ordertraking',
            params: { abc: webUrl },
          });
        }}
      />
    </Container>
  );
}
export default Checkout;
