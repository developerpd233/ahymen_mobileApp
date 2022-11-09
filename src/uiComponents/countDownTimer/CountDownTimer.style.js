import {StyleSheet} from "react-native";
import {themes as theme, themes} from "../../theme/colors";

export default StyleSheet.create({
    timeContainer : {
        marginBottom: 30,
        alignItems: 'flex-start'
    },
    timeInnerContainer : {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    timeContainerText: {
        fontSize: 14,
        fontFamily: themes.font.regular,
        color: theme['light'].colors.lightGray
    },
    timeContainerTextBlue: {
        color: theme['light'].colors.fontColor,
        fontFamily: themes.font.medium,
        marginLeft: 5
    }
});
