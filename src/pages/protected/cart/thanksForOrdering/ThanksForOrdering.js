import React from "react";
import {View} from "react-native";
import {CButton, CText, ProgressiveImage, CModal} from "../../../../uiComponents";
import GlobalStyle from "../../../../assets/stylings/GlobalStyle";
import Style from "./ThanksForOrdering.style";

function ThanksForOrdering(props) {

    const {loading, onClose, isOpen, selected} = props;



    return (
        <CModal animationType="fade"
                transparent={true}
                centerView={true}
                isOpen={isOpen}
                onRequestClose={() => onClose()}>
            <View style={[GlobalStyle.centerModalCenterViewContainer]}>

               <View style={[GlobalStyle.centerModalCenterVectorContainer]}>
                   <ProgressiveImage
                       style={Style.centerModalCenterVector}
                       source={require('../../../../assets/images/thanks_for_ordering_vector.png')}/>
               </View>


                <View style={[GlobalStyle.centerModalCenterViewBody, Style.contentBody]}>

                    <CText style={Style.title}>Thanks for ordering</CText>
                    <CText style={Style.subTitle}>Your order has been placed</CText>

                </View>


                <CButton buttonStyle={Style.bottomButton}
                         loading={loading}
                         onPress={() => onClose()}
                         title={'Go to home'}/>

                 <View style={Style.orContainer}>
                    <CText style={Style.orContainerText}>- OR -</CText>
                </View>

                <CButton title={'Track Order'}
                         type={'outline'}
                         loading={loading}
                         onPress={() => onClose()}/>

            </View>
        </CModal>
    )
}

export default React.memo(ThanksForOrdering)
