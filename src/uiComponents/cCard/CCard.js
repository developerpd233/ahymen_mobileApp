import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
// import img from '../../assets/images/flowers/four.png'
import CText from '../cText/CText'
import CButton from '../cButton/CButton'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CCard = (props) => {
const {productName="Sweet Cakes", priceText="Starting from", price="SAR..", img={img},btnText="Add"} = props
return (
    <View style={styles.mainView}>
        <View style={styles.cardStyle}>
      <View>
        <Image source={img} resizeMode="contain" style={{height:180, width:180}}/>
      </View>
     <View style={{marginVertical:8}}>
        <CText style={styles.productName}>{productName}</CText>
        <CText style={styles.priceText}>{priceText} <CText style={styles.price}>{price}</CText></CText>
     </View>
     <View>
        <TouchableOpacity style={styles.cBtn}>
            <CText style={styles.btnText}>{btnText}</CText>
        </TouchableOpacity>
     </View>
     </View>
    </View>
  )
}

export default CCard

const styles = StyleSheet.create({
    cBtn: {
        borderWidth:1,
        borderColor:'#2e6472',
        height:35,
        width:180,
        alignItems:'center',
        justifyContent:'center'
    },
    mainView: {
       flex:1,
        // backgroundColor:'red',
        
    },
    cardStyle : {
        // backgroundColor:'blue',
        width:180, 
     
    },
    btnText: {
        fontSize:15, 
        color:'#2e6472',
        fontWeight:'800'

    },
    productName: {
        fontSize:16, 
        color:'#000'
    },
    priceText:{
        fontSize:16, 
        color:'#000'
    },
    price:{
        fontSize:16, 
        color:'#000',
        fontWeight:'800'
    }
})