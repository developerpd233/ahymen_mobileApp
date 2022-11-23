const addProduct = (payload) => {
  payload.quantity = payload.quantity ? payload.quantity : 1
  return {
    type: 'ADD_TO_CART',
    payload
  }
}

const removeProduct = (payload) => {
  return {
    type: 'REMOVE_CART',
    payload
  };
};

const removeSpecificProduct = (payload) => {
  return {
    type: 'REMOVE_SPECIFIC_CART',
    payload
  };
};

const removeAllProduct = () => {
  return {
    type: 'REMOVE_ALL_CART',
  };
};

export { addProduct, removeProduct  ,removeSpecificProduct, removeAllProduct};
  