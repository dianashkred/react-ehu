import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menu/menuSlice';
import userReducer from './features/user/userSlice';
import firebaseReducer from './features/firebase/firebaseSlice';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    user: userReducer,
    firebase: firebaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
