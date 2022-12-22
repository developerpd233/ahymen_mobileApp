import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Container } from "../../../containers";
import { CText, CButton, CListItem, CEmpty, CheckBox } from "../../../uiComponents";
import Styles from "./Cart.style";
import { useNavigation } from "@react-navigation/native";
import { MappedElement } from "../../../utils/methods";
import { useSelector, useDispatch } from "react-redux";
import Icons from "../../../assets/icons/CustomIcon";
import { addProduct, removeProduct, removeSpecificProduct } from "../../../store/actions/Cart.action";
import {addProducts} from "../../../store/actions/AddProduct.action"
import '../../../utils/i18n/lan';
import { useTranslation } from 'react-i18next';
import { FlatList } from "react-native-gesture-handler";
import ApiSauce from "../../../utils/network"
import { FEATURE_CAT_AND_PRODUCT } from "../../../config/webservices";
import CCard from "../../../uiComponents/cCard/CCard";

function Cart(props) {
    const { t, i18n } = useTranslation();

    const [currentLanguage, setLanguage] = useState('ar');
    const [state, setstate] = useState(0)
    const [productData, setProductData] = useState([]);
    const [addCard, setAddCard] = useState([]);



    
    console.log('data-card-show', addCard)
    console.log(props?.route?.params);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [isModal, updateIsModal] = useState(false);

    const reduxState = useSelector(({ auth, root, cart, language, products }) => {

        return {
            loading: false,
            data: cart,
            user: auth.user,
            language: language?.language.lan,
            products:products
        };
    });
    const abc = useSelector((state)=>console.log("hhhhhhhhhhhhhhhhhhhhh" , state))
 const Mydata = reduxState 
 console.log('my-dat4555555555555555555555555555555a-46', Mydata)
    const langCheck = reduxState.language
    console.log('my--langauage', langCheck)
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
                    image={{ uri: item?.ProductImage?.[0] }}
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

    
    useEffect(() => {
        handleApi()
    }, [])

    const handleApi = async () => {
        try {
            const data = await ApiSauce.getWithoutToken(FEATURE_CAT_AND_PRODUCT)
            setProductData(data.data)
            console.log('data---', data)
        } catch (e) {
            console.log('e---', e)
        }
    }
    const renderItems = ({ item, index }) => {
        return (
            <TouchableOpacity style={[Styles.CTabview, { borderBottomWidth: state == index ? 1 : 0, borderColor: state == index ? "#2e6472" : 'none', }]} onPress={() => setstate(index)}>
                <Text style={Styles.tabViewText}>{item.CategoryName}</Text>
            </TouchableOpacity>
        )
    }
    const cartItemRender = ({ item }) => {
        console.log('vddal-', item)

        return (
            <View style={{ flex: 1, alignItems: 'center', marginVertical: 10 }}>
                <CCard img={{ uri: item?.ProductImage }} productName={item?.ProductName} priceText={item?.priceText} price={item?.price} btnText={item?.btnText} onPress={() => dispatch(addProducts({products:item}))}/>
            </View>
        )
    }
    const addCardShowFunc = ({item }) => {
        console.log('i344444444444444444444444444444444444444ii-', item)
        return (
            <View style={{ flex: 1, alignItems: 'center', marginVertical: 10 }}>
              
                <CCard img={{ uri:item?.ProductImage }} productName={item?.ProductName} priceText={item?.priceText} price={item?.price} btnText={item?.btnText} />
            </View>
        )
    }
    const cardRender = () => {
        return (
            productData?.[state]?.Products?.length > 0 ?
                <View style={{ height: 300 }}>
                    <FlatList
                        numColumns={2}
                        renderItem={cartItemRender}
                        data={productData?.[state]?.Products}
                    />
                </View>
                :
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#7C8061' }}>No Product Available !</Text>
                </View>

        )
    }

    return (
        <Container
            bottomSpace
            edges={["left", "right"]}
            scrollView={true}
            headerProps={headerProps}
        >
            <View style={Styles.container}>
                {reduxState?.data.length > 0 && <View>
                    <CButton
                        iconName={"arrow-forward"}
                        title={t('Proceed_to_checkout')}
                        onPress={() => {
                            console.log('line 141 ----------', reduxState?.user?.data?.token);
                            !reduxState?.user?.data?.token ? navigation.navigate("proceed", {
                                isGoBack: true,
                            }) :
                                navigation.navigate("checkout", {
                                    isGoBack: true,
                                })
                        }

                        }
                    />

                </View>}

                <View style={Styles.orderList}>
                    <MappedElement
                        data={reduxState?.data}
                        renderElement={renderItem}
                    />
                </View>
                {/* Show product from category */}
                {/* <CText>Card message</CText>

                <View style={{ backgroundColor: '#f8f8f8', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>There's no card message included with your order</Text>
                    <Text>Add</Text>
                </View>
                <View style={{ height: 400 }}>
                    <FlatList
                        numColumns={2}
                        renderItem={addCardShowFunc}
                        data={[addCard]}
                    />
                </View> */}
                {/* <CheckBox
                            value={isSelected}
                            onChange={setSelection}
                            title={t('I_dont_the_adress')}
                            containerStyles={{ flexDirection: langCheck == "ar" ? "row" : 'row-reverse', backgroundColor: '#f8f8f8', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 8 }}
                            myStyle2={{ marginRight: 10 }}
                            stylesTitle={{ fontSize: 15, color: "#666869", textAlign: langCheck == "ar" ? 'right' : 'left', flex: 1 }} />
                 */}
                {/* Add Categories */}
                {/* <View >
                    <View style={Styles.CatRow}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={productData}
                            renderItem={renderItems}
                        />
                    </View>
                    {cardRender()}
                </View> */}





                {reduxState?.data.length > 0 ? <View style={[Styles.paymentInfo,]}>
                    <View style={[Styles.paymentInfoItem, { flexDirection: langCheck == 'ar' ? "row-reverse" : 'row' }]}>
                        <CText style={Styles.paymentInfoItemTitle}>
                            {t('Subtotal')}
                        </CText>
                        <CText style={Styles.paymentInfoItemValue}>
                            {t('SAR')} {totalSum}
                        </CText>
                    </View>
                    <View style={[Styles.paymentInfoItem, { flexDirection: langCheck == 'ar' ? "row-reverse" : 'row' }]}>
                        <CText style={Styles.paymentInfoItemTitle}>
                            {t('Shipping')}
                        </CText>
                        <CText style={Styles.paymentInfoItemValue}>{t('SAR')} 0</CText>
                    </View>
                    <View style={[Styles.paymentInfoItem, { flexDirection: langCheck == 'ar' ? "row-reverse" : 'row' }]}>
                        <CText style={Styles.paymentInfoItemTitle}>{t('Total')}</CText>
                        <CText style={Styles.paymentInfoItemValue}>
                            {t('SAR')} {totalSum}
                        </CText>
                    </View>
                </View> :
                    <CEmpty text={t('No_any_product_in_cart')} />
                }

                <View>
                    {reduxState?.data.length > 0 && <CButton
                        iconName={"arrow-forward"}
                        title={t('Proceed_to_checkout')}
                        onPress={() => {
                            console.log('line 141 ----------', reduxState?.user?.data?.token);
                            !reduxState?.user?.data?.token ? navigation.navigate("proceed", {
                                isGoBack: true,
                            }) :
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
                 
                </View>
            </View>
        </Container>
    );
}
export default Cart;
