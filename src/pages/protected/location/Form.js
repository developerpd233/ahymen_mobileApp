import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
// import Validations from './Validations';
import {View} from 'react-native';
import {CButton, CInput, CText} from '../../../uiComponents';
import Styles from "../profile/Profile.style";
import GlobalStyle from "../../../assets/stylings/GlobalStyle";
import Validations from "./Validations";
import {useSelector} from 'react-redux'
function CForm(props) {

    const {submit, loading, form} = props;
    
    const reduxState = useSelector(({ root, auth }) => {
        console.log("🚀 ~ file: Form.js:15 ~ reduxState ~ root", auth)
        return {
            user:auth.user.data.user,
            // loading: auth.sendOtpLoading,
            address: root.addressData,
        };
    });
    const name = useRef(null);
    const address = useRef(null);
    const pincode = useRef(null);

    return (
        <Formik
            enableReinitialize={true}
            innerRef={form}
            onSubmit={(values) => submit(values)}
            initialValues={{
                name:reduxState?.user?.name || '',
                address:reduxState?.address?.address || '' ,
                pincode:reduxState?.address?.postalCode || '' 
            }}
            validationSchema={Validations}
        >
            {({handleChange, values, handleSubmit, errors}) => {
                return (
                    <View style={[Styles.section, {marginHorizontal: 0}]}>
                        <CText style={Styles.sectionTitle}>Add Address</CText>
                        <CInput
                            ref={name}
                            inputLabel={'Name'}
                            placeholder={'Ayham'}
                            value={values.name}
                            onChangeText={handleChange('name')}
                            error={errors.name}
                            returnKeyType="next"
                            onSubmitEditing={() => address.current.focus()}
                        />

                        <CInput
                            ref={address}
                                inputLabel={'Address'}
                            placeholder={'Address for delivery'}
                            value={values.address}
                            onChangeText={handleChange('address')}
                            error={errors.address}
                            multiline={true}
                            inputInnerContainerStyle={{
                                paddingTop: 10,
                                paddingBottom: 15,
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => pincode.current.focus()}
                        />

                        <CInput
                            ref={pincode}
                            inputLabel={'Pincode'}
                            placeholder={'000000'}
                            value={values.postalCode}
                            onChangeText={handleChange('postalCode')}
                            error={errors.postalCode}
                            returnKeyType="next"
                            onSubmitEditing={() => handleSubmit()}
                        />

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
