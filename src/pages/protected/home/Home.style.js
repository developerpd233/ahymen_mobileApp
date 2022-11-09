import { StyleSheet } from "react-native";
import { themes } from "../../../theme/colors";

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },

    list: {
        marginHorizontal: -10,
        paddingVertical: 20,
    },

    listItem: {
        flex: 1,
    },

    listItemView: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: themes["light"].colors.lightBorderColor,
    },
    listItemImageContainer: {
        width: "100%",
        maxHeight: 132,
        overflow: "hidden",
        borderRadius: 10,
        // marginTop: -1
    },
    listItemImage: {
        width: "100%",
        height: "110%",
    },
    listItemContent: {
        paddingVertical: 12,
        paddingHorizontal: 5,
    },
    listItemTitle: {
        fontSize: 18,
        textAlign: "center",
        fontFamily: themes.font.medium,
        color: themes["light"].colors.fontColor,
    },
    listItemSubTitle: {
        fontSize: 14,
        textAlign: "center",
        fontFamily: themes.font.medium,
        color: themes["light"].colors.primary,
        marginTop: 5,
    },

    horizontalItem: {
        flexDirection: "row",
    },
    horizontalItemView: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    horizontalItemImageContainer: {
        width: 65,
        height: 66,
        marginRight: 15,
    },
    horizontalItemContent: {
        flex: 1,
        alignItems: "flex-start",
        marginRight: 15,
    },

    listItemRightIcon: {
        color: themes["light"].colors.primary,
        fontSize: 18,
        marginRight: 15,
    },
});
export default Styles;
