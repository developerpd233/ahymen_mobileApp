import React, { useEffect ,useState, Fragment } from "react";
import { Container } from "../../../../containers";
import {
    ProgressiveImage,
    CText,
    CButton,
    CModal,
} from "../../../../uiComponents";
import { View, ScrollView, TouchableOpacity  , Text} from "react-native";
import Styles from "../Store.style";
import { useSelector , useDispatch } from "react-redux";
import { MappedElement } from "../../../../utils/methods";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icons from "../../../../assets/icons/CustomIcon";
import GlobalStyle from "../../../../assets/stylings/GlobalStyle";
import { navigate } from "../../../../routing/Ref";
import { useNavigation } from "@react-navigation/native";
import { AddCart, addProduct, removeProduct } from "../../../../store/actions/Cart.action";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GET_WISHLIST, Add_DELETE_WISHLIST } from "../../../../config/webservices";
import ApiSauce from "../../../../utils/network";
import Toast from 'react-native-simple-toast';
import '../../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';

function ProductDetail({ route }) {
    const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');




    
    const { item } = route?.params;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [wishlistData , setWishlistData] = useState([])
    const dispatch = useDispatch()

    console.log(
        "🚀 ~ file: ProductDetail.js ~ line 21 ~ ProductDetail ~ item",
        item
    );

    const navigation = useNavigation();
    const headerProps = {
        headerTitle: t('Flower'),
        showCart: true,
        // backOnPress:(navigation?.goBack())
    };

    const [slideIndex, updateSlideIndex] = useState(0);
    const [isFav, updateIsFav] = useState(false);
    const [quantity, setQunatity] = useState(1);

    const reduxState = useSelector(({ auth }) => {
        return {
            loading: false,
            user:auth.user,
            slides: item?.ProductImage,
            // slides: [
            //     {
            //         image: require("../../../../assets/images/flowers/one.png"),
            //         id: 1,
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/two.png"),
            //         id: 2,
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/three.png"),
            //         id: 3,
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/four.png"),
            //         id: 4,
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/five.png"),
            //         id: 5,
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/six.png"),
            //         id: 6,
            //     },
            // ],
        };
    });

    let myuser = reduxState?.user?.data?.token ? reduxState?.user : null ;

    useEffect(()=>{
        console.log(myuser);
        if (myuser != null) {
            getWishlist()
        }
    },[])

    const getWishlist = async () => {

        try {
            const res = await ApiSauce.getWithToken(GET_WISHLIST , myuser?.data?.token);
            //  setData(res)
            console.log('MyWishlist  ----- 94   ', item)

            if (res.success == true && res?.data?.wishlist?.length > 0) {

                setWishlistData(res?.data?.wishlist)
                
                const productExists = wishlistData.some(product => product.ProductId === item.ProductId);

                if(productExists) {
                    updateIsFav(true)
                }
            }

        } catch (error) {
            console.log('error MyWishlist  ----- 102   ', error)
            // alert(error.message);
        }

    };

    console.log('favProducts',reduxState?.favProducts);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = ()=> {
        setDatePickerVisibility(false)
        addToBasket()
        Toast.show('Product added successfully', Toast.LONG)
    }

    const onSelect = (item, i) => {
        updateSlideIndex(i);
    };

    const renderMainSliderSlide = (item, index) => {
        return slideIndex === index ? (
            <View style={Styles.singleSlide}>
                <ProgressiveImage
                    source={{ uri: item }}
                    resizeMode={"cover"}
                    style={Styles.singleSlideImage}
                />
            </View>
        ) : null;
    };

    const renderMainSlider = () => {
        return reduxState?.slides.map(renderMainSliderSlide);
    };

    const renderMiniSliderSlide = (item, index) => {
        return (
            <TouchableOpacity
                key={index}
                style={[
                    Styles.miniSliderSlide,
                    index === slideIndex && Styles.activeMiniSliderSlide,
                ]}
                onPress={() => onSelect(item, index)}
            >
                <ProgressiveImage
                    source={{ uri: item }}
                    resizeMode={"cover"}
                    style={Styles.miniSliderSlideImage}
                />
            </TouchableOpacity>
        );
    };

    const renderMiniSlider = () => {
        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={Styles.miniSlider}
                contentContainerStyle={Styles.miniSliderInner}
            >
                <MappedElement
                    data={reduxState?.slides}
                    renderElement={renderMiniSliderSlide}
                />
            </ScrollView>
        );
    };

    const updateIsFavWithApi = async (isFav) => {

        if (myuser?.data?.token) {
            
            let action = isFav == false ? 'add' : 'delete';

            const payload = {
                product_id: item.ProductId,
                action: action
            }

            try {
                const res = await ApiSauce.postWithToken(Add_DELETE_WISHLIST , payload, myuser?.data?.token);
                //console.log('Add_DELETE_WISHLIST  ----- 207   ', res.data)
                res?.data?.data ? alert(res.data.data) : alert(res.data.response);
                updateIsFav(!isFav)
            } 
            catch (error) {
                alert(error.data);
            }
        } 
        else {
            dispatch({
                type: Auth.LOGOUT_USER_API,
                loading: false
            })
        }
    };

    const renderFavButton = () => {
        return (
            <Fragment>
                <Icons style={Styles.sliderArrowRight} name="arrow-forward" />

                <View style={Styles.favButtonContainer}>
                    <TouchableOpacity
                        style={Styles.favButton}
                        onPress={() => updateIsFavWithApi(isFav)}
                        // onPress={() => updateIsFav(!isFav)}
                    >
                        <AntDesign
                            style={Styles.favButtonIcon}
                            name={isFav ? "heart" : "hearto"}
                        />
                    </TouchableOpacity>
                </View>

            </Fragment>
        );
    };

    const renderSliderContainer = () => {
        return reduxState?.slides?.length ? (
            <View style={Styles.sliderContainer}>
                {renderMainSlider()}
                <View style={Styles.sliderBottomContainer}>
                    {renderMiniSlider()}
                    {renderFavButton()}
                </View>
            </View>
        ) : null;
    };

    const addToBasket = () => {
        // navigation.navigate("cart", {
        //     isGoBack: true,
        // });
        dispatch(addProduct(item))
    };
    
    const increment = async (val) => {
        dispatch(addProduct(val))
        setQunatity(quantity+1)
        Toast.show('Add item successfully', Toast.LONG)
    }
    
    const decrement = async (val) => {
        dispatch(removeProduct(val))
        setQunatity(quantity <= 1 ?  1:   quantity-1 )
        Toast.show('Remove item successfully', Toast.LONG)
    }
    
    return (
        <Container
            bottomSpace
            scrollView={true}
            edges={["left", "right"]}
            headerProps={headerProps}
        >
            
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <View style={Styles.container}>
                {renderSliderContainer()}

                <CText style={Styles.subTitle}>{t('Item_number')}{item.ProductId}</CText>
                <CText style={Styles.title}>{item?.ProductName}</CText>

                <View
                    style={[
                        Styles.quantityContainer,
                        Styles.topAndBottomBorder,
                    ]}
                >
                    <CText style={[Styles.normalTitle, GlobalStyle.flex_1]}>
                    {t('Quantity')}
                    </CText>
                 
            <TouchableOpacity style={Styles.minusView} onPress={() => decrement(item)}>
              <Text style={Styles.minusText}>-</Text>
            </TouchableOpacity>

            <Text style={Styles.countText}>{quantity}</Text>

            <TouchableOpacity style={Styles.minusView} onPress={() => increment(item)}>
              <Text style={Styles.plusText}>+</Text>
            </TouchableOpacity>
                </View>

                <CText style={Styles.price}>{t('SAR')} {item.ProductPrice}</CText>

                <CText style={Styles.text}>{item?.ProductDescription}</CText>

                <CButton
                    buttonStyle={Styles.buttonSpace}
                    iconName={"arrow-forward"}
                    title= {t('Add_to_the_basket')}
                    
                    onPress={() => showDatePicker()}

                    // onPress={() => addToBasket()}
                />

                <CText style={Styles.text}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it.
                </CText>

                <View style={[Styles.section, Styles.topAndBottomBorder]}>
                    <CText style={Styles.normalTitle}>{t('Product_Details')}</CText>

                    <View style={Styles.sectionContent}>
                        <View style={Styles.sectionContentItem}>
                            <View style={Styles.sectionContentItemDot} />
                            <CText style={Styles.sectionPoints}>
                                {" "}
                                100% organic flower{" "}
                            </CText>
                        </View>
                        <View style={Styles.sectionContentItem}>
                            <View style={Styles.sectionContentItemDot} />
                            <CText style={Styles.sectionPoints}>
                                {" "}
                                Fresh Vibrant color{" "}
                            </CText>
                        </View>
                        <View style={Styles.sectionContentItem}>
                            <View style={Styles.sectionContentItemDot} />
                            <CText style={Styles.sectionPoints}>
                                {" "}
                                Nice scent{" "}
                            </CText>
                        </View>
                    </View>
                </View>
            </View>
        </Container>
    );
}
export default ProductDetail;
