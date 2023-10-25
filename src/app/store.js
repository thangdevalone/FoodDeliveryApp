
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { authSlice } from '../views/auth/AuthSlice';
import { cartSlice } from '../views/Cart/CartSlice';

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist:['auth','cart'],
  migrate: async (state,currentVersion)=>{
    if(state?._persist.version !==currentVersion){
      const newState = {...state,_persist:{...state?._persist,version:currentVersion}}
      newState[authSlice.name]=authSlice.getInitialState()
      newState[cartSlice.name]=cartSlice.getInitialState()
      return newState
    }
    else{
      return state
    }

  },
  version:1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store);

