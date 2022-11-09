import {StyleSheet} from 'react-native';
import {themes as theme, themes} from "../../theme/colors";

export default StyleSheet.create({
    container: {
        backgroundColor: theme['light'].colors.secondary,
    },
    sliderContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    sliderCard: {
        borderRadius: 22,
        backgroundColor: theme['light'].colors.tertiary,
        shadowColor: theme['light'].colors.fontColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
    },

    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },


    slideContent: {
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 65
    },
    slideTitle: {
        fontSize: 28,
        fontFamily: themes.font.medium,
        textAlign: 'center',
        color: theme['light'].colors.fontColor,
    },
    slideImage: {
        width: 236.52,
        height: 263,
        marginVertical: 40,
    },
    slideSubTitle: {
        fontSize: 18,
        fontFamily: themes.font.regular,
        textAlign: 'center',
        color: theme['light'].colors.lightGray,
        marginBottom: 25
    },


    sliderCardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingBottom: 35,
    },

    sliderCardFooterButton: {
    },
    sliderCardFooterButtonText: {
        fontSize: 18,
        fontFamily: themes.font.regular,
        color: theme['light'].colors.fontLowColor,
    },

    paginationWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },

    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        marginHorizontal: 5,
        backgroundColor: theme['light'].colors.secondary
    },
    paginationActiveDot: {
        width: 27,
        height: 8,
        borderRadius: 8,
        backgroundColor: theme['light'].colors.primary
    },
    sliderDotContainer: {
        justifyContent: 'center',
        paddingVertical: 15,
        position: 'relative',
        top: 0
    },


});
