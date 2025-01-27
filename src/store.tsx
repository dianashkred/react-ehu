import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menu/menuSlice';
import userReducer from './features/user/userSlice';
import firebaseReducer from './features/firebase/firebaseSlice';
import cartReducer from './features/cart/cartSlice';
import orderReducer from './features/order/orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    user: userReducer,
    firebase: firebaseReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
