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
import { MappedElement } from '../../../utils/methods';
import { useSelector } from 'react-redux';

const methodsConst = ['VISA', 'PAYPAL', 'MASTER'];

function Checkout(props) {

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

    return(
        <Container bottomSpace edges={['left', 'right']} scrollView={true} headerProps={headerProps}>
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
                                <CForm />
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
                                <CForm />
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
                                <CForm />
                            </View>
                        </CollapseBody>
                    </Collapse>

                </View>

                <CButton
                    buttonStyle={Styles.buttonSpace}
                    iconName={'arrow-forward'}
                    title="Proceed To Checkout"
                    onPress={() => updateThanksModal(!thanksModal)}
                />

            </View>


            <ThanksForOrdering
                isOpen={thanksModal}
                onClose={() => updateThanksModal(!thanksModal)}
            />

        </Container>

    )
}
export default Checkout;
