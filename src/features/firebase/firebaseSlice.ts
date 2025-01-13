import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { database } from '../../data/firebase';
import { ref, get } from 'firebase/database';

interface User {
  id: string;
  login: string;
  password: string;
}

interface FirebaseState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FirebaseState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('firebase/fetchUsers', async () => {
  const usersRef = ref(database, 'users');
  const snapshot = await get(usersRef);
  const data = snapshot.val();
  return data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
});

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export default firebaseSlice.reducer;
