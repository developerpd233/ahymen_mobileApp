import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import img from '../../../../assets/images/flowers/four.png'
import CCard from '../../../../uiComponents/cCard/CCard'
import { useEffect } from 'react'

const CartManage = () => {
  const [state, setstate] = useState(0)
  const [productData , setProductData] =useState([])

  const Data = [
    {
      categoryName: 'Cakes',
    },
    {
      categoryName: 'Chocolates',
    },
    {
      categoryName: 'Chocdss',
    },
    {
      categoryName: 'Chocoddddlates',
    },
    {
      categoryName: 'Chocoladdtes',
    },
    {
      categoryName: 'Chocolaccctes',
    },
    {
      categoryName: 'Chocolfrrrtes',
    },
    {
      categoryName: 'Chocolrrrrtes',
    },
    {
      categoryName: 'Chocolrrrrtes',
    },
    {
      categoryName: 'Chocoloorrrtes',
    },
  ]

  useEffect(() => {
    const data = ApiSauce.getWithoutToken(FEATURE_CAT_AND_PRODUCT)
    // setProductData(data)
    console.log('data---', data)
    
  }, [])
  

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity  style={[styles.CTabview, { borderBottomWidth: state == index ? 1 : 0, borderColor: state == index ? "#2e6472" : 'none' }]} onPress={() => setstate(index)}>
        <Text style={styles.tabViewText}>{item.categoryName}</Text>
      </TouchableOpacity>
    )
  }

  const cardData = [
    {
      img:img,
      productName: 'Product Name',
      priceText: 'priceText',
      price: 'SAR 200',
      btnText:'Add'
    }
  ]

  const cardRender = () => {
    return(
      cardData.map((val) => {
        return (
          <CCard  img={val?.img} productName={val?.productName} priceText={val?.priceText} price={val?.price} btnText={val?.btnText}/>
        )
      })

    )
  }

  return (
    <>
      <View style={styles.mainView}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Data}
          renderItem={renderItem}
        />
      </View>
      {cardRender()}
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
    marginTop: 20
  },
  tabViewText: {
    color: '#2e6472'
  }
})