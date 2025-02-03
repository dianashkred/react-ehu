import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu/menuSlice';
import userReducer from './user/userSlice';
import firebaseReducer from './firebase/firebaseSlice';
import cartReducer from './cart/cartSlice';
import orderReducer from './order/orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    user: userReducer,
    firebase: firebaseReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;//глобальное состояние Redux
export type AppDispatch = typeof store.dispatch;
export default store;
