import React, {useState , useEffect} from 'react';
import { Container, CountriesModal } from "../../../../containers";
import {useSelector} from "react-redux";
import GlobalStyle from "../../../../assets/stylings/GlobalStyle";
import {CList, CListItem} from "../../../../uiComponents";
import Styles from "../Profile.style";
import { GET_ORDERS } from "../../../../config/webservices";
import ApiSauce from "../../../../utils/network";

function MyOrder(props) {
   const [orderData , setOrderData] = useState([])
    const headerProps = {
        headerTitle: 'My Order',
    };

    const reduxState = useSelector(({auth}) => {
        return {
            loading: false,
            user:auth.user,
            // data: getOrders(),
        }
    });

    useEffect(()=>{
        getOrders()
    },[])

    const getOrders = async () => {
    
        // let orders = []

        try {
            const res = await ApiSauce.getWithToken(GET_ORDERS , reduxState?.user?.data?.token);
            if (res.success == true && res?.data?.order?.length > 0) {
                setOrderData(res?.data?.order) 
            }
        } catch (error) {
            console.log('error MyOrders  ----- 42   ', error)
            // alert(error.message);
        }
    };

    const goToSingleOrder = (orderNumber) => {
    
        alert('goToSingleOrder-'+orderNumber)

    };

    let myuser = reduxState?.user?.data?.token ? reduxState?.user : null ;
    const [searchText, updateSearchText] = useState('');

    const onRefreshHandler = () => {};
    const onEndReached = () => {};

    const onChange = (val) => {
        updateSearchText(val);
    };

    const renderItem = ({item, index}) => {
        return (
            <CListItem
                activeOpacity={1}
                type={'horizontal'}
                orderNumber={'Item # '+item?.orderNumber}
                image={require('../../../../assets/images/trolly2.jpg')}
                title={'Order '+item?.order_status}
                price={item?.order_amount}
                listItemView={Styles.orderItemView}
                imageStyle={Styles.orderImageStyle}
                priceStyle={Styles.orderPriceStyle}
                buttonIcon={'Tracking'}
                buttonText={'Track order'}
                buttonFunc={() => goToSingleOrder(item?.orderNumber)}
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
                data={orderData}
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
export default MyOrder;
