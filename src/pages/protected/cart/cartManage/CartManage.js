import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import img from '../../../../assets/images/flowers/four.png'
import CCard from '../../../../uiComponents/cCard/CCard'
import { useEffect } from 'react'
import ApiSauce from "../../../../utils/network"
import { FEATURE_CAT_AND_PRODUCT } from '../../../../config/webservices'
import { Header } from '../../../../containers'
import { CButton, CListItem, CText } from '../../../../uiComponents'
import Icons from "../../../../assets/icons/CustomIcon"
import Styles from '../Cart.style'
import { MappedElement } from '../../../../utils/methods'
import { useSelector } from 'react-redux'
import '../../../../utils/i18n/lan';
import { useTranslation } from 'react-i18next';
const CartManage = () => {
  const [state, setstate] = useState(0)
  const [productData, setProductData] = useState([])

  const { t, i18n } = useTranslation();

  useEffect(() => {
    handleApi()
  }, [])

  const handleApi = async () => {
    try {
      const data = await ApiSauce.getWithoutToken(FEATURE_CAT_AND_PRODUCT)
      setProductData(data.data)
    } catch (e) {
      console.log('e---', e)
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={[styles.CTabview, { borderBottomWidth: state == index ? 1 : 0, borderColor: state == index ? "#2e6472" : 'none', }]} onPress={() => setstate(index)}>
        <Text style={styles.tabViewText}>{item.CategoryName}</Text>
      </TouchableOpacity>
    )
  }



  const renderAbc = ({ val }) => {
    return (
      <View style={{ flex:1, alignItems:'center'}}> 
      <CCard img={{ uri: val?.ProductImage }} productName={val?.ProductName} priceText={val?.priceText} price={val?.price} btnText={val?.btnText} />
      </View>
      )

  }




  const cardRender = () => {
    return (
    productData?.[state]?.Products?.length > 0 ?  <FlatList
        // showsHorizontalScrollIndicator={false}
        // horizontal
        numColumns={2}
        data={productData?.[state]?.Products}
        renderItem={renderAbc}
      />

      : <View style={{alignItems:'center', marginTop:20}}>
        <Text style={Styles.productMsg}>No Products Available</Text>
      </View>

    )
  }

  // cart 
  const reduxState = useSelector(({ auth  , root , cart, language}) => {
        
    return {
        loading: false,
        data: cart,
        user:auth.user,
        language:language?.language?.lan
    };
});

const langCheck = reduxState.language
    let totalSum = 0;
reduxState?.data?.forEach(obj => {
    let objSum = obj.ProductPrice ? obj.ProductPrice * obj.quantity : obj?.price * obj.quantity
    totalSum += objSum;
})


  const increment = async (val) => {
    dispatch(addProduct(val))
  }

  const decrement = async (val) => {
    dispatch(removeProduct(val))

  }
  const removeSpecPro = async (val) => {
    dispatch(removeSpecificProduct(val))


  }

  const renderItems = (item, index) => {
    return (
      <View style={Styles.orderListItem}>
        <CListItem
          activeOpacity={1}
          type={"horizontal"}
          orderNumber={"Item # 01010"}
          image={{ uri: item?.ProductImage?.[0] }}
          title={item?.ProductName}
          imageStyle={Styles.orderImageStyle}
          listItemView={Styles.orderItemView}
          rightIconName={"arrow-forward"}
        />
        <View style={Styles.orderItemBottomView}>
          <View style={Styles.orderItemBottomQuantity}>
            <CText style={Styles.orderItemBottomQuantityText}>
              {t('Quantity')}
            </CText>

            <TouchableOpacity style={Styles.minusView} onPress={() => decrement(item)}>
              <Text style={Styles.minusText}>-</Text>
            </TouchableOpacity>

            <CText style={Styles.orderItemBottomQuantityValue}>
              {item.quantity}
            </CText>

            <TouchableOpacity style={Styles.minusView} onPress={() => increment(item)}>
              <Text style={Styles.plusText}>+</Text>
            </TouchableOpacity>

            <Icons
              style={Styles.orderItemBottomQuantityIcon}
              name="arrow-forward"
            />
          </View>
          <CText style={Styles.orderItemBottomQuantityPrice}>
            {item.ProductPrice}
          </CText>
        </View>
        <View style={Styles.orderListItemButtons}>
          <CButton
            buttonStyle={Styles.orderListItemButton}
            buttonText={Styles.orderListItemButtonText}
            onPress={() => navigation.navigate("store")}
            title={t('View_details')}
          />
          {/* <CButton
                    buttonStyle={Styles.orderListItemButton}
                    buttonText={Styles.orderListItemButtonText}
                    onPress={() => navigation.navigate("add_gift_card")}
                    title="Add gift card"
                /> */}
          <CButton
            buttonStyle={Styles.orderListItemButton}
            buttonText={Styles.orderListItemButtonText}
            onPress={() => removeSpecPro(item)}
            title={t("Remove")}
          />
        </View>
      </View>
    );
  };


  return (
    <>
      {/* Header */}
      <Header headerTitle="Cart" style={styles.header} />
      <View style={Styles.container}>

        {/* cart */}

        <View style={Styles.orderList}>
          <MappedElement
            data={reduxState?.data}
            renderElement={renderItems}
          />
        </View>

        {/* card message */}



        {/* Product Category */}

        <View style={[styles.mainView]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={productData}
            renderItem={renderItem}
          />
        </View>
        {cardRender()}
      </View>
    </>

  )
}

export default CartManage

const styles = StyleSheet.create({
  CTabview: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mainView: {
    borderBottomWidth: 0.5,
    marginTop: 20,
    
  },
  tabViewText: {
    color: "#7C8061",
  },
  header: {
    color: "#7C8061",
  }
})