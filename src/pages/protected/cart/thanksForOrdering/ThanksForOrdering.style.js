import {StyleSheet} from "react-native";
import {themes as theme, themes} from "../../../../theme/colors";

export default StyleSheet.create({

    centerModalCenterVector: {
        width: 186,
        height: 187.15
    },

    contentBody: {
        marginVertical: 25
    },

    title: {
        fontSize: 28,
        fontFamily: themes.font.medium,
        color: themes['light'].colors.fontColor,
        textAlign: 'center',
        marginBottom: 10
    },

    subTitle: {
        fontSize: 16,
        fontFamily: themes.font.medium,
        color: themes['light'].colors.fontLowColor,
        textAlign: 'center'
    },

    orContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 20
    },
    orContainerText: {
        fontSize: 20,
        fontFamily: theme.font.regular,
        color: theme['light'].colors.dark,
    },

});
