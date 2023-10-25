import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState:{
    logging: false,
    registering: false,
    actionAuth: "No action",
    currentUser: undefined,
  },
  reducers: {
    login(state, action) {
      state.logging = true
      state.actionAuth = "No action"
    },

    loginSuccess(state, action) {
      state.logging = false
      state.actionAuth = "Success"
      state.currentUser = action.payload
    },
    loginFailed(state) {
      state.logging = false
      state.actionAuth = "Failed"
    },
    register(state, action) {
      state.registering = true
      state.actionAuth = "No action"
    },
    registerSuccess(state, action) {
      state.registering = false
      state.actionAuth = "Success"
      state.currentUser = action.payload
    },
    registerFailed(state) {
      state.registering = false
      state.actionAuth = "Failed"
    },
    logout(state) {
      state.logging = false
      state.registering = false
      state.actionAuth = "No action"
      state.currentUser = undefined
    },
    resetAction(state) {
      state.actionAuth = "No action"
    },
    logOut(state){
      state={
        logging: false,
        registering: false,
        actionAuth: "No action",
        currentUser: undefined,
      }
    }
    // ...các action khác
  },
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
