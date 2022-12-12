import { StyleSheet } from "react-native";
import {themes} from "../../theme/colors";
import {getLayoutDirection} from "../../utils/methods";

export default StyleSheet.create({
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15
    },
    checkBoxView: {
        width: 16,
        height: 16,
        borderColor: themes['light'].colors.lightBorderColor,
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: themes['light'].colors.primary,
    },
    checkedBoxView: {
        backgroundColor: themes['light'].colors.primary,
    },
    checkBoxViewFill: {
        width: 10.5,
        height: 10.5,
        backgroundColor: themes['light'].colors.primary,
        borderRadius: 3
    },
    checkBoxCheck: {
        fontSize: 10,
        color: themes['light'].colors.tertiary
    },
    checkBoxTitleContainer: {
        flex: 1,
        marginLeft: 10,
        // marginLeft: getLayoutDirection() ? 0 : 10,
        // marginRight: getLayoutDirection() ? 10 : 0,
        // flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    checkBoxTitle: {
        fontSize: 12,
        fontFamily: themes.font.regular,
        color: themes['light'].colors.fontColor,
        textAlign: 'left',
    },
    checkBoxSecondTitle: {
        color: themes['light'].colors.primary,
        fontFamily: themes.font.bold,
        textDecorationLine: 'underline'
    }
});
