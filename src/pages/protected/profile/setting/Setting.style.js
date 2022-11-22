import {StyleSheet} from "react-native";
import {themes} from "../../../../theme/colors";

const Styles = StyleSheet.create({


    container: {
        paddingHorizontal: 20
    },

    myInfoContainer: {
        // paddingVertical: 30
    },

    header: {
        marginTop: 45,
        marginBottom: 30
    },
    headerSubTitle: {
        fontSize: 14,
        color: themes['light'].colors.lightGray,
        fontFamily: themes.font.regular,
        marginBottom: 5
    },
    headerTitle: {
        fontSize: 32,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.medium,
    },

    list: {},
    listItemNone: {
        borderTopWidth: 0
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#DFDFDF',
        paddingVertical: 15,
        paddingHorizontal: 8
    },
    listItemText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.regular,
    },
    listItemLeftIcon: {
        marginRight: 20,
        color: themes['light'].colors.primary,
        fontSize: 24
    },
    listItemRightIcon: {
        color: themes['light'].colors.primary,
        fontSize: 12
    },

    section: {
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: themes['light'].colors.lightBorderColor,
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginBottom: 20
    },
    sectionTitle: {
        textAlign: 'left',
        fontSize: 22,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.medium,
        marginBottom: 20
    },
    sectionItem: {
        borderBottomWidth: 1,
        borderColor: themes['light'].colors.lightGray2,
        paddingVertical: 20

    },
    sectionItemTitle: {
        textAlign: 'left',
        fontSize: 16,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.medium,
        marginBottom: 10
    },
    sectionItemValue: {
        textAlign: 'left',
        fontSize: 14,
        color: themes['light'].colors.fontLowColor,
        fontFamily: themes.font.regular,
    },

    orderItemView: {
        margin: 0,
        marginBottom: 20
    },
    orderImageStyle: {
        width: 100,
        height: 'auto',
        maxHeight: '100%',
        minHeight: '100%'
    },
    orderPriceStyle: {
        fontSize: 20,
        fontFamily: themes.font.bold,
    }
});
export default Styles
