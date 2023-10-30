// reducers/index.js

import { combineReducers } from 'redux';
import authReducer from '../views/auth/AuthSlice';
import appReducer from '../components/AppSlice';
import cartReducer from '../views/Cart/CartSlice';
import orderReducer from '../views/Profile/OrderSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  app:appReducer,
  cart:cartReducer,
  order:orderReducer

  // ...other reducers
});

export default rootReducer;
