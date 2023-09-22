// reducers/index.js

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  // app:appReducer,

  // ...other reducers
});

export default rootReducer;
