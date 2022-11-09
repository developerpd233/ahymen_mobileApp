import React, { useState, Fragment } from "react";
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


function ProductDetail({ route }) {
    const { item } = route?.params;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const dispatch = useDispatch()
    console.log(
        "🚀 ~ file: ProductDetail.js ~ line 21 ~ ProductDetail ~ item",
        item
    );

    const navigation = useNavigation();
    const headerProps = {
        headerTitle: "Flower",
        showCart: true,
    };

    const [slideIndex, updateSlideIndex] = useState(0);
    const [isFav, updateIsFav] = useState(false);
    const [quantity, setQunatity] = useState(1);


    const reduxState = useSelector(({ auth }) => {
        return {
            loading: false,
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
            slides: item?.ProductImage,
        };
    });
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
      const handleConfirm = ()=> {
        setDatePickerVisibility(false)
        addToBasket()
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

    const renderFavButton = () => {
        return (
            <Fragment>
                <Icons style={Styles.sliderArrowRight} name="arrow-forward" />
                <View style={Styles.favButtonContainer}>
                    <TouchableOpacity
                        style={Styles.favButton}
                        onPress={() => updateIsFav(!isFav)}
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
      }
    
      const decrement = async (val) => {
        dispatch(removeProduct(val))
        setQunatity(quantity <= 1 ?  1:   quantity-1 )

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

                <CText style={Styles.subTitle}>Item # {item.ProductId}</CText>
                <CText style={Styles.title}>{item.ProductName}</CText>

                <View
                    style={[
                        Styles.quantityContainer,
                        Styles.topAndBottomBorder,
                    ]}
                >
                    <CText style={[Styles.normalTitle, GlobalStyle.flex_1]}>
                        Quantity
                    </CText>
                 
            <TouchableOpacity style={Styles.minusView} onPress={() => decrement(item)}>
              <Text style={Styles.minusText}>-</Text>
            </TouchableOpacity>

            <Text style={Styles.countText}>{quantity}</Text>

            <TouchableOpacity style={Styles.minusView} onPress={() => increment(item)}>
              <Text style={Styles.plusText}>+</Text>
            </TouchableOpacity>
                </View>

                <CText style={Styles.price}>${item.ProductPrice}</CText>

                <CText style={Styles.text}>{item?.ProductDescription}</CText>

                <CButton
                    buttonStyle={Styles.buttonSpace}
                    iconName={"arrow-forward"}
                    title="Add to basket"
                    
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
                    <CText style={Styles.normalTitle}>Product Details</CText>

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
