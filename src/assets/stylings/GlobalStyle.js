import {StyleSheet} from 'react-native';
import {themes as theme, themes} from "../../theme/colors";

export default StyleSheet.create({

    fullContainer: {
        flex: 1,
        backgroundColor: themes['light'].colors.tertiary,
    },

    //input style
    inputContainer: {
        marginBottom: 30,
    },
    inputLabel: {
        fontSize: 18,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.regular,
        
    },
    inputSubLabel: {
        fontSize: 14,
        fontFamily: themes.font.regular,
        color: themes['light'].colors.lightGray,
        marginTop: 5,
        textAlign: 'left',
    },
    inputStyle: {
        fontSize: 16,
        color: themes['light'].colors.lightGray,
        

        fontFamily: themes.font.regular,
        flex: 1,
        paddingHorizontal: 0,
        minHeight: 50,
    },
    inputTextStyle: {
        fontSize: 16,
        fontFamily: themes.font.regular,
        color: themes['light'].colors.fontColor,
        textAlign: 'left'
    },
    inputInnerContainer: {
        position: 'relative',
        borderBottomWidth: 1,
        borderColor: themes['light'].colors.lightenGray,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 50,
    },

    inputRightIconButton: {
        padding: 5,
        borderRadius: 100,
        marginRight: 10
    },

    inputLeftIconButton: {
        padding: 5,
        borderRadius: 100,
        marginLeft: 10,
    },

    inputIconButton: {
        zIndex: 1,
        padding: 5,
        marginLeft: 10,
    },
    inputIcon: {
        fontSize: 16,
        color: themes['light'].colors.gray3
    },

    inputRightButton: {
        paddingHorizontal: 15,
        marginRight: 3,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    inputRightButtonText: {
        fontSize: 12
    },

    errorTextStyle: {
        color: themes['light'].colors.danger,
        fontFamily: themes.font.regular,
        marginTop: 10,
        fontSize: 16,
        textAlign: 'left'
    },
    lastInput: {
        marginBottom: 10
    },

    countryView: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryViewLoading: {
        color: theme['light'].colors.primary,
    },
    countryViewImage: {
        width: 26,
        height: 16,
        resizeMode: 'contain',
    },
    countryViewText: {
        color: theme['light'].colors.fontColor,
        fontFamily: theme.font.regular,
        fontSize: 14,
        marginLeft: 10
    },
    countryViewDropDownIcon: {
        fontSize: 12,
        color: theme['light'].colors.lightenGray,
        marginLeft: 10
    },

    listHeader: {
        marginHorizontal: 20,
    },

    listHeaderInputContainer: {
        marginTop: 20,
        marginBottom: 10
    },

    // listHeaderInputStyle: {
    //     backgroundColor: themes['light'].colors.tertiary
    // },
    listHeaderInputInnerContainer: {
        backgroundColor: themes['light'].colors.tertiary,
        borderColor: theme['light'].colors.lightBorderColor,
        borderWidth: 1,
        borderRadius: 25
    },
    listHeaderInputStyle: {
        paddingLeft: 15
    },
    listHeaderInputIconStyle: {
        fontSize: 24,
        color: themes['light'].colors.primary,
    },

    listHeaderButtonContainer: {
        paddingTop: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: themes['light'].colors.lighten,
        marginHorizontal: -30,
        paddingHorizontal: 30
    },
    listHeaderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    listHeaderButtonIcon: {
        fontSize: 12,
        color: themes['light'].colors.primary,
        marginRight: 10
    },
    listHeaderButtonText: {
        fontSize: 14,
        fontFamily: themes.font.bold,
        color: themes['light'].colors.primary,
    },

    list: {
        paddingHorizontal: 30,
        paddingBottom: 50,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: themes['light'].colors.gray3,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 20
    },
    listItemIconContainer: {},
    listItemIcon: {},
    listItemText: {
        flex: 1,
        marginLeft: 20,
        fontSize: 14,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.regular,
        textAlign: 'left'
    },

    pageTitle: {
        fontSize: 20,
        fontFamily: themes.font.bold,
        color: themes['light'].colors.secondary,
        marginVertical: 15,
        marginHorizontal: 30,
        paddingRight: 30,
        textAlign: 'left'
    },
    listSecondHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 20,
        marginBottom: 20
    },

    listSecondHeaderRightImage: {
        width: 100,
        height: 12,
        marginRight: 30,
    },

    listTitle: {
        fontSize: 14,
        fontFamily: themes.font.bold,
        color: themes['light'].colors.fontColor,
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 30,
        textAlign: 'left'
    },

    listFooterButton: {
        marginHorizontal: 30,
        marginVertical: 20
    },

    headerInfoContainer: {
        backgroundColor: theme['light'].colors.primary,
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1
    },

    marginHorizontal_0: {marginHorizontal: 0},
    paddingHorizontal_0: {paddingHorizontal: 0},
    errorBorder: {
        borderColor: themes['light'].colors.danger,
    },


    cardListTitle: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        fontSize: 18,
        fontFamily: themes.font.regular,
        color: themes['light'].colors.secondary,
    },
    cardListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginVertical: 15,
        backgroundColor: themes['light'].colors.tertiary,
        shadowColor: theme['light'].colors.primary,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 6,
        borderRadius: 5
    },
    cardListItemIcon: {
        fontSize: 28,
        marginRight: 15,
        color: themes['light'].colors.primary,
    },
    cardListItemText: {
        fontSize: 14,
        fontFamily: themes.font.regular,
        color: themes['light'].colors.text,
        textAlign: 'left'
    },

    twoInputsView: {
        flexDirection: 'row',
        marginHorizontal: -15
    },
    twoInputsViewContainer: {
        flex: 1,
        marginHorizontal: 15
    },

    listItemActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemActionButton: {
        padding: 5,
        marginLeft: 10,
        backgroundColor: themes['light'].colors.tertiary,
    },
    listItemActionButtonIcon: {
        fontSize: 16,
        color: themes['light'].colors.secondary,
    },

    // redButton: {
    //     backgroundColor: 'rgba(238, 59, 53, 0.2)',
    // },
    // redButtonIcon: {
    //     color: 'red',
    // },


    bottomHalfModalSafeArea: {
        backgroundColor: 'transparent',
        flex: 1
    },

    bottomHalfModal: {
        justifyContent: 'flex-end',
        marginBottom: -20,
        marginHorizontal: -20,
    },
    bottomHalfModalContainer: {
        borderRadius: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 40
    },
    bottomHalfModalTitle: {
        fontSize: 16,
        fontFamily: themes.font.bold,
        color: themes['light'].colors.fontColor,
        marginTop: 15,
    },
    bottomHalfModalSubTitle: {
        fontSize: 14,
        marginTop: 10,
        fontFamily: themes.font.regular,
        color: themes['light'].colors.gray4,
    },
    bottomHalfModalLoadingView: {
        paddingVertical: 15
    },

    listSecondHeader2: {
        marginBottom: 15
    },
    listSecondHeaderTitle: {
        fontSize: 16,
        fontFamily: themes.font.bold,
        color: themes['light'].colors.secondary,
    },

    bottomView: {
        paddingVertical: 25,
    },

    toggleView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    toggleViewText: {
        flex: 1,
        marginRight: 15,
        fontSize: 14,
        fontFamily: themes.font.regular,
        color: themes['light'].colors.fontColor,
        textAlign: 'left'
    },

    margin_top_15: {
        marginTop: 15
    },

    margin_horizontal_minus_30: {
        marginHorizontal: -30
    },
    margin_horizontal_30: {
        marginHorizontal: 30
    },

    countryName: {
        fontSize: 14,
        fontFamily: themes.font.bold,
        color: themes['light'].colors.fontColor,
    },

    swipeUpView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    swipeUpViewText: {
        fontSize: 14,
        fontFamily: themes.font.bold,
        color: themes['light'].colors.secondary5,
    },
    swipeUpViewIcon: {
        fontSize: 12,
        color: themes['light'].colors.secondary5,
        marginLeft: 10
    },

    centerModalLogoKSContainer: {
        alignItems: 'center',
        marginBottom: 15
    },
    centerModalLogoKS: {
        width: 200,
        height: 50
    },
    centerModalCenterView : {
        backgroundColor: themes['light'].colors.overlay,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    centerModalCenterViewContainerScroll: {
        flexGrow: 1,
        justifyContent: 'center',
    },

    centerModalCenterVectorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerModalCenterVector: {
        width: 100,
        height: 100
    },

    centerModalCenterViewTitle: {
        fontSize: 16,
        fontFamily: themes.font.bold,
        color: themes['light'].colors.fontColor,
        textAlign: 'center',
        marginBottom: 25,
        marginTop: 15,
        lineHeight: 20
    },
    centerModalCenterViewSubTitle: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: themes.font.regular,
        color: themes['light'].colors.fontColor,
        textAlign: 'center',
    },
    centerModalCenterViewBody: {
        marginBottom: 30
    },
    centerModalCenterViewContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 50,
        borderRadius: 15,
        backgroundColor: themes['light'].colors.tertiary,
        shadowColor: theme['light'].colors.primary,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 6,
        position: 'relative'
    },
    centerModalCenterViewButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5
    },
    centerModalCenterViewButtonIcon: {
        fontSize: 20,
        color: themes['light'].colors.gray8,
    },
    topTabMainContainer: {
        flex: 1
    },
    topTabBarLabelStyle: {
        fontSize: 12,
        fontFamily: themes.font.regular,
    },
    topTabBarStyle: {
        borderTopWidth: 1,
        borderColor: theme['light'].colors.gray2,
    },
    topTabBarIndicatorStyle: {
        backgroundColor: themes['light'].colors.secondary,
    },

    flex_1: {
        flex: 1
    },
    customTabContainer: {
        flexDirection: 'row',
        backgroundColor: themes['light'].colors.tertiary,
        borderTopWidth: 1,
        borderColor: theme['light'].colors.gray2,
    },
    customTabItem: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: theme['light'].colors.gray2,
    },
    activeCustomTabItem: {
        borderBottomWidth: 2,
        borderColor: theme['light'].colors.secondary,
    },
    customTabItemText: {
        fontSize: 14,
        fontFamily: themes.font.bold,
        color: themes['light'].colors.fontColor,
    },
    activeCustomTabItemText: {
        color: themes['light'].colors.secondary,
    },



    searchInput: {
        marginTop: 30,
        marginBottom: 10
    },
    searchInputInnerContainer: {
        backgroundColor: theme['light'].colors.secondary3,
        borderBottomWidth: 0,
        borderRadius: 70,
        minHeight: 50,

    },
    searchInputIcon: {
        color: theme['light'].colors.primary,
        fontSize: 26
    },
    searchInputStyle: {
        color: theme['light'].colors.primary
    },
});
