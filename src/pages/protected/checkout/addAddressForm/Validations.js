import * as Yup from 'yup';
import { validateNumberRegex } from '../../../../utils/methods';
// import '../../../utils/i18n/lan';
// import { useTranslation } from 'react-i18next';


const scheme = ()=>  Yup.object().shape({
    title: Yup.string().required('Please_enter_title'),
    name: Yup.string().required('Please_enter_name'),
    // address: Yup.string().required('Please_enter_address'),
    // postalCode: Yup.string().required('Please_enter_pincode'),
    // phone: Yup.string().required("Phone_number_is_required"),


});

export default scheme;
