import React, { useLayoutEffect, useRef ,useState} from "react";
import { Dimensions, View } from "react-native";
import { CText, ProgressiveImage } from "../../../uiComponents";
import Swiper from "react-native-swiper";
import Styles from "./Home.style";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../../../containers";
import { getTrending } from "../../../store/actions/Root.action";
import VideoPlayer from "react-native-video-player";
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
    const [video , setVideo] = useState([
        {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'},
        {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
        {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
        {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
        {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
        {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
        {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
        {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
    ])
   

    const renderSlides = () => {
        if (video && video?.length) {
            return video?.map((val, index) => {
                return (
                    <VideoPlayer
                        video={{ uri: val?.uri }}
                        style={{ height:'98.5%' , width:'100%' , alignSelf:'center'}}
                        // videoWidth={1600}
                        // videoHeight={3190}
                        thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                        pauseOnPress="true"
                        // videoHeight={2000}
                        resizeMode="cover"
                    />
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
                {renderSlides()}
            </Swiper>
        </View>
    );
}
export default Home;
