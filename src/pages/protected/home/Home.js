import React, { useLayoutEffect, useRef } from "react";
import { Dimensions, View } from "react-native";
import { CText, ProgressiveImage } from "../../../uiComponents";
import Swiper from "react-native-swiper";
import Styles from "./Home.style";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../../../containers";
import { getTrending } from "../../../store/actions/Root.action";
const { width, height } = Dimensions.get("window");

function Home(props) {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        handleTrending();
    }, []);

    const handleTrending = () => {
        dispatch(getTrending());
    };

    const slider = useRef();

    const reduxState = useSelector(({ root }) => {
        console.log("🚀 ~ file: Home.js ~ line 24 ~ reduxState ~ root", root?.trendingProduct);
        return {
            loading: root.trendingLoading,
            data: [
                {
                    image: "https://ayhman.webappcart.com/storage/9/632ecf528a…682_2397_b4608225-232b-4ea0-a8af-5b941bf37a46.jpg" ,
                },
                {
                    image: require("../../../assets/images/trending/slide_two.png"),
                },
                {
                    image: require("../../../assets/images/trending/slide.png"),
                },
                {
                    image: require("../../../assets/images/trending/slide_two.png"),
                },
            ],
            // data: root?.trendingProduct,
        };
    });

    const renderSlides = (slides) => {
        if (slides && slides.length) {
            return slides.map((slide, index) => {
                return (
                    <View
                        key={index}
                        style={[Styles.slide, { width: width, height: height }]}
                    >
                        <ProgressiveImage
                            source={slide?.image}
                            resizeMode={"cover"}
                            style={Styles.listItemImage}
                        />
                    </View>
                );
            });
        }
        return null;
    };

    const headerProps = {
        headerTitle: "Trending",
        transparent: true,
        showCart: true,
        hideBackButton: false,
        theme: "light",
        style: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
        },
    };

    return (
        <View style={{ position: "relative", flex: 1 }}>
            <Header {...headerProps} />
            <Swiper
                ref={slider}
                style={{ backgroundColor: "transparent" }}
                showsButtons={false}
                showsPagination={false}
                horizontal={false}
                loop={false}
            >
                {renderSlides(reduxState?.data)}
            </Swiper>
        </View>
    );
}
export default Home;
