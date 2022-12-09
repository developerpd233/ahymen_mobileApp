import React, { Fragment } from "react";
import {
    View,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icons from "../../assets/icons/CustomIcon";
import GlobalStyle from "../../assets/stylings/GlobalStyle";
import { themes } from "../../theme/colors";
import ProgressiveImage from "../progressiveImage/ProgressiveImage";
import MaskInput from "react-native-mask-input";
import CText from "../cText/CText";
import {useSelector} from "react-redux"
TextInput.defaultProps = {
    ...(TextInput.defaultProps || {}),
    allowFontScaling: false,
};

const CInput = React.forwardRef((props, ref) => {
    const {
        inputContainerStyle,
        inputInnerContainerStyle,
        inputLabel,
        inputLabelStyle,
        inputSubLabel,
        inputSubLabelStyle,
        type,
        onPress,
        selectedCountry,
        textStyle,
        disabled,
        leftIconName,
        toggleLeftIconFunc,
        leftIconButtonStyle,
        iconStyle,
        inputErrorStyle,
        error,
        toggleRightIconFunc,
        rightIconButtonStyle,
        rightIconName,
        rightButton,
        style,
        value,
        countryView,
        countryViewLoading = false,
        placeholder,
        secureTextEntry = false,
    } = props;
    const reduxState = useSelector(({ auth ,language}) => {
        return {
            loading: false,
            user: auth.user,
            language:language?.language?.lan
        };
    });
  const languageStyle = reduxState.language;
    const renderLabel = () => {
        return (
            <CText style={[{ ...GlobalStyle.inputLabel, ...inputLabelStyle }, {textAlign:languageStyle == 'en'? 'left' : 'right',}]}>
                {inputLabel}
            </CText>
        );
    };
    const renderSubLabel = () => {
        return (
            <CText
                style={{ ...GlobalStyle.inputSubLabel, ...inputSubLabelStyle }}
            >
                {inputSubLabel}
            </CText>
        );
    };

    const renderLeftIcon = () => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={toggleLeftIconFunc}
                style={{
                    ...GlobalStyle.inputLeftIconButton,
                    ...leftIconButtonStyle,
                }}
            >
                <AntDesign
                    name={leftIconName}
                    style={{ ...GlobalStyle.inputIcon, ...iconStyle }}
                />
            </TouchableOpacity>
        );
    };

    const renderRightIcon = () => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={toggleRightIconFunc}
                style={{
                    ...GlobalStyle.inputRightIconButton,
                    ...rightIconButtonStyle,
                }}
            >
                <Icons
                    name={rightIconName}
                    style={{ ...GlobalStyle.inputIcon, ...iconStyle }}
                />
            </TouchableOpacity>
        );
    };

    const renderErrorView = () => {
        return (
            <CText
                style={{ ...GlobalStyle.errorTextStyle, ...inputErrorStyle }}
            >
                {error}
            </CText>
        );
    };

    const renderInputView = () => {
        return (
            <MaskInput
                ref={ref}
                maskChar="x"
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={themes["light"].colors.gray4}
                style={[{ ...GlobalStyle.inputStyle, ...style } , {textAlign:languageStyle == 'en'? 'left' : 'right',}]}
                autoCapitalize="none"
                value={value}
                {...props}
            />
        );
    };

    const renderSelectionView = () => {
        return (
            <TouchableOpacity
                style={[
                    { ...GlobalStyle.inputStyle, ...style },
                    { justifyContent: "center" },
                ]}
                onPress={onPress}
            >
                <CText
                    style={[
                        { ...GlobalStyle.inputTextStyle, ...textStyle },
                        !value && { color: themes["light"].colors.gray4 },
                    ]}
                >
                    {value ? value : placeholder}
                </CText>
            </TouchableOpacity>
        );
    };

    const renderCountryView = () => {
        return (
            <TouchableOpacity
                style={{
                    ...GlobalStyle.countryView,
                    ...countryView,
                    ...(error && GlobalStyle.errorBorder),
                }}
                disabled={disabled}
                onPress={onPress}
            >
                {countryViewLoading ? (
                    <ActivityIndicator color="#000080" size={24} />
                ) : (
                    <Fragment>
                        <ProgressiveImage
                            resizeMode={"contain"}
                            style={GlobalStyle.countryViewImage}
                            source={{ uri: selectedCountry?.flags?.png }}
                        />
                        <CText style={GlobalStyle.countryViewText}>
                            {selectedCountry?.detail?.code}
                        </CText>
                        <AntDesign
                            name="caretdown"
                            style={GlobalStyle.countryViewDropDownIcon}
                        />
                    </Fragment>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ ...GlobalStyle.inputContainer, ...inputContainerStyle }}>
            {inputLabel ? renderLabel() : null}
            {inputSubLabel ? renderSubLabel() : null}
            <View
                style={{
                    ...GlobalStyle.inputInnerContainer,
                    ...inputInnerContainerStyle,
                    ...(error && GlobalStyle.errorBorder),
                }}
            >
                {leftIconName ? renderLeftIcon() : null}
                {type === "view" ? renderSelectionView() : renderInputView()}
                {selectedCountry && Object.keys(selectedCountry).length
                    ? renderCountryView()
                    : null}
                {rightIconName ? renderRightIcon() : null}
                {rightButton ? rightButton() : null}
            </View>
            {error ? renderErrorView() : null}
        </View>
    );
});

CInput.defaultProps = {
    inputContainerStyle: {},
    inputLabelStyle: {},
    iconButtonStyle: {},
    inputInnerContainerStyle: {},
    iconStyle: {},
    inputErrorStyle: {},
    toggleIconFunc: () => null,

    toggleRightIconFunc: () => null,
    rightButton: () => null,
    rightIconButtonStyle: {},
    rightIconName: "",

    toggleLeftIconFunc: () => null,
    leftIconButtonStyle: {},
    leftIconName: "",

    inputLabel: "",
    error: "",
};

export default React.memo(CInput);
