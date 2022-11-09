import {StyleSheet, Platform} from "react-native";
import {themes as theme} from "../../theme/colors";
export const headerHeight = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    headerLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLogoImage: {
        width: 140.6,
        height: 36.62
    },
    container: {
        height: headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: theme['light'].colors.tertiary,

    },
    headerStyle: {
        backgroundColor: theme['light'].colors.tertiary,
        paddingVertical: 10,
        position: 'relative',
        zIndex: 1
    },
    headerTransparentStyle: {
        backgroundColor: 'transparent',
    },
    headerLight: {
        color: theme['light'].colors.tertiary,
    },
    headerCartLight: {
        borderColor: 'rgba(227, 227, 224, 0.2)',
        backgroundColor: 'rgba(227, 227, 224, 0.1)',
    },
    headerTitleStyle: {
        color: theme['light'].colors.fontColor,
        fontFamily: theme.font.medium,
        fontSize: 24,
        lineHeight: 24,
        marginTop: 3,
        marginHorizontal: 15,
        flex: 1,
        textAlign: 'center',
    },
    headerButton: {},
    headerButtonIcon: {
        fontSize: 24,
        color: theme['light'].colors.primary,
    },
    otherOptions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    otherOptionsButtonSpace: {
        marginRight: 20
    },
    lightColor: {
        color: theme['light'].colors.tertiary
    },
    lightBackgroundColor: {
        backgroundColor: theme['light'].colors.tertiary
    },


    headerCartButton: {
        width: 45,
        height: 45,
        borderRadius: 45,
        borderWidth: 1,
        borderColor: theme['light'].colors.lightBorderColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -25,
    },
    headerCartBadge: {
        backgroundColor: theme['light'].colors.primary,
        minWidth: 12,
        minHeight: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 8,
        right: 5,
        zIndex: 1,
        padding: 3
    },
    headerCartBadgeText: {
        fontSize: 8,
        color: theme['light'].colors.tertiary,
        fontFamily: theme.font.regular
    },
    headerCartButtonIcon: {
        marginTop: 6,
        marginLeft: -5,
        fontSize: 24,
        color: theme['light'].colors.primary,
    }
});

export default styles
