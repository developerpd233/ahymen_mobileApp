import {StyleSheet} from 'react-native';
import {themes as theme, themes} from "../../theme/colors";

export default StyleSheet.create({
    background: {
        position: 'relative',
        backgroundColor: theme['light'].colors.tertiary,
        overflow: 'hidden',
        flex: 1
    },

    backgroundPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    backgroundContainer: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },

    container: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },

    homeHeader: {
        paddingHorizontal: 30,
        paddingTop: 25,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        // height: HEADER_HEIGHT,
        backgroundColor: theme['light'].colors.tertiary,
        shadowColor: theme['light'].colors.dark,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0,
        shadowRadius: 4,
        elevation: 6,
        zIndex: 1
    },
    homeHeaderContent: {
        flex: 1
    },
    homeHeaderContentTitle: {
        fontSize: 20,
        fontFamily: themes.font.regular,
        color: theme['light'].colors.fontColor,
        marginTop: 15,
        textAlign: 'left'
    },
    homeHeaderContentSubTitle: {
        fontSize: 14,
        fontFamily: themes.font.regular,
        color: theme['light'].colors.gray1,
        textAlign: 'left'
    },
    homeHeaderButtons: {
        justifyContent: 'flex-end',
    },
});
