import React, { useRef, useState , useEffect} from "react";
import { View  , TouchableOpacity , Text} from "react-native";
import { Container } from "../../../containers";
import { CText, CButton, CListItem, CEmpty } from "../../../uiComponents";
import Styles from "./Cart.style";
import { useNavigation } from "@react-navigation/native";
import { MappedElement } from "../../../utils/methods";
import { useSelector  , useDispatch} from "react-redux";
import Icons from "../../../assets/icons/CustomIcon";
import { addProduct, removeProduct, removeSpecificProduct } from "../../../store/actions/Cart.action";
import '../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';

function Cart(props) {
    const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');


    // useEffect(() => {
    // changeLanguage('ar')
    // }, [])
    // const changeLanguage = value => {
    //   i18n
    //     .changeLanguage(value)
    //     .then(() => setLanguage(value))
    //     .catch(err => console.log(err));
    // };
    console.log(props?.route?.params);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [isModal, updateIsModal] = useState(false);

    const reduxState = useSelector(({ auth  , root , cart}) => {
        
        return {
            loading: false,
            data: cart,
            user:auth.user
        };
    });

        let totalSum = 0;
    reduxState?.data?.forEach(obj => {
        let objSum = obj.ProductPrice ? obj.ProductPrice * obj.quantity : obj?.price * obj.quantity
        totalSum += objSum;
    })

    const headerProps = {
        showCenterLogo: true,
        showCart: true,
        backButtonIcon: "close",
        backOnPress: () => {
            if (props?.route?.params?.isGoBack) {
                navigation.goBack();
            } else {
                navigation.navigate("Store", {
                    screen: "store",
                    initial: false,
                });
            }
        },
    };
    const increment = async (val) => {
        dispatch(addProduct(val))
      }
    
      const decrement = async (val) => {
        dispatch(removeProduct(val))

      }
      const removeSpecPro = async (val) => {
        dispatch(removeSpecificProduct(val))


      }

    const renderItem = (item, index) => {
        return (
            <View style={Styles.orderListItem}>
                <CListItem
                    activeOpacity={1}
                    type={"horizontal"}
                    orderNumber={"Item # 01010"}
                    image={{uri: item?.ProductImage?.[0]}}
                    title={item?.ProductName}
                    imageStyle={Styles.orderImageStyle}
                    listItemView={Styles.orderItemView}
                    rightIconName={"arrow-forward"}
                />
                <View style={Styles.orderItemBottomView}>
                    <View style={Styles.orderItemBottomQuantity}>
                        <CText style={Styles.orderItemBottomQuantityText}>
                        {t('Quantity')}
                        </CText>
                        
                        <TouchableOpacity style={Styles.minusView} onPress={() => decrement(item)}>
              <Text style={Styles.minusText}>-</Text>
            </TouchableOpacity>

            <CText style={Styles.orderItemBottomQuantityValue}>
                            {item.quantity}
                        </CText>

            <TouchableOpacity style={Styles.minusView} onPress={() => increment(item)}>
              <Text style={Styles.plusText}>+</Text>
            </TouchableOpacity>

                        <Icons
                            style={Styles.orderItemBottomQuantityIcon}
                            name="arrow-forward"
                        />
                    </View>
                    <CText style={Styles.orderItemBottomQuantityPrice}>
                        {item.ProductPrice}
                    </CText>
                </View>
                <View style={Styles.orderListItemButtons}>
                    <CButton
                        buttonStyle={Styles.orderListItemButton}
                        buttonText={Styles.orderListItemButtonText}
                        onPress={() => navigation.navigate("store")}
                        title={t('View_details')}
                    />
                    {/* <CButton
                        buttonStyle={Styles.orderListItemButton}
                        buttonText={Styles.orderListItemButtonText}
                        onPress={() => navigation.navigate("add_gift_card")}
                        title="Add gift card"
                    /> */}
                    <CButton
                        buttonStyle={Styles.orderListItemButton}
                        buttonText={Styles.orderListItemButtonText}
                        onPress={() => removeSpecPro(item)}
                        title={t("Remove")}
                    />
                </View>
            </View>
        );
    };

    return (
        <Container
            bottomSpace
            edges={["left", "right"]}
            scrollView={true}
            headerProps={headerProps}
        >
            <View style={Styles.container}>
             {  reduxState?.data.length > 0 &&    <View>
                    <CButton
                        iconName={"arrow-forward"}
                        title={t('Proceed_to_checkout')}
                        onPress={() =>
                            {
                                console.log('line 141 ----------',reduxState?.user?.data?.token);
                                !reduxState?.user?.data?.token  ?  navigation.navigate("proceed", {
                                    isGoBack: true,
                                }):
                                navigation.navigate("checkout", {
                                    isGoBack: true,
                                })
                            }
                           
                        }
                    />
                  
                </View> }

                <View style={Styles.orderList}>
                    <MappedElement
                        data={reduxState?.data}
                        renderElement={renderItem}
                    />
                </View>

             {reduxState?.data.length > 0 ?     <View style={Styles.paymentInfo}>
                    <View style={Styles.paymentInfoItem}>
                        <CText style={Styles.paymentInfoItemTitle}>
                            {t('Subtotal')}
                        </CText>
                        <CText style={Styles.paymentInfoItemValue}>
                            ${totalSum}
                        </CText>
                    </View>
                    <View style={Styles.paymentInfoItem}>
                        <CText style={Styles.paymentInfoItemTitle}>
                            {t('Shipping')}
                        </CText>
                        <CText style={Styles.paymentInfoItemValue}>$0</CText>
                    </View>
                    <View style={Styles.paymentInfoItem}>
                        <CText style={Styles.paymentInfoItemTitle}>{t('Total')}</CText>
                        <CText style={Styles.paymentInfoItemValue}>
                            ${totalSum}
                        </CText>
                    </View>
                </View>   : 
                <CEmpty  text={t('No_any_product_in_cart')}/>
            }

                <View>
                   {reduxState?.data.length> 0  &&  <CButton
                        iconName={"arrow-forward"}
                        title={t('Proceed_to_checkout')}
                        onPress={() =>
                            {
                                console.log('line 141 ----------',reduxState?.user?.data?.token);
                                !reduxState?.user?.data?.token  ?  navigation.navigate("proceed", {
                                    isGoBack: true,
                                }):
                                navigation.navigate("checkout", {
                                    isGoBack: true,
                                })
                            }
                           
                        }
                    />}
                      <CButton
                        buttonStyle={Styles.linkButton}
                        buttonText={Styles.linkButtonText}
                        onPress={() => navigation.navigate("Store")}
                        title={t('Continue_shopping')}
                    />
                    <CButton
                        buttonStyle={Styles.linkButton}
                        buttonText={Styles.linkButtonText}
                        title={t('Legal_&_Privacy')}
                    />
                </View>
            </View>
        </Container>
    );
}
export default Cart;
