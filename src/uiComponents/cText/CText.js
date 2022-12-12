import React  from 'react';
import { Text, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { themes } from '../../theme/colors';

Text.defaultProps = {
    ...(Text.defaultProps || {}),
    allowFontScaling: false,
};

const CText = (props) => {
    const reduxState = useSelector(({language}) => {
    return{
     language:language?.language?.lan
    }
});
const myLan = reduxState.language
console.log('my--Data', myLan)
    return <Animated.Text
        allowFontScaling={false}
        {...props} style={[props.style, {fontFamily:myLan === 'en' ? themes.font.regular : themes.font2.regular }]}>
        {props.children}
    </Animated.Text>
};

export default React.memo(CText);
