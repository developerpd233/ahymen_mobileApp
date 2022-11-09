import * as Yup from 'yup';

const scheme = Yup.object().shape({
    otp: Yup.string().required('Please enter your OTP.')
        .matches(/^[0-9]*$/, 'Please enter valid 4-Digit code.')
        .length(4, 'OTP has to be exactly 4-Digit!')
});

export default scheme;
