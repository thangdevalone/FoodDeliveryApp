const { createSlice } = require("@reduxjs/toolkit");


export const cartSlice = createSlice({
  name:'cart',
  initialState:{
    cartData:[]
  },
  reducers: {
    setValue(state,action){
      const existItem = state.cartData.findIndex(item => item.id === action.payload.id);
      if(existItem !==-1){
        state.cartData[existItem].quantity=action.payload.quantity
      }
    },
    addItem(state,action){
      const newItem = action.payload;
      const existItem = state.cartData.findIndex(item => item.id === action.payload.id);
      if (existItem !==-1) {
        // Nếu món hàng đã tồn tại, tăng số lượng lên.
        state.cartData[existItem].quantity = newItem.quantity;
      } else {
        // Nếu món hàng chưa tồn tại, thêm món hàng mới vào giỏ hàng.
        state.cartData = [...state.cartData, newItem];
      }
    },
    deleteCart(state){
      state.cartData=[]
    },
    removeItem(state,action){
      const newCart=state.cartData.filter(item => item.id!==action.payload)
      state.cartData=newCart
    }
  },
})
export const cartActions = cartSlice.actions


const cartReducer = cartSlice.reducer
export default cartReducer