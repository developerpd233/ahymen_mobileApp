import React from 'react';
import {Modal, ScrollView, View} from 'react-native';
import {Container} from "../../containers";
import GlobalStyle from "../../assets/stylings/GlobalStyle";

function CModal(props) {
    const { isOpen = false, showOnlyChildren = false, children, headerProps, close, transparent = true, centerView = false, animationType = 'slide' } = props;
    return (
        <Modal animationType={animationType}
               transparent={transparent}
               visible={isOpen} onRequestClose={close}>
            {!showOnlyChildren ? centerView ?
                <View style={GlobalStyle.centerModalCenterView}>
                    <ScrollView showsVerticalScrollIndicator={false}
                                contentContainerStyle={GlobalStyle.centerModalCenterViewContainerScroll}>
                        {children}
                    </ScrollView>
                </View>
                : <Container edges={['top', 'left', 'right', 'bottom']}
                             scrollView={true} headerProps={headerProps}>
                {children}
            </Container> : children}
        </Modal>
    );
}

export default React.memo(CModal);
