import React  from 'react';
import FastImage from 'react-native-fast-image'

const ProgressiveImage = (props) =>  {
    return  <FastImage {...props} />
};

export default React.memo(ProgressiveImage);
