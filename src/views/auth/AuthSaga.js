import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, delay, fork, put, takeLatest } from "redux-saga/effects";
import authApi from "../../api/authApi";
import { StorageKeys } from "../../constants";
import { authActions } from "./AuthSlice";
import { cartActions } from '../Cart/CartSlice';

function* handleLogin(action) {
  try {
    const res = yield call(authApi.login, action.payload)
    const user = res
    yield put(authActions.loginSuccess(user))
    yield call(AsyncStorage.setItem, StorageKeys.USER, JSON.stringify(user));
  } catch (error) {
    yield put(authActions.loginFailed())
  }
  finally{
    yield delay(100);
    yield put(authActions.resetAction());
  }
}
function* handleRegister(action) {
  try {
    const res = yield call(authApi.register, action.payload)
    const user = res
    
    yield put(authActions.registerSuccess(user))
    yield call(AsyncStorage.setItem, StorageKeys.USER, JSON.stringify(user));

  } catch (error) {
    // Handle the error here
    yield put(authActions.registerFailed())
   
  }
  finally{
    yield delay(100);
    yield put(authActions.resetAction());
  }
}
function* handleLogout() {
  yield put(cartActions.deleteCart())
  yield call(AsyncStorage.removeItem, StorageKeys.USER);
}


export function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin)
  yield takeLatest(authActions.register.type, handleRegister)
  yield takeLatest(authActions.logout.type, handleLogout)
}
