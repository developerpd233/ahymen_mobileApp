import * as Yup from 'yup';

const scheme = Yup.object().shape({
    name: Yup.string().required('Please enter name'),
    address: Yup.string().required('Please enter address'),
    postalCode: Yup.string().required('Please enter pincode'),

});

export default scheme;
