import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string;
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
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.name === newItem.name
      );

      if (!existingItem) {
        state.cartItems.push({
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },
    removeFromCart: (state, action) => {
      const removeItem = action.payload;

      // Find the item to remove
      const existingItem = state.cartItems.find(
        (item) => item.name === removeItem
      );

      if (existingItem) {
        // Adjust the total quantity and amount
        state.totalQuantity -= existingItem.quantity; // Deduct the entire quantity
        state.totalAmount -= existingItem.totalPrice; // Deduct the total price of that item

        // Remove the entire item from the cart
        state.cartItems = state.cartItems.filter(
          (item) => item.name !== removeItem
        );
      }
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const itemName = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.name === itemName
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity++;
        state.totalAmount += existingItem.price;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const itemName = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.name === itemName
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
      }
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
