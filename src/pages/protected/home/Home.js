import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { CText, ProgressiveImage } from "../../../uiComponents";
import Swiper from "react-native-swiper";
import Styles from "./Home.style";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../../../containers";
import VideoPlayer from '../../../containers/VideoPlayer'
// import VideoPlayer from 'react-native-video-controls';

import { getTrending } from "../../../store/actions/Root.action";
import Video from 'react-native-video';

// import VideoPlayer from "react-native-video-player";
const { width, height } = Dimensions.get("window");
import ApiSauce from "../../../utils/network"
import { GET_TRENDING, TRENDING } from "../../../config/webservices"
function Home(props) {

    const [data, setData] = useState()
    console.log("🚀 ~ file: Home.js ~ line 16 ~ Home ~ data", data)

    const dispatch = useDispatch();
    useLayoutEffect(() => {
        handleTrending();
    }, []);

    const handleTrending = () => {
        dispatch(getTrending());
    };

    const slider = useRef();

    const [video, setVideo] = useState([
        { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    ])
    useEffect(() => {
        handleApi()
    }, [])
    // , '24|p52iuFDApHZCYPuy0MmjFp7igWQbWMq2RmtrYbby'
    const handleApi = async () => {
        try {
            const trendData = await ApiSauce.getWithoutToken(GET_TRENDING)
            setData(trendData.data.trending)
            console.log("🚀 ~ file: Home.js ~ line 45 ~ handleApi ~ trendData", trendData)

        }
        catch (err) {
            console.log("🚀 ~ file: Home.js ~ line 46 ~ handleApi ~ err", err)
        }
    }


    const renderSlides = () => {
        if (data?.length > 0) {
            return (
                data?.map((val, index) => {
                    console.log("🚀 ~ file: Home.js ~ line 59 ~ returndata?.map ~ val", val)
                    return (
                        <VideoPlayer
source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}}
/>
                        // <Video source={{ uri: 'https://ayhman.webappcart.com/storage/trendingVideos/jpw8exb5afyvqtc641h3irzgms2k0d9lun7.mp4' }}   // Can be a URL or a local file.
                        //     //    ref={(ref) => {
                        //     //      this.player = ref
                        //     //    }}                                      // Store reference
                        //     //    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        //     //    onError={this.videoError}               // Callback when video cannot be loaded
                        //     style={styles.backgroundVideo} 
                        //     fullscreen={true}
                        //     fullscreenAutorotate='portrait'
                        //     posterResizeMode='cover'
                        //     resizeMode="cover" />
                        // <VideoPlayer
                        // source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
                        //     // thumbnail={{ uri: 'https://img.freepik.com/free-photo/full-length-image-smiling-african-woman-leather-jacket_171337-14041.jpg' }}
                        //     tapAnywhereToPause="true"
                        //     disableVolume='false'
                        //     disableFullscreen='false'
                        //     resizeMode="cover"
                        // />

                    );
                })
            )
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No Data</Text>
                </View>
            )
        }


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
        <View style={{ flex: 1 }}>

            <Header {...headerProps} />
            <Swiper
                ref={slider}
                style={{ backgroundColor: "transparent"  , height:'95%'}}
                showsButtons={false}
                showsPagination={false}
                horizontal={false}
                loop={false}
            >
                             <VideoPlayer
source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}}
/>
                {/* {renderSlides()} */}
            </Swiper>
        </View>
    );
}
export default Home;
var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex:1,
    },
});