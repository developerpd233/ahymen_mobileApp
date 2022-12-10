import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ar from './ar.json';

i18n.use(initReactI18next).init({
lng: 'ar',
fallbackLng: 'ar',
resources: {
	ar: ar,
	en: en,
},
interpolation: {
	escapeValue: false // react already safes from xss
}
});

export default i18n;
