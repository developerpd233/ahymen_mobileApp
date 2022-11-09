import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
// import Validations from './Validations';
import {View} from 'react-native';
import {CButton, CInput, CText, DateTimePicker} from '../../../uiComponents';
import Styles from "../profile/Profile.style";
import GlobalStyle from "../../../assets/stylings/GlobalStyle";
import Validations from "./Validations";

function CForm(props) {

    const {submit, loading} = props;

    const form = useRef(null);
    const cardNumber = useRef(null);
    const nameOnCard = useRef(null);
    const expiry = useRef(null);
    const cvv = useRef(null);

    return (
        <Formik
            innerRef={form}
            onSubmit={(values) => submit(values)}
            initialValues={{}}
            validationSchema={Validations}
        >
            {({handleChange, values, handleSubmit, errors,setFieldValue}) => {
                return (
                    <View>
                        <CInput
                            ref={cardNumber}
                            inputLabel={'Card Number'}
                            placeholder={' 0 0 0 0  - 0 0 0 0 - 0 0 0 '}
                            value={values.cardNumber}
                            onChangeText={handleChange('cardNumber')}
                            error={errors.cardNumber}
                            returnKeyType="next"
                            onSubmitEditing={() => nameOnCard.current.focus()}
                        />

                        <CInput
                            ref={nameOnCard}
                            inputLabel={'Card holder name'}
                            placeholder={'Ayham'}
                            value={values.nameOnCard}
                            onChangeText={handleChange('nameOnCard')}
                            error={errors.nameOnCard}
                            returnKeyType="next"
                            onSubmitEditing={() => expiry.current.focus()}
                        />

                       <View style={GlobalStyle.twoInputsView}>
                           <CInput
                               ref={expiry}
                               inputLabel={'Expiry'}
                               placeholder={'MM/YY'}
                               value={values.expiry}
                               onChangeText={handleChange('expiry')}
                               error={errors.expiry}
                               returnKeyType="next"
                               inputContainerStyle={GlobalStyle.twoInputsViewContainer}
                               onSubmitEditing={() => cvv.current.focus()}
                           />

                           <CInput
                               ref={cvv}
                               inputLabel={'CVV'}
                               placeholder={'0000'}
                               value={values.cvc}
                               onChangeText={handleChange('cvc')}
                               error={errors.nameOnCard}
                               returnKeyType="next"
                               inputContainerStyle={GlobalStyle.twoInputsViewContainer}
                               // onSubmitEditing={() => pincode.current.focus()}
                           />
                       </View>

                        <CButton title={'Save'}
                                 loading={loading}
                                 onPress={() => handleSubmit()}/>
                    </View>
                );
            }}
        </Formik>
    );
}
export default memo(CForm);
