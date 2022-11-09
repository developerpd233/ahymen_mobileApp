const initialState = [];

const cartItem = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const cheeck = state.find(el => el.ProductId == action.payload.ProductId)
      if (cheeck) {
        return state.map(val => {
          if (val.ProductId == action.payload.ProductId) {

            const obj = { ...val, quantity: val.quantity + 1 }
            return obj
          }
          return val
        })
      }
      return [...state, action.payload]
      case 'REMOVE_SPECIFIC_CART':
        
        return state.filter((el) => el.ProductId !== action.payload.ProductId );

    case 'REMOVE_CART':
      const data = state.map(val => {
        if (val.ProductId == action.payload.ProductId) {
          var obj = { ...val, quantity: val.quantity - 1 }
          return obj
        }
        return val
      })
      return data.filter(val => !!val.quantity)

     
      
    case 'REMOVE_ALL_CART': {
        return state = [];
      }  
  }
  return state
}



export default cartItem;