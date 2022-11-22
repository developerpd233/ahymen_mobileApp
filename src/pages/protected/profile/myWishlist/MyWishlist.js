import React, {useState , useEffect} from 'react';
import { Container, CountriesModal } from "../../../../containers";
import {useSelector} from "react-redux";
import GlobalStyle from "../../../../assets/stylings/GlobalStyle";
import {CList, CListItem} from "../../../../uiComponents";
import Styles from "../Profile.style";
import { GET_WISHLIST } from "../../../../config/webservices";
import ApiSauce from "../../../../utils/network";
import { useNavigation } from "@react-navigation/core";

function MyWishlist(props) {
   
    const [wishlistData , setWishlistData] = useState()
    const navigation = useNavigation();

    console.log("🚀 ~ file: myWishlist.js ~ line 13 ~ MyWishlist ~ wishlistData", wishlistData)
    
    const headerProps = {
        headerTitle: 'My Wishlist',
        backOnPress:false
    };

    const reduxState = useSelector(({auth}) => {
        return {
            loading: false,
            user:auth.user,
        }
    });

    useEffect(()=>{
        getWishlist()
    },[])

    const getWishlist = async () => {

        try {
            const res = await ApiSauce.getWithToken(GET_WISHLIST , reduxState?.user?.data?.token);
            //  setData(res)
            console.log('MyWishlist  ----- 35   ', res)

            if (res.success == true && res?.data?.wishlist?.length > 0) {
                setWishlistData(res?.data?.wishlist) 
            }

        } catch (error) {
            console.log('error MyWishlist  ----- 42   ', error)
            // alert(error.message);
        }

    };

    let myuser = reduxState?.user?.data?.token ? reduxState?.user : null ;

    console.log('MyProduct line 52 -----', myuser);

    const [searchText, updateSearchText] = useState('');

    const onRefreshHandler = () => {};
    const onEndReached = () => {};

    const onChange = (val) => {
        updateSearchText(val);
    };

    const select = (item) => {
        navigation.navigate("product_detail", { item });
    };

    const renderItem = ({item, index}) => {
        console.log('****',item?.ProductImage?.[0]);
        return (
            <CListItem
                activeOpacity={1}
                type={'horizontal'}
                orderNumber={'Item # '+item?.ProductId}
                image={{uri :item?.ProductImage?.[0]}} 
                title={item?.ProductName}
                price={item?.ProductPrice}
                listItemView={Styles.orderItemView}
                imageStyle={Styles.orderImageStyle}
                priceStyle={Styles.orderPriceStyle}
                buttonIcon={'Tracking'}
                buttonText={'Show Product'}
                buttonFunc={() => select(item)}
            />
        )
    };

    return(
        <Container
            bottomSpace
            edges={['left', 'right']}
            headerProps={headerProps}>

            <CList
                numColumns={1}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={wishlistData}
                loading={reduxState.loading}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                emptyOptions={{
                    // icon: require('../../assets/images/empty.png'),
                    text: 'Flowers not found'
                }}
                onRefreshLoading={reduxState.loading}
                onRefreshHandler={() => onRefreshHandler()}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                maxToRenderPerBatch={10}
                windowSize={10}
            />


        </Container>
    )
}
export default MyWishlist;
