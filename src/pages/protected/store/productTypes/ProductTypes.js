import React, { useLayoutEffect, useState, useEffect } from "react";
import { Container } from "../../../../containers";
import { CList, CInput, CListItem } from "../../../../uiComponents";
import { View } from "react-native";
import GlobalStyle from "../../../../assets/stylings/GlobalStyle";
import Styles from "../Store.style";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
    getSubCategory,
    searchCategory,
    searchSubCategory,
} from "../../../../store/actions/Root.action";
import '../../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';

function ProductTypes({ route }) {
    const {t, i18n} = useTranslation();
  
    const [currentLanguage,setLanguage] = useState('ar');



    const { item } = route?.params;
    console.log(
        "🚀 ~ file: ProductTypes.js ~ line 17 ~ ProductTypes ~ item",
        item
    );

    const dispatch = useDispatch();
    useLayoutEffect(() => {
        handleSubCategory();
    }, []);
    const handleSubCategory = () => {
        const payload = {
            category_id: item.CategoryId,
        };
        dispatch(getSubCategory(payload));
    };

    const navigation = useNavigation();

    const headerProps = {
        headerTitle: t('Choose_type'),
        showCart: true,
    };

    const reduxState = useSelector(({ auth, root }) => {
        return {
            loading: root.subcategoryLoading,
            // data: [
            //     {
            //         image: require("../../../../assets/images/flowers/one.png"),
            //         title: "Flower type",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/two.png"),
            //         title: "Flower type",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/three.png"),
            //         title: "Flower type",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/four.png"),
            //         title: "Flower type",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/five.png"),
            //         title: "Flower type",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/six.png"),
            //         title: "Flower type",
            //     },
            // ],
            data: root.subcategoryData,
        };
    });

    const [searchText, updateSearchText] = useState("");
    const [timer, setTimer] = useState("");

    const onRefreshHandler = () => {
        handleSubCategory();
    };
    const onEndReached = () => {};

    const onChange = (val) => {
        updateSearchText(val);

        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            // fakeApi()
        }, 500);
        setTimer(newTimer);
        dispatch(
            searchSubCategory({
                subcategory: val,
                category_id: item?.CategoryId,
            })
        );
    };

    const select = (item) => {
        navigation.navigate("products", {
            item,
        });
    };
console.log('flower-type---', item)
    const renderItem = ({ item, index }) => {
        return (
            <CListItem
                image={{ uri: item?.SubCategoryImage }}
                type={"horizontal"}
                title={item?.CategoryName}
                onPress={() => select(item)}
                rightIconName={"arrow-forward"}
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
                numColumns={1}
                contentContainerStyle={GlobalStyle.list}
                data={reduxState.data}
                loading={reduxState.loading}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                emptyOptions={{
                    // icon: require('../../assets/images/empty.png'),
                    text: "Categories not found",
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
export default ProductTypes;
