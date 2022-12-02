const setLanguage = language => {
    let messages = {};
    switch (language) {
      case 'ar':
        messages = Object.assign(messages, require(`../../i18n/ar.json`));
        break;
      default:
      case 'en':
        messages = Object.assign(messages, require(`../../i18n/en.json`));
        break;
    }
    return messages;
  };
  
  const initialState = {
    locale: 'ar',
    messages: setLanguage('ar')
  };
  
  const intlData = (state = initialState, action) => {
    if (action === undefined) return state;
    switch (action.type) {
      case 'UPDATE_LANGUAGE':
        return {
          locale: action.language,
          messages: setLanguage(action.language)
        };
      default:
        return state;
    }
  };
  export default intlData;