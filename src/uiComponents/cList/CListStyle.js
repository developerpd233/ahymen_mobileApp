import {StyleSheet} from 'react-native';
import {themes as theme, themes} from "../../theme/colors";
import {getLayoutDirection} from "../../utils/methods";

export default StyleSheet.create({
    listContainer: {
        flex: 1,
        position: 'relative'
    },
    // listItem: {
    //     flexDirection: 'row',
    //     alignItems:'center',
    //     paddingVertical: 20,
    //     paddingHorizontal: 30,
    //     borderBottomWidth: 1,
    //     borderBottomColor: themes['light'].colors.lighten
    // },
    // lastListItem: {
    //     borderBottomWidth: 0,
    // },
    // avatar: {
    //     width: 42,
    //     height: 42,
    //     borderRadius: 42,
    //     backgroundColor: theme['light'].colors.secondary7,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginRight: 20
    // },
    // avatarText: {
    //     fontSize: 18,
    //     fontFamily: themes.font.bold,
    //     color: theme['light'].colors.secondary,
    //     marginTop: 3
    // },

    // listItemIcon: {
    //     width: 26,
    //     height: 26,
    //     borderRadius: 26,
    //     overflow: 'hidden',
    //     marginRight: 20
    // },
    // listItemIconImage: {
    //     width: '100%',
    //     height: '100%'
    // },
    // listItemContent: {
    //   flex: 1
    // },
    // listItemText: {
    //     fontSize: 14,
    //     fontFamily: themes.font.regular,
    //     color: themes['light'].colors.dark,
    //     lineHeight: 16,
    //     textAlign: 'left'
    // },
    // listItemSubText: {
    //     fontSize: 12,
    //     fontFamily: themes.font.regular,
    //     color: themes['light'].colors.gray9,
    //     marginTop: 5,
    //     lineHeight: 18,
    //     textAlign: 'left'
    // },

    listFooter: {
        paddingTop: 20,
        paddingBottom: 0,
    },

    // listItemRightIcon: {
    //     color: themes['light'].colors.secondary,
    //     fontSize: 10,
    //     marginLeft: 10,
    //     transform: [
    //         { scaleX: getLayoutDirection() ? -1 : 1 }
    //     ]
    // },

    listItem: {
        flex: 1,
    },

    listItemView: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: themes['light'].colors.lightBorderColor,
        backgroundColor: themes['light'].colors.tertiary,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.15,
        shadowRadius: 30,
        elevation: 20,
    },
    listItemImageContainer: {
        width: '100%',
        maxHeight: 132,
        overflow: 'hidden',
        borderRadius: 8,
        // marginTop: -1
    },
    listItemImage: {
        width: '100%',
        height: '100%',
    },
    listItemContent: {
        paddingVertical: 12,
        paddingHorizontal: 0,
        
    },
    listItemTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: themes.font.medium,
        color: themes['light'].colors.fontColor,
    },
    listItemSubTitle: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: themes.font.medium,
        color: themes['light'].colors.primary,
        marginTop: 5
    },

    horizontalItem: {
        flexDirection: 'row',
    },
    horizontalItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    horizontalItemImageContainer: {
        width: 65,
        height: 66,
        marginRight: 15,
    },
    horizontalItemContent: {
        flex: 1,
        alignItems: 'flex-start',
        marginRight: 15
    },

    listItemRightIcon: {
        color: themes['light'].colors.primary,
        fontSize: 14,
        marginRight: 15
    },

    listItemOrderNumber: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: themes.font.regular,
        color: themes['light'].colors.lightGray,
        marginBottom: 5
    },


    listItemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        marginTop: 5
    },
    listItemButtonIcon: {
        fontSize: 16,
        color: themes['light'].colors.primary,
        marginRight: 5
    },
    listItemButtonText: {
        fontSize: 16,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.medium
    },
});
