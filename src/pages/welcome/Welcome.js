import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import Styles from "./WelcomeStyle";
import { ProgressiveImage, CText } from "../../uiComponents";
import { slides } from "./Data";
import { Container } from "../../containers";
import { WELCOME_SCREEN } from "../../utils/asyncStorage/Constants";
import { _setDataToAsyncStorage } from "../../utils/asyncStorage/Functions";

const { width } = Dimensions.get("window");

function Welcome(props) {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { navigation } = props;

    const setSliderPage = (event: any) => {
        let slideWidth = width - 40;
        const { x } = event.nativeEvent.contentOffset;
        if (x < slideWidth - 10) {
            setCurrentIndex(0);
        } else if (slideWidth >= x) {
            setCurrentIndex(1);
        } else if (x > slideWidth && x <= slideWidth * 2) {
            setCurrentIndex(2);
        }
    };

    const skipFunc = async () => {
        await _setDataToAsyncStorage(WELCOME_SCREEN, "hide");
        navigation.navigate("sign_in");
    };

    const onNext = () => {
        let slideWidth = width - 40;
        let nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        let totalScroll = slideWidth * nextIndex;
        if (nextIndex === 3) {
            skipFunc();
        } else {
            scrollViewRef?.current?.scrollTo({
                x: totalScroll,
                y: 0,
                animated: true,
            });
        }
    };

    const renderSlides = (slides) => {
        if (slides && slides.length) {
            return slides.map((slide, index) => {
                return (
                    <View
                        key={index}
                        style={[Styles.slideContent, { width: width - 40 }]}
                    >
                        <CText style={Styles.slideTitle}>{slide.title}</CText>
                        <ProgressiveImage
                            resizeMode="contain"
                            style={Styles.slideImage}
                            source={slide.vector}
                        />
                        <CText style={Styles.slideSubTitle}>
                            {slide.content}
                        </CText>
                    </View>
                );
            });
        }
        return null;
    };
    const onLayoutScrollView = () => {
        console.log("run");
    };

    return (
        <Container style={Styles.container} showPattern={true}>
            <View style={Styles.sliderContainer}>
                <View style={Styles.sliderCard}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal={true}
                        scrollEventThrottle={16}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onLayout={onLayoutScrollView}
                        onScroll={(event: any) => {
                            setSliderPage(event);
                        }}
                    >
                        {renderSlides(slides)}
                    </ScrollView>

                    <View style={Styles.sliderCardFooter}>
                        <TouchableOpacity
                            style={Styles.sliderCardFooterButton}
                            onPress={() => skipFunc()}
                        >
                            <CText style={Styles.sliderCardFooterButtonText}>
                                Skip
                            </CText>
                        </TouchableOpacity>

                        <View style={Styles.paginationWrapper}>
                            {slides.map((key, index) => (
                                <View
                                    style={[
                                        Styles.paginationDot,
                                        currentIndex === index &&
                                            Styles.paginationActiveDot,
                                    ]}
                                    key={index}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            style={Styles.sliderCardFooterButton}
                            onPress={() => onNext()}
                        >
                            <CText style={Styles.sliderCardFooterButtonText}>
                                Next
                            </CText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Container>
    );
}
export default Welcome;
