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
import { NEW_ORDER } from '../../../config/webservices';
import { removeAllProduct } from '../../../store/actions/Cart.action';
import { getTokenAndSetIntoHeaders, getValueIntoLocalStorage } from '../../../utils/asyncStorage/Functions';
import { TOKEN } from '../../../utils/asyncStorage/Constants';

const methodsConst = ['VISA', 'PAYPAL', 'MASTER'];

function Checkout(props) {
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
    console.log('form.current.values', form.current.values)
    if(form.current.values === '{}') {
         handleError('fill all card  details', { autoHide: true });

    } else {
        const token = await getValueIntoLocalStorage(TOKEN)

    setLoading(true)
    const formData = new FormData()
    console.log("🚀 ~ file: Checkout.js ~ line 88 ~ consthandle_order= ~ formData",form.current.values.expiry.split('/')[0] )
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
        formData.append(`card` , `${form.current.values.cardNumber}`)
        formData.append(`exp_month` , `${form?.current?.values?.expiry.split('/')[0]}`)
        formData.append(`exp_year` , `${form?.current?.values?.expiry.split('/')[1]}`)
        formData.append(`cvc` , `${form.current.values.cvc}`)
        try {
            
          const response = await ApiSauce.postWithToken(NEW_ORDER , formData , token )
            updateThanksModal(true)
            dispatch(removeAllProduct())
            


        } catch (error) {
    handleError(error?.data?.data, { autoHide: true });
            
            console.log("🚀 ~ file: Checkout.js:119 ~ consthandle_order= ~ error", error , formData)
            
        }
        finally{
            setLoading(false)
        }
    
        // dispatch(orderCheckout(formData , callback))
    }
    
        
    }
    

   

    return(
        <Container loading={isLoading} bottomSpace edges={['left', 'right']} scrollView={true} headerProps={headerProps}>
            <View style={[Styles.container, {marginBottom: 30}]}>
                <CText style={Styles.title}>Check out</CText>
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
                    <CText style={Styles.addLocationTitle}>Delivery Address</CText>
                    <CButton
                        buttonStyle={Styles.addLocationButton}
                        buttonText={Styles.addLocationButtonText}
                        iconStyle={Styles.addLocationButtonIcon}
                        iconType={'left'}
                        iconName={'plusmark'}
                        onPress={() =>  locationAdd()}
                        title={'Add location'}
                    />
                </View>
                <CText style={Styles.title}>Choose Payment Method</CText>

                <View style={Styles.sectionList}>
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
                            <CForm form={form} submit={handle_order} cardNumber={cardNumber} nameOnCard={nameOnCard} expiry={expiry} cvv={cvv}/>
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
                            <CForm form={form} submit={handle_order} cardNumber={cardNumber} nameOnCard={nameOnCard} expiry={expiry} cvv={cvv}/>

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
                            <CForm form={form} submit={handle_order} cardNumber={cardNumber} nameOnCard={nameOnCard} expiry={expiry} cvv={cvv}/>

                            </View>
                        </CollapseBody>
                    </Collapse>

                </View>

                <CButton
                    buttonStyle={Styles.buttonSpace}
                    iconName={'arrow-forward'}
                    title="Proceed To Checkout"
                    onPress={handle_order}
                />

            </View>


            <ThanksForOrdering
                isOpen={thanksModal}
                onClose={() => (updateThanksModal(!thanksModal), 
            navigation.navigate('Home')
            )}
            />

        </Container>

    )
}
export default Checkout;
