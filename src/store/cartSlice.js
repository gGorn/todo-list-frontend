import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find((i) => i.id === item.id);
      if (!exists) {
        state.cartItems.push(item);
        localStorage.setItem("cart", JSON.stringify(state.cartItems)); // Save to localStorage
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.cartItems)); // Save to localStorage
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
