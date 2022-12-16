import React from "react";
import axios from "axios";
import { Platform, I18nManager } from "react-native";
import Toast from "react-native-toast-message";
import PNF, { PhoneNumberUtil } from "google-libphonenumber";

export const get = (url) => {
    return axios.get(url);
};

export const post = (url, data, config) => {
    return axios.post(url, data, config);
};
export const put = (url, data) => {
    return axios.put(url, data);
};

export const encodeQueryData = (data) => {
    const ret = [];
    for (const d in data) {
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    }
    return ret.join("&");
};

export const handleCommon = (
    type,
    title = "",
    description = "",
    otherOptions
) => {
    Toast.show({
        type: type,
        text1: title,
        text2: description || "",
        ...otherOptions,
    });
};

export const handleError = (description = "", otherOptions) => {
    Toast.show({
        type: "error",
        text1: "Error",
        text2: description || "Something went wrong!",
        topOffset: Platform.OS === "ios" ? 55 : 23,
        ...otherOptions,
    });
};

export const handleSuccess = (
    message = "",
    defaultDescription = "",
    otherOptions
) => {
    Toast.show({
        type: "success",
        text1: "Successfully",
        text2: message || "",
        topOffset: Platform.OS === "ios" ? 55 : 15,
        ...otherOptions,
    });
};

export const MappedElement = ({ data, renderElement, empty }) => {
    if (data && data.length) {
        return data.map((obj, index, array) =>
            renderElement(obj, index, array)
        );
    }
    return empty ? empty() : null;
};

export const getLayoutDirection = () => {
    return I18nManager?.isRTL || false;
};

export const phoneUtil = PhoneNumberUtil.getInstance();

export const validateNumberRegex = async (
    country,
    string,
    { createError, path }
) => {
    if (string) {
        if (/^[0-9]*$/.test(string)) {
            const number = phoneUtil.parse(string, country?.cca2);

            let valid = await phoneUtil.isValidNumber(number);

            if (!valid) {
                return createError({
                    path,
                    message: "Please_enter_valid_phone_number",
                });
            } else {
                return true;
            }
        } else {
            return createError({
                path,
                message: "Please_enter_valid_phone_number",
            });
        }
    } else {
        return createError({
            path,
            message: "Phone_number_is_required",
        });
    }
};
