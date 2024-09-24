import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.name === newItem.name
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalAmount += newItem.price;
    },
    removeFromCart: (state, action) => {
      const removeItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.name === removeItem
      );

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          // If quantity is 1, remove the item completely from the cart
          state.cartItems = state.cartItems.filter(
            (item) => item.name !== removeItem
          );
        } else {
          // Otherwise, reduce the quantity and update the total price
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
