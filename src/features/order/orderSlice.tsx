import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  street: string;
  house: string;
  error: string | null;
  orderPlaced: boolean;
}

const initialState: OrderState = {
  street: '',
  house: '',
  error: null,
  orderPlaced: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateStreet(state, action: PayloadAction<string>) {
      state.street = action.payload;
      if (state.error) state.error = null; 
    },
    updateHouse(state, action: PayloadAction<string>) {
      state.house = action.payload;
      if (state.error) state.error = null; 
    },
    setOrderError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearOrderError(state) {
      state.error = null;
    },
    setOrderPlaced(state) {
        state.orderPlaced = true; 
    },
    resetOrderState(state) {
        state.street = '';
        state.house = '';
        state.error = null;
        state.orderPlaced = false;
    },
  },
});

export const {
  updateStreet,
  updateHouse,
  setOrderError,
  clearOrderError,
  setOrderPlaced,
  resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;
