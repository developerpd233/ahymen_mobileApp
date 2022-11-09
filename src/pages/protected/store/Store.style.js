import {StyleSheet, Dimensions, Platform} from "react-native";
import {themes} from "../../../theme/colors";

const {width} = Dimensions.get('window');

const Styles = StyleSheet.create({

    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingBottom: 35
    },

    center: {
        flexGrow: 1,
        justifyContent: 'center'
    },

    list: {
        marginHorizontal: -10,
        paddingVertical: 20
    },

    sliderContainer: {
        marginTop: 20
    },
    sliderArrowRight: {
        fontSize: 16,
        color: '#B4B4B4',
        paddingLeft: 15,
    },

    singleSlide: {
        width: width - 40,
        height: 280,
        borderRadius: 10,
        overflow: 'hidden',
    },
    singleSlideImage: {
        width: '100%',
        height: '100%',
    },

    sliderBottomContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    miniSlider: {
        flex: 1,
        // marginLeft: -20,
    },
    miniSliderInner: {
       // paddingHorizontal: 15
    },
    miniSliderSlide: {
        width: 65,
        height: 55,
        borderRadius: 6,
        overflow: 'hidden',
        marginHorizontal: 5,
        opacity: 0.5
    },
    activeMiniSliderSlide: {
        opacity: 1
    },
    miniSliderSlideImage: {
        width: '100%',
        height: '100%',
    },

    favButtonContainer: {
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    favButton: {
        padding: 10
    },
    favButtonIcon: {
        fontSize: 20,
        color: '#B4B4B4'
    },


    topAndBottomBorder: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#DFDFDF',
        paddingVertical: 10,
    },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },

    marginBottom_15: {
        marginBottom: 15
    },

    normalTitle: {
        flex: 1,
        fontSize: 16,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.regular
    },

    quantityContainerSubTitle: {
        fontSize: 18,
        padding:5,
        color: themes['light'].colors.primary,
        fontFamily: themes.font.medium
    },

    quantityContainerIcon: {
        color: themes['light'].colors.primary,
        fontSize: 12,
        opacity: 0.50,
        marginLeft: 10,
        marginTop: Platform.OS === 'ios' ? 0 : 2
    },

    subTitle: {
        fontSize: 12,
        color: themes['light'].colors.lightGray,
        fontFamily: themes.font.regular,
        marginBottom: 5
    },
    title: {
        fontSize: 32,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.medium
    },

    price: {
        fontSize: 20,
        color: themes['light'].colors.primary,
        fontFamily: themes.font.bold,
        marginBottom: 20
    },

    text: {
        fontSize: 14,
        color: themes['light'].colors.fontLowColor,
        fontFamily: themes.font.regular
    },
    buttonSpace: {
        marginVertical: 20
    },


    section: {
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    sectionContent: {
        marginTop: 10,
        marginBottom: 5
    },
    sectionContentItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionContentItemDot: {
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: themes['light'].colors.primary,
        marginRight: 10,
        marginLeft: 3
    },
    sectionPoints: {
        fontSize: 14,
        color: themes['light'].colors.fontLowColor,
        fontFamily: themes.font.regular,
        marginVertical: 5
    },

    pageTitle: {
            fontSize: 22,
            fontFamily: themes.font.medium,
            color: themes['light'].colors.fontColor,
            textAlign: 'center',
            marginBottom: 25,
            marginTop: 10,
            lineHeight: 20
    },


    textArea: {
        borderWidth: 1,
        color:'#000',
        borderRadius: 10,
       
        borderColor: themes['light'].colors.lightBorderColor,
        paddingVertical: 25,
        paddingHorizontal: 15,
    },
    textAreaInput:{
        minHeight: 125,
        padding: 10,
        color: themes['light'].colors.fontLowColor,
    },
    noBorderAndNoShadow: {
        borderColor: 'transparent',
        elevation: 0,
        shadowColor: 'transparent',
        marginBottom: -5
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
      buttonStyle:{
        width:170,
        marginVertical:5,
        marginHorizontal:5
      },
      borderBtn:{
        backgroundColor:'#FFF'
      },buttonText:{
        color: themes['light'].colors.fontColor,

      }

});
export default Styles
