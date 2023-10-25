// reducers/index.js

import { combineReducers } from 'redux';
import authReducer from '../views/auth/AuthSlice';
import appReducer from '../components/AppSlice';
import cartReducer from '../views/Cart/CartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  app:appReducer,
  cart:cartReducer

  // ...other reducers
});

export default rootReducer;
