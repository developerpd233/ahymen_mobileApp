import React from "react";
import { View } from "react-native";
import styles from "./CEmptyStyle";
import {ProgressiveImage, CText} from '../index';

function CEmpty({text, style, subText, icon}) {
    return (
        <View style={[styles.container, style]}>
            <ProgressiveImage
                style={styles.icon}
                source={icon ? icon : require('../../assets/images/empty.png')}/>
            {text ? <CText style={styles.text}>{text}</CText> : null}
            {subText ? <CText style={styles.subText}>{subText}</CText> : null}
        </View>
    );
}

CEmpty.defaultProps = {
    style: {},
    text: 'Empty'
};

export default React.memo(CEmpty)
