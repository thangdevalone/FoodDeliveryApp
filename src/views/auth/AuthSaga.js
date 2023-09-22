import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, delay, fork, put, takeLatest } from "redux-saga/effects";
import authApi from "../../api/authApi";
import { StorageKeys } from "../../constants";
import { authActions } from "./AuthSlice";

function* handleLogin(action) {
  try {
    const res = yield call(authApi.login, action.payload)
    const user = res.data
    yield put(authActions.loginSuccess(user))
    yield call(AsyncStorage.setItem, StorageKeys.TOKEN, user.token);
    yield call(AsyncStorage.setItem, StorageKeys.USER, JSON.stringify(user));


  } catch (error) {
    console.log(error)
    // Handle the error here
    yield put(authActions.loginFailed())
    yield delay(100);
    yield put(authActions.resetAction());
  }
}
function* handleRegister(action) {
  try {
    const res = yield call(authApi.register, action.payload)
    const user = res.data
    yield put(authActions.registerSuccess(user))
    yield call(AsyncStorage.setItem, StorageKeys.TOKEN, user.token);
    yield call(AsyncStorage.setItem, StorageKeys.USER, JSON.stringify(user));

  } catch (error) {
    // Handle the error here
    yield put(authActions.registerFailed())
    yield delay(100);
    yield put(authActions.resetAction());
  }
}
function* handleLogout() {
  yield call(AsyncStorage.removeItem, StorageKeys.TOKEN);
    yield call(AsyncStorage.removeItem, StorageKeys.USER);
}


export function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin)
  yield takeLatest(authActions.register.type, handleRegister)
  yield takeLatest(authActions.logout.type, handleLogout)
}
