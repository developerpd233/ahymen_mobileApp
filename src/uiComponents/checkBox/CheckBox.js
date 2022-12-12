import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {CText} from '../index';
import Style from './CheckBox.style';
import AntDesign from "react-native-vector-icons/AntDesign";

const CheckBox = ({title, value, onChange, disabled, activeOpacity, clickAbleText, clickAbleTextFunc,myStyle2,stylesTitle, containerStyles}) => {
    return (
        <TouchableOpacity  style={[Style.checkBoxContainer, containerStyles]}
                          disabled={disabled}
                          activeOpacity={activeOpacity}
                          onPress={onChange}>
            <View style={[Style.checkBoxView, value && Style.checkedBoxView, myStyle2]}>
                 {value ? <AntDesign style={Style.checkBoxCheck} name="check"/> : null}
            </View>
            <View style={Style.checkBoxTitleContainer}>

                {title || clickAbleText ? <View style={{flexDirection: 'row', flex: 1, flexWrap:'wrap'}}>
                    {title ? <CText style={[Style.checkBoxTitle, stylesTitle]}>{title}</CText> : null}
                    {clickAbleText ? <TouchableOpacity onPress={() => clickAbleTextFunc && clickAbleTextFunc()}>
                        <CText style={[Style.checkBoxTitle, Style.checkBoxSecondTitle]}> {clickAbleText}</CText>
                    </TouchableOpacity>: null}
                </View>: null}
            </View>
        </TouchableOpacity>
    )
};


CheckBox.defaultProps = {
    title: '',
    onChange: () => null,
    activeOpacity: 0.5,
    value: false,
    disabled: false,
};
export default memo(CheckBox);
