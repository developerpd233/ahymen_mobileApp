import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import {CButton} from "../../../uiComponents"
const Ordertraking = (props) => {
    const data = props?.route?.params?.abc?.order_view
  return (
    <View style={{flex:1 , marginBottom:50}}>

        {/* <Text>helhbjnkmll</Text> */}
        <WebView source={{ uri:data}} />
        <View style={{justifyContent:'center',alignSelf:'flex-start',marginHorizontal:20}}>
          
        </View>
        
    </View>
  )
}

export default Ordertraking

const styles = StyleSheet.create({})