import {StyleSheet} from 'react-native';
import {themes as theme} from "../../theme/colors";

export default StyleSheet.create({
    wrapper:  {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(124, 128, 97, 0.7)',
        zIndex: 3,
    },
    loading: {
        color: theme['light'].colors.tertiary,
        fontSize: 32,
    },
    loadingText: {
        fontSize: 20,
        color: theme['light'].colors.tertiary,
        fontFamily: theme.font.medium,
        marginTop: 15
    },
    animation: {
        width: 100,
        height: 100
    }
});
