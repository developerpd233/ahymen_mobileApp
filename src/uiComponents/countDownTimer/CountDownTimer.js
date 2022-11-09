import React, {memo, useEffect} from 'react';
import {View} from 'react-native';
import {CText} from '../index';
import Styles from './CountDownTimer.style';
import events from "../../utils/events";

function CountDownTimer(props) {

    const {text = 'Request a new code in', initialValue = 60, children, restart} = props;
    const [time, setTime] = React.useState(initialValue);
    const timerRef = React.useRef(time);

    var timerInterval;

    const start = (value) => {
        timerInterval = setInterval(() => {
            value -= 1;
            if (value < 0) {
                clearInterval(timerInterval);
            } else {
                setTime(value);
            }
        }, 1000);
    };

    useEffect(() => {
        let e = events.addEventListener("restartOTPTimer", (res) => {
            clearInterval(timerInterval);
            start(initialValue);
        });
        return () => {
            events.removeListener('restartOTPTimer', e);
        }
    }, []);

    useEffect(() => {
        start(initialValue);
        return () => {
            clearInterval(timerInterval);
        };
    }, []);

    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor((seconds % (3600 * 24)) / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + 'Day' : '';
        var hDisplay = h > 0 ? h + 'hour' : '';
        var mDisplay = m > 0 ? m + ' minute ' : '';
        var sDisplay = s > 0 ? s + ' seconds ' : '';
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    return <View style={Styles.timeContainer}>
        {time ? <View style={Styles.timeInnerContainer}>
            <CText style={Styles.timeContainerText}> {text} </CText>
            <CText style={[Styles.timeContainerText, Styles.timeContainerTextBlue]}>
                {secondsToDhms(time)}
            </CText>
        </View> : children}
    </View>
}

export default memo(CountDownTimer)
