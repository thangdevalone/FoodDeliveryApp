import { createSlice } from "@reduxjs/toolkit"

export const orderSlice = createSlice({
  name: "order",
  initialState:{
    data:[]
  },
  reducers: {
    addOrder(state,action){
      state.data.push({...action.payload,idx:state.data.length})
    },
    clear(state,action){
      state.data=[]
    }
    // ...các action khác
  },
})

export const orderActions = orderSlice.actions

const orderReducer = orderSlice.reducer
export default orderReducer
