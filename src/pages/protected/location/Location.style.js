import {StyleSheet} from "react-native";
import {themes} from "../../../theme/colors";

const Styles = StyleSheet.create({


    container: {
        paddingHorizontal: 20
    },

    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        height: 183,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 20,
        backgroundColor: themes['light'].colors.primary
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },

    buttonContainer: {
      alignItems: 'center'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginVertical: 5,
    },
    buttonIcon: {
        fontSize: 18,
        color: themes['light'].colors.primary,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.medium
    },
    addLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: themes['light'].colors.lightBorderColor,
        borderRadius: 8,
        marginTop: 10,
        marginBottom:30
    },
    addLocationTitle: {
        flex: 1,
        fontSize: 16,
        textAlign: 'left',
        fontFamily: themes.font.medium,
        color: themes['light'].colors.fontColor,
        marginRight: 10,
    },
    addLocationButton: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        height: 'auto',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    addLocationButtonText: {
        fontSize: 12,
        marginLeft: 10,

    },
    addLocationButtonIcon: {
        fontSize: 12,
        marginLeft: 0
        // marginRight: 10
    },


});
export default Styles
