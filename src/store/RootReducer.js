import auth from "./reducers/Auth.reducer";
import global from "./reducers/Global.reducer";
import root from "./reducers/Root.reducers";
import cart from "./reducers/Cart.reducer";
import {combineReducers} from 'redux';


export default combineReducers({
    auth,
    global,
    root,
    cart
});
