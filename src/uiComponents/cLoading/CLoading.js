import  React ,{useState}from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './CLoading.style';
import {themes} from "../../theme/colors";
import {CText} from "../index";
import '../../utils/i18n/lan';
import {useTranslation} from 'react-i18next';

const CLoading = ({style, theme, loading, text, transparent = false}) => {
    const {t, i18n} = useTranslation();
    
    const [currentLanguage,setLanguage] = useState('ar');
    text = text === 'hide' ? '' : text ? text : t("Please_wait");
    let color =  transparent ? themes['light'].colors.primary : themes['light'].colors.tertiary;
    if(loading) {
        return (
            <View style={[styles.wrapper,
                transparent && {backgroundColor: 'transparent'},
                style]}>
                <ActivityIndicator style={styles.loading} size="large"
                                   color={color} />
                {text ? <CText style={[styles.loadingText, {color: color}]}>{text}</CText> : null}
            </View>
        );
    } else {
        return null
    }

};

CLoading.defaultProps = {
    loading: false,
    color: themes['light'].colors.primary
};

export default React.memo(CLoading);
