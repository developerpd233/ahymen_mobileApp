import React, {useRef, useState} from 'react';
import {Container} from "../../../containers";
import {CListItem, CText, CButton, ProgressiveImage} from "../../../uiComponents";
import {View} from "react-native";
import Styles from "./Checkout.style";
import Icons from "../../../assets/icons/CustomIcon";
import CForm from "./Form";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import ThanksForOrdering from "./../cart/thanksForOrdering/ThanksForOrdering";
import {useNavigation} from "@react-navigation/native";
import { handleError, MappedElement } from '../../../utils/methods';
import { useDispatch, useSelector } from 'react-redux';
import { orderCheckout } from '../../../store/actions/Root.action';
import ApiSauce from '../../../utils/network'
import { GET_TOKEN, NEW_ORDER } from '../../../config/webservices';
import { removeAllProduct } from '../../../store/actions/Cart.action';
import { getTokenAndSetIntoHeaders, getValueIntoLocalStorage } from '../../../utils/asyncStorage/Functions';
import { TOKEN } from '../../../utils/asyncStorage/Constants';
import '../../../utils/i18n/lan';
import { useTranslation } from 'react-i18next';

// import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import {
    requestOneTimePayment,
    requestBillingAgreement,
    requestDeviceData
  } from 'react-native-paypal';



const methodsConst = ['VISA', 'PAYPAL', 'MASTER'];

function Checkout({route}) {
     const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');
    const {values } = route?.params ||''
    console.log("🚀 ~ file: Checkout.js:34 ~ Checkout ~ values", values)
    const dispatch = useDispatch()
    const form = useRef(null);
    const cardNumber = useRef(null);
    console.log("🚀 ~ file: Checkout.js ~ line 21 ~ Checkout ~ cardNumber", cardNumber.current)
    const nameOnCard = useRef(null);
    const expiry = useRef(null);
    const cvv = useRef(null);

    const navigation = useNavigation();
    const reduxState = useSelector(({ auth  , root , cart}) => {
        
        return {
            loading: false,
            data: cart,
            user:auth.user
        };
    });
    const [selectedMethod, updateMethod] = useState('VISA');
    const [thanksModal, updateThanksModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [webUrl, setWebUrl] = useState();
    console.log("🚀 ~ file: Checkout.js:56 ~ Checkout ~ webUrl", webUrl)


    const headerProps = {
        showCenterLogo: true,
        showCart: true,
        backButtonIcon: 'close',
    };
    

    const renderCheck = (val) => {
        let url = require('../../../assets/images/uncheck.png');
        if(val === selectedMethod){
            url = require('../../../assets/images/check.png')
        }
        return <ProgressiveImage source={url}
                                 style={Styles.sectionListItemHeaderCheckImage}/>
    };


   const onSelectMethod = (val) => {
       updateMethod(selectedMethod !== val ? val : '')
    };


   const locationAdd = () => {
       navigation.navigate('location', {
           isGoBack: true
       })
   }
 const  renderItem = ({item})=>{
    return(
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
    />
    )
   }

   const callback =()=>{
    alert('done')
   }
   
   const handle_order = async (values) => {
    setLoading(true)
     const token = await getValueIntoLocalStorage(TOKEN)
    const tokenRes = await ApiSauce.getWithToken(GET_TOKEN, token)
    console.log('tokenRes', tokenRes)

    try {
        BraintreeDropIn.show({
            clientToken: tokenRes?.data[0],
            
          
            countryCode: 'US',    //apple pay setting
            currencyCode: 'USD',   //apple pay setting
            orderTotal:'Total Price',
            googlePay: false,
            applePay: false,
            vaultManager: false,
            payPal: true, 
            cardDisabled: false,
            darkTheme: true,
          })
          .then(result => handleData(result.nonce , token))
          .catch((error) => {
            setLoading(false)
            console.log("🚀 ~ file: Checkout.js:169 ~ consthandle_order= ~ error", error)
            if (error.code === 'USER_CANCELLATION') {

              // update your UI to handle cancellation
            } else {

              // update your UI to handle other errors
              // for 3D secure, there are two other specific error codes: 3DSECURE_NOT_ABLE_TO_SHIFT_LIABILITY and 3DSECURE_LIABILITY_NOT_SHIFTED
            }
          });
    } catch (error) {
        console.log("🚀 ~ file: Checkout.js:182 ~ consthandle_order= ~ error", error)
        
    }
    
        
    }
    const handleData = async (producttoken , userToken) => {
      console.log("🚀 ~ file: Checkout.js:142 ~ handleData ~ producttoken", producttoken)
      
        const formData = new FormData()
        await  reduxState?.data.map((e, ind)=>{
        let totalSum = 0;
        reduxState?.data?.forEach(obj => {
          let objSum = obj.ProductPrice ? obj.ProductPrice * obj.quantity : obj?.price * obj.quantity
          totalSum += objSum;
        })
             formData.append(`product[${ind}][id]` , e.ProductId) ,
              formData.append(`product[${ind}][quantity]` , e.quantity)
         })
         let totalSum = 0;
        reduxState?.data?.forEach(obj => {
          let objSum = obj.ProductPrice ? obj.ProductPrice * obj.quantity : obj?.price * obj.quantity
          totalSum += objSum;
        })
        formData.append(`subtotal` , totalSum)
        formData.append(`confirm` , 'yes')
        formData.append(`address1` , 'Travelodge Liverpool Central The Strand')
        formData.append(`address2` , 'Travelodge Liverpool Central The Strand')
        formData.append(`delivery_date` , '2022-10-29')
        formData.append(`nonce_token` , producttoken)
        formData.append(`giftCardText` , values?.text || '')
        formData.append(`giftCardLink` , values?.link || '')

       
        try {


          const response = await ApiSauce.postWithToken(NEW_ORDER , formData , userToken )
            console.log("🚀 ~ file: Checkout.js:175 ~ handleData ~ response", response)
            updateThanksModal(true)
            dispatch(removeAllProduct())
            setWebUrl(response.data)
        } catch (error) {
             handleError(error?.data?.data, { autoHide: true });    
            console.log("🚀 ~ file: Checkout.js:119 ~ consthandle_order= ~ error", error , formData)
            
        }
        finally{
            setLoading(false)
        }
    }
    

   

    return(
        <Container loading={isLoading} bottomSpace edges={['left', 'right']} scrollView={true} headerProps={headerProps}>
            <View style={[Styles.container, {marginBottom: 30}]}>
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
                    <MappedElement
                        data={reduxState?.data}
                        renderElement={renderItem}
                    />
                </View>

                <View style={Styles.addLocationContainer}>
                    <CText style={Styles.addLocationTitle}>{t('Delivery_address')}</CText>
                    <CButton
                        buttonStyle={Styles.addLocationButton}
                        buttonText={Styles.addLocationButtonText}
                        iconStyle={Styles.addLocationButtonIcon}
                        iconType={'left'}
                        iconName={'plusmark'}
                        onPress={() =>  locationAdd()}
                        title={t('Add_location')}
                    />
                </View>
                <View style={Styles.addLocationContainer}>
                    <CText style={Styles.addLocationTitle}>{t('Add_gift_card')}</CText>
                    <CButton
                        buttonStyle={Styles.addLocationButton}
                        buttonText={Styles.addLocationButtonText}
                        iconStyle={Styles.addLocationButtonIcon}
                        iconType={'left'}
                        iconName={'plusmark'}
                        onPress={() =>  navigation.navigate("add_gift_card")}
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
                    onPress={handle_order}
                />

            </View>


            <ThanksForOrdering
                isOpen={thanksModal}
                onClose={() => (updateThanksModal(!thanksModal), 
            navigation.navigate('Home')
            )}
            trackOrder={()=>{navigation.navigate('OrderTraking' ,{
                screen: 'Ordertraking',
                params: { abc: webUrl },
              } )}}
            />

        </Container>

    )
}
export default Checkout;
