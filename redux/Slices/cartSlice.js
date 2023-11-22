import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeFromCart;
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      itemInCart.quantity++;
    },
    decrementQuantiy: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart.quantity == 1) {
        const removeFromCart = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeFromCart;
      } else {
        itemInCart.quantity--;
      }
    },
    toggleProductSelection: (state, action) => {
      const selectedProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (selectedProduct) {
        selectedProduct.selected = !selectedProduct.selected;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantiy,
  toggleProductSelection,
  updateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
