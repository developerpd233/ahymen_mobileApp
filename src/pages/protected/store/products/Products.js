import React, { useLayoutEffect, useState, useEffect } from "react";
import { Container } from "../../../../containers";
import { CList, CInput, CListItem } from "../../../../uiComponents";
import { View } from "react-native";
import GlobalStyle from "../../../../assets/stylings/GlobalStyle";
import Styles from "../Store.style";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import {
    getProducs,
    searchProducts,
} from "../../../../store/actions/Root.action";
import { Root } from "../../../../routing";
import '../../../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';

function Products({ route }) {
    const {t, i18n} = useTranslation();
  
    const [currentLanguage,setLanguage] = useState('ar');


    const { item } = route.params;
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        handleProduct();
    }, []);

    const handleProduct = () => {
        const payload = {
            sub_category_id: item.SubCategoryId,
        };
        dispatch(getProducs(payload));
    };

    const navigation = useNavigation();

    const headerProps = {
        headerTitle: t('Flower_type'),
        showCart: true,
    };

    const reduxState = useSelector(({ auth, root }) => {
        console.log(
            "🚀 ~ file: Products.js ~ line 36 ~ reduxState ~ root",
            root
        );
        return {
            loading: root.categoryLoadingproduct,
            // data: [
            //     {
            //         image: require("../../../../assets/images/flowers/one.png"),
            //         title: "Flower",
            //         price: "$ 299",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/two.png"),
            //         title: "Flower",
            //         price: "$ 299",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/three.png"),
            //         title: "Flower",
            //         price: "$ 299",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/four.png"),
            //         title: "Flower",
            //         price: "$ 299",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/five.png"),
            //         title: "Flower",
            //         price: "$ 299",
            //     },
            //     {
            //         image: require("../../../../assets/images/flowers/six.png"),
            //         title: "Flower",
            //         price: "$ 299",
            //     },
            // ],
            data: root.subcategoryProduct,
        };
    });

    const [searchText, updateSearchText] = useState("");
    const [timer, setTimer] = useState("");

    const onRefreshHandler = () => {
        handleProduct();
    };
    const onEndReached = () => {};

    const onChange = (val) => {
        updateSearchText(val);
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            // fakeApi()
        }, 700);
        setTimer(newTimer);
        dispatch(
            searchProducts({
                product: val,
                sub_category_id: item?.SubCategoryId,
            })
        );
    };

    const select = (item) => {
        navigation.navigate("product_detail", { item });
    };

    const renderItem = ({ item, index }) => {
        return (
            <CListItem
                image={{ uri: item?.ProductImage?.[0] }}
                title={item?.ProductName}
                price={item?.ProductPrice}
                listItemView={Styles.noBorderAndNoShadow}
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
                contentContainerStyle={GlobalStyle.list}
                data={reduxState.data}
                loading={reduxState.loading}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                emptyOptions={{
                    // icon: require('../../assets/images/empty.png'),
                    text: t("Flowers_not_found"),
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
export default Products;
