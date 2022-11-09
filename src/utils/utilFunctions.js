import Toast from "react-native-toast-message";

export const showTowst = (type, text1, text2) => {
    return Toast.show({
        type: type,
        text1: text1,
        text2: text2,
    });
};
