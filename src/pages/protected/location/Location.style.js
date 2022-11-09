import {StyleSheet} from "react-native";
import {themes} from "../../../theme/colors";

const Styles = StyleSheet.create({


    container: {
        paddingHorizontal: 20
    },

    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        height: 183,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 20,
        backgroundColor: themes['light'].colors.primary
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },

    buttonContainer: {
      alignItems: 'center'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginVertical: 5,
    },
    buttonIcon: {
        fontSize: 18,
        color: themes['light'].colors.primary,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
        color: themes['light'].colors.fontColor,
        fontFamily: themes.font.medium
    },

});
export default Styles
