import {StyleSheet} from "react-native";
import {themes} from "../../../theme/colors";

const Styles = StyleSheet.create({


    container: {
        paddingHorizontal: 20
    },

    title: {
        fontSize: 22,
        textAlign: 'center',
        fontFamily: themes.font.medium,
        color: themes['light'].colors.fontColor,
        marginTop: 30,
        marginBottom: 20

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
    },
    addLocationTitle: {
        flex: 1,
        fontSize: 16,
        textAlign: 'left',
        fontFamily: themes.font.medium,
        color: themes['light'].colors.fontColor,
        marginRight: 10
    },
    addLocationButton: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        height: 'auto',
        alignItems: 'center'
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


    sectionList: {},
    sectionListItem: {
        borderWidth: 1,
        borderColor: themes['light'].colors.lightBorderColor,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 18,
        marginVertical: 10
    },
    sectionListItemHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionListItemHeaderCheckImage: {
        width: 16,
        height: 16,
        marginRight: 15
    },
    sectionListItemHeaderTitle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'left',
        fontFamily: themes.font.medium,
        color: themes['light'].colors.fontColor,
    },
    sectionListItemHeaderRightImage: {
        width: 43,
        height: 13.5
    },
    master: {
        width: 33,
        height: 20
    },
    paypal: {
        width: 20,
        height: 23.6
    },
    sectionListItemBody: {
        marginTop: 25,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    buttonSpace: {
        marginTop: 10
    }


});
export default Styles
