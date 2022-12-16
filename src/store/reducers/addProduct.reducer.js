const reducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT': {
        return { ...state, products: action.products };
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  