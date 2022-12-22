import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container } from "../../../containers";
import { CList, CInput, CListItem } from "../../../uiComponents";
import { View } from "react-native";
import GlobalStyle from "../../../assets/stylings/GlobalStyle";
import Styles from "./Store.style";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
    getCategory,
    searchCategory,
} from "../../../store/actions/Root.action";
import '../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';

function Store(props) {
    const {t, i18n} = useTranslation();
  
    const [currentLanguage,setLanguage] = useState('ar');



    const dispatch = useDispatch();
    useLayoutEffect(() => {
        handleCategory();
    }, []);

    const handleCategory = () => {
        dispatch(getCategory());
    };

    const navigation = useNavigation();

    const headerProps = {
        headerTitle: t('Store'),
        showCart: true,
    };

    const reduxState = useSelector(({ auth, root }) => {
        console.log("🚀 ~ file: Store.js ~ line 25 ~ reduxState ~ root", root);
        return {
            loading: root?.categoryLoading,
            // data: [
            //     {
            //         image: require("../../../assets/images/flowers/one.png"),
            //         title: "Flower",
            //     },
            //     {
            //         image: require("../../../assets/images/flowers/two.png"),
            //         title: "Flower",
            //     },
            //     {
            //         image: require("../../../assets/images/flowers/three.png"),
            //         title: "Flower",
            //     },
            //     {
            //         image: require("../../../assets/images/flowers/four.png"),
            //         title: "Flower",
            //     },
            //     {
            //         image: require("../../../assets/images/flowers/five.png"),
            //         title: "Flower",
            //     },
            //     {
            //         image: require("../../../assets/images/flowers/six.png"),
            //         title: "Flower",
            //     },
            //     {
            //         image: require("../../../assets/images/flowers/five.png"),
            //         title: "Flower",
            //     },
            //     {
            //         image: require("../../../assets/images/flowers/six.png"),
            //         title: "Flower",
            //     },
            // ],
            data: root?.data,
        };
    });

    const [searchText, updateSearchText] = useState("");
    const [timer, setTimer] = useState("");

    const onRefreshHandler = () => {
        handleCategory();
    };
    const onEndReached = () => {};

    const onChange = (val) => {
        updateSearchText(val);

        clearTimeout(timer);
        const newTimer = setTimeout(() => {
        dispatch(searchCategory({ category: val }));

            // fakeApi()
        }, 1000);
        setTimer(newTimer);
    };
    

    const select = (item) => {
        navigation.navigate("product_types", {
            item,
        });
    };

    const renderItem = ({ item, index }) => {
        return (
            <CListItem
                image={{
                    uri: item.CategoryImage,
                }}
                title={item?.CategoryName}
                onPress={() => select(item)}
            />
        );
    };

    return (
        <Container
            bottomSpace
            edges={["left", "right"]}
            headerProps={headerProps}
        >
            <View style={GlobalStyle.listHeader}>
                <CInput
                    value={searchText}
                    onChangeText={(val) => onChange(val)}
                    inputContainerStyle={GlobalStyle.listHeaderInputContainer}
                    inputInnerContainerStyle={
                        GlobalStyle.listHeaderInputInnerContainer
                    }
                    style={[
                        GlobalStyle.inputStyle,
                        GlobalStyle.listHeaderInputStyle,
                    ]}
                    rightIconName={"search"}
                    iconStyle={GlobalStyle.listHeaderInputIconStyle}
                    onSubmitEditing={() => null}
                />
            </View>

            <CList
                style={Styles.list}
                numColumns={2}
                contentContainerStyle={[GlobalStyle.list, { marginBottom: 15 }]}
                data={reduxState.data}
                loading={reduxState.loading}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                emptyOptions={{
                    // icon: require('../../assets/images/empty.png'),
                    text: "Store not found",
                }}
                onRefreshLoading={reduxState.loading}
                onRefreshHandler={() => onRefreshHandler()}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                maxToRenderPerBatch={10}
                windowSize={10}
            />
        </Container>
    );
}
export default Store;
