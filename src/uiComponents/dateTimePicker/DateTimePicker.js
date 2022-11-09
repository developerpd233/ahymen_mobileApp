import React, {Fragment, useState} from 'react';
import {TouchableOpacity, View, ActivityIndicator, Appearance} from 'react-native';
import GlobalStyle from "../../assets/stylings/GlobalStyle";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Styles from "./DateTimePickerStyle";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment";
import {themes as theme} from "../../theme/colors";
import CText from "../cText/CText";

export const ErrorView = ({message}) => {
    return message ? <CText style={GlobalStyle.errorTextStyle}>{message}</CText> : null;
};

function DateTimePicker({type, inputContainer, isVisible, value, error, onChange, placeHolder, label, activeOpacity,
                            loading, disabled, minimumDate, maximumDate = null, mode = 'date', hideIcon}) {

    // const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChangeInner = (selectedDate) => {
        onChange(selectedDate);
        setShow(false)
    };

    const toggle = () => {
        setShow(!show)
    };

    return (
        <Fragment>
            <View style={[GlobalStyle.inputContainer, inputContainer]}>
                {label ? <CText style={GlobalStyle.inputLabel}> {label} </CText> : null}
                <TouchableOpacity
                    disabled={disabled}
                    style={[GlobalStyle.inputInnerContainer, Styles.selectContainer, (error && GlobalStyle.errorBorder)]}
                                  activeOpacity={activeOpacity}
                                  onPress={() => toggle()}>
                    {loading ? <ActivityIndicator style={Styles.buttonLoading}/> :
                        hideIcon ? <View style={GlobalStyle.inputIconButton}>
                            <Ionicons name="md-calendar-outline" style={GlobalStyle.inputIcon}/>
                        </View> : null}
                    <CText style={[Styles.selectButtonText,
                        {fontSize: 16},
                        !value && {color: theme['light'].colors.lightGray}]}>
                        {value ? moment(value).format('MM-DD-YYYY') : placeHolder}
                    </CText>
                </TouchableOpacity>
                <ErrorView message={error} />
            </View>
           <DateTimePickerModal
                testID="dateTimePicker"
                isVisible={isVisible || show}
                mode={mode}
                date={value ? value : new Date()}
                onConfirm={onChangeInner}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onCancel={() => toggle()}
                isDarkModeEnabled={false}

            />
        </Fragment>
    );
}

DateTimePicker.defaultProps = {
    label: '',
    value: '',
    placeHolder: 'Tap to select',
    error: '',
    activeOpacity: 0.5,
    isVisible: false,
    loading: false,
    disabled: false,
    onChange: () => null
};

export default DateTimePicker;
