import * as Yup from 'yup';

const scheme = Yup.object().shape({
    cardNumber: Yup.string()
        .label('Card number')
        .max(16)
        .required(),
    cvc: Yup.string()
        .label('CVC')
        .min(3)
        .max(4)
        .required(),
    nameOnCard: Yup.string()
        .label('Name on card')
        .required(),
    expiry: Yup.string()
        .label('Expiry')
        // .min(5)
        // .max(2)
        .required(),
});

export default scheme;
