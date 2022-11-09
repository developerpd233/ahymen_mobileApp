import {StyleSheet} from 'react-native';
import {themes as theme, themes} from "../../theme/colors";

export default StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: themes['light'].colors.lighten
    },
    lastListItem: {
        borderTopWidth: 0,
    },
    listItemIcon: {
        width: 29,
        height: 29,
        overflow: 'hidden',
        marginRight: 20
    },
    listItemIconText: {
        fontSize: 29
    },
    listItemIconImage: {
        width: '100%',
        height: '100%'
    },

    listItemText: {
        fontSize: 14,
        fontFamily: themes.font.regular,
        color: themes['light'].colors.fontColor,
        lineHeight: 16,
        textAlign: 'left',
        flex: 1,
        marginRight: 10
    },
    listItemLastText: {
       flex: 0,
        marginRight: 0
    },
});
