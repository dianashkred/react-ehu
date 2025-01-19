import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  username: string;
  password: string;
  errorMessage: string | null;

}

const initialState: UserState = {
  isLoggedIn: false,
  username: '',
  password: '',
  errorMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string }>) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.errorMessage = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = '';
      state.password = '';
      state.errorMessage = null;
    },
    updateUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    updatePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
  },
});
export const { login, logout, updateUsername, updatePassword, setErrorMessage } = userSlice.actions;
export default userSlice.reducer;