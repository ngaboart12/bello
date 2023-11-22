import { createSlice } from "@reduxjs/toolkit";

export const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wish: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const itemInWishes = state.wish.find(
        (item) => item.id === action.payload.id
      );
      if (itemInWishes) {
        itemInWishes.quantity++;
      } else {
        state.wish.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromWishlist: (state, action) => {
      const removeFromCart = state.wish.filter(
        (item) => item.id !== action.payload.id
      );
      state.wish = removeFromCart;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishSlice.actions;

export const selectWishlist = (state) => state.wish.wish;

export default wishSlice.reducer;
