import React, {memo} from 'react';
import {ScrollView, View} from 'react-native';
import Styles from './Container.style';
import {ProgressiveImage, CLoading} from "../../uiComponents";
import {Header, SafeAreaView, ViewContainer} from "../../containers";
import {themes as theme} from "../../theme/colors";


function Container(props) {
    const {children, headerProps = {}, scrollView = false, scrollViewProps, bottomSpace = false,
        edges = [], style, SafeAreaViewStyle, loading, showPattern = false, backgroundColor} = props;

    const renderHeader = () => {
        if(Object.keys(headerProps).length) {
            return <Header {...headerProps} />
        } else {
            return null
        }
    };
    const getEdges = () => {
        if(Object.keys(headerProps).length) {
            return edges?.length ? edges : ['left', 'right', 'bottom']
        } else {
            return edges?.length ? edges : ['top', 'left', 'right', 'bottom']
        }
    };

    const getBackgroundColor = () => {
          if(backgroundColor === 'theme-color') {
              return theme['light'].colors.secondary
          } else {
              return theme['light'].colors.tertiary
          }
    };

    return(
        <ViewContainer style={[Styles.background, {
            backgroundColor: getBackgroundColor(),
            ...(bottomSpace && {paddingBottom: 40}),
        }, style]}>
            {showPattern ? <ProgressiveImage
                style={Styles.backgroundPattern}
                source={require('../../assets/images/background_pattern.png')}
            /> : null}
            {renderHeader()}
            <SafeAreaView edges={getEdges()} style={[Styles.backgroundContainer, SafeAreaViewStyle]}>
                <CLoading loading={loading} />
                <View style={{flex: 1}}>
                    {scrollView ? <ScrollView {...scrollViewProps} scrollEventThrottle={16}>
                        {children}
                    </ScrollView> : children}
                </View>
            </SafeAreaView>

        </ViewContainer>
    )
}
export default memo(Container);
