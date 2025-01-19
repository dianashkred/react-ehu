import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    quantity: number;
  }
  
  interface CartState {
    items: CartItem[]; // Список товаров в корзине
    totalQuantity: number; // Общее количество товаров
    temporaryQuantities: { [key: string]: number }; // Временные количества для input
  }
  
  const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    temporaryQuantities: {},
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart(state, action: PayloadAction<{ id: string; quantity: number }>) {
        const { id, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ id, quantity });
        }
        state.totalQuantity += quantity;
      },
  
      updateTemporaryQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
        const { id, quantity } = action.payload;
        state.temporaryQuantities[id] = quantity;
      },
  
      clearCart(state) {
        state.items = [];
        state.totalQuantity = 0;
        state.temporaryQuantities = {};
      },
    },
  });
  
  export const { addToCart, updateTemporaryQuantity, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;