import auth from "./reducers/Auth.reducer";
import global from "./reducers/Global.reducer";
import root from "./reducers/Root.reducers";
import cart from "./reducers/Cart.reducer";
import tranaslate from "./reducers/Translation.reducer";
import language from "./reducers/Language.reducer"
import products from "./reducers/addProduct.reducer"

import {combineReducers} from 'redux';


export default combineReducers({
    auth,
    global,
    root,
    cart,
    tranaslate,
    language,
    products
});
