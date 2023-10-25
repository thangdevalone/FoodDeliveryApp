import { createSlice } from "@reduxjs/toolkit"

const appSlice = createSlice({
  name: "app",
  initialState:{
    dir:"up"
  },
  reducers: {
    setDir(state,action){
      state.dir=action.payload
    }
  },
})

export const appActions = appSlice.actions

const appReducer = appSlice.reducer
export default appReducer
