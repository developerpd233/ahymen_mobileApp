import { StyleSheet, Platform } from 'react-native';
import {themes as theme, themes} from "../../theme/colors";

export default StyleSheet.create({
    buttonStyle: {
        borderColor: theme['light'].colors.primary,
        borderWidth: 1,
        backgroundColor: theme['light'].colors.primary,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position: 'relative',
        height: 50,
        flexDirection: 'row',
    },
    buttonText: {
        color: theme['light'].colors.tertiary,
        fontSize: 16,
        fontFamily: themes.font.medium,
    },
    buttonIcon: {
        color: theme['light'].colors.secondary,
        fontSize: 12,
        marginLeft: 10,
        marginTop: Platform.OS === 'ios' ? 2 : 4
    },

})
