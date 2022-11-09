import React, {useState} from 'react';
import {Container} from "../../../../containers";
import {useSelector} from "react-redux";
import GlobalStyle from "../../../../assets/stylings/GlobalStyle";
import {CList, CListItem} from "../../../../uiComponents";
import Styles from "../Profile.style";

function MyOrder(props) {

    const headerProps = {
        headerTitle: 'My Order',
    };


    const reduxState = useSelector(({auth}) => {
        return {
            loading: false,
            data: [
                {
                    image: require('../../../../assets/images/flowers/one.png'),
                    title: 'Flower',
                    price: '$ 299'
                },
                {
                    image: require('../../../../assets/images/flowers/two.png'),
                    title: 'Flower',
                    price: '$ 299'
                },
                {
                    image: require('../../../../assets/images/flowers/three.png'),
                    title: 'Flower',
                    price: '$ 299'
                },
                {
                    image: require('../../../../assets/images/flowers/four.png'),
                    title: 'Flower',
                    price: '$ 299'
                },
                {
                    image: require('../../../../assets/images/flowers/five.png'),
                    title: 'Flower',
                    price: '$ 299'
                },
                {
                    image: require('../../../../assets/images/flowers/six.png'),
                    title: 'Flower',
                    price: '$ 299'
                }
            ],
        }
    });

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
                orderNumber={'Item # 01010'}
                image={item?.image}
                title={item?.title}
                price={item?.price}
                listItemView={Styles.orderItemView}
                imageStyle={Styles.orderImageStyle}
                priceStyle={Styles.orderPriceStyle}
                buttonIcon={'Tracking'}
                buttonText={'Track order'}
                buttonFunc={() => alert('run')}
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
                data={reduxState.data}
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
