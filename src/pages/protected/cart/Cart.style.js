import { StyleSheet, Dimensions, Platform } from "react-native";
import { themes } from "../../../theme/colors";

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },

    linkButton: {
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
    linkButtonText: {
        color: themes["light"].colors.fontColor,
        fontFamily: themes.font.regular,
    },

    paymentInfo: {
        borderWidth: 1,
        borderColor: themes["light"].colors.lightBorderColor,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginVertical: 25,
        
    },
    paymentInfoItem: {
        paddingVertical: 5,
        
    },
    paymentInfoItemTitle: {
        flex: 1,
        fontSize: 16,
        color: themes["light"].colors.fontColor,
        fontFamily: themes.font.regular,
    },
    paymentInfoItemValue: {
        fontSize: 14,
        color: themes["light"].colors.primary,
        fontFamily: themes.font.bold,
    },

    orderList: {
        // marginTop: 15,
    },

    orderItemView: {
        margin: 0,
        marginBottom: -10,
    },
    orderImageStyle: {
        width: 100,
        height: 100,
    },
    orderPriceStyle: {
        fontSize: 20,
        fontFamily: themes.font.bold,
    },
    orderItemBottomView: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: themes["light"].colors.lightBorderColor,
        position: "relative",
        zIndex: -1,
    },
    orderItemBottomQuantity: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 25,
        paddingBottom: 15,
    },
    orderItemBottomQuantityText: {
        flex: 1,
        fontSize: 16,
        color: themes["light"].colors.fontColor,
        fontFamily: themes.font.regular,
    },
    orderItemBottomQuantityValue: {
        fontSize: 14,
        color: themes["light"].colors.primary,
        fontFamily: themes.font.medium,
    },
    orderItemBottomQuantityPrice: {
        fontSize: 26,
        color: themes["light"].colors.primary,
        fontFamily: themes.font.bold,
        textAlign: "center",
    },
    orderItemBottomQuantityIcon: {
        color: themes["light"].colors.primary,
        fontSize: 12,
        opacity: 0.5,
        marginLeft: 10,
        marginTop: Platform.OS === "ios" ? 0 : 2,
    },

    orderListItemButtons: {
        flexDirection: "row",
        paddingHorizontal: 12,
    },

    orderListItemButton: {
        height: "auto",
        padding: 0,
        marginHorizontal: 3,
        flex: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    orderListItemButtonText: {
        fontSize: 12,
        fontFamily: themes.font.regular,
        textAlign: "center",
    },
    orderListItem:{
        marginVertical:20
    },
    minusView: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      minusText: { fontSize: 28, color: '#565656' },
      countText: { fontSize: 16, color: '#565656' },
      plusText: { fontSize: 19, color: '#565656' },
      icon:{
        fontSize:20
      },
      buttonText:{
        color: themes["light"].colors.green,
        
      },
      productMsg: {
        fontSize:16, 
        fontWeight:'800', 
        color: themes["light"].colors.primary,
      },
      CatRow:{
        borderBottomWidth: 0.5,
        marginTop: 20,
        heightl:30
      },
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
});
export default Styles;
