const reducer = (state = {}, action) => {
    switch (action.type) {
      case 'CHANGE_LANGUAGE': {
        return { ...state, language: action.val };
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  