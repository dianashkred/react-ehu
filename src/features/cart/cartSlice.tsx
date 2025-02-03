import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//структура товара в корзине
interface CartItem {
    id: string;
    quantity: number;
    name: string;
    price: string;
    image: string;
    totalItemPrice: number;
  }
  
  //структура состояния корзины
  interface CartState {
    items: CartItem[]; 
    totalQuantity: number; 
    totalPrice: number;
    temporaryQuantities: { [id: string]: number }; 
  }
  
  const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    temporaryQuantities: {},
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart(state, action: PayloadAction<Omit<CartItem, 'totalItemPrice'>>) {
        const { id, name, price, image, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        const totalItemPrice = parseFloat(price.replace(/[^0-9.-]+/g, '')) * quantity;

        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.totalItemPrice =existingItem.totalItemPrice += totalItemPrice;
        } else {
          state.items.push({ id, name, price, image, quantity, totalItemPrice });
        }
  
        state.totalQuantity += quantity;
        state.totalPrice += totalItemPrice;
      
        delete state.temporaryQuantities[id];

      },
  
      removeFromCart(state, action: PayloadAction<string>) {
        const id = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
  
        if (existingItem) {
          state.totalPrice -= existingItem.totalItemPrice;
          state.totalQuantity -= existingItem.quantity;

          state.items = state.items.filter((item) => item.id !== id);
        }
      },

      updateTemporaryQuantity(
        state,
        action: PayloadAction<{ id: string; quantity: number }>
      ) {
        const { id, quantity } = action.payload;
        state.temporaryQuantities[id] = quantity;
      },
      clearTemporaryQuantity(state, action: PayloadAction<string>) {
        delete state.temporaryQuantities[action.payload];
      },

      updateQuantity(
        state,
        action: PayloadAction<{ id: string; quantity: number }>
      ) {
        const { id, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        
  
        if (existingItem) {
          const oldQuantity = existingItem.quantity;
          const oldTotalItemPrice = existingItem.totalItemPrice;

          existingItem.quantity = quantity;
          existingItem.totalItemPrice =
            parseFloat(existingItem.price.replace(/[^0-9.-]+/g, '')) * quantity;

          state.totalQuantity += quantity - oldQuantity;
          state.totalPrice += existingItem.totalItemPrice - oldTotalItemPrice;

        }
      },
      clearCart(state) {
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
        state.temporaryQuantities = {};
      },
    },
  });
  
  export const { addToCart, removeFromCart, updateTemporaryQuantity, updateQuantity, clearCart, clearTemporaryQuantity } = cartSlice.actions;
  export default cartSlice.reducer;