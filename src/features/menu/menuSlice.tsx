import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface MenuState {
  items: MenuItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  categories: string[];
  visibleItems: number;
  selectedCategory: string;
}

const initialState: MenuState = {
    items: [],
    status: 'idle',
    categories: [],
    visibleItems: 6,
    selectedCategory: '',
};

export const fetchMenuItems = createAsyncThunk('menu/fetchMenuItems', async () => {
  const response = await fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals');
  const data = await response.json();
  return data.map((item: any) => ({
    id: item.id,
    name: item.meal,
    price: `$${item.price.toFixed(2)} USD`,
    description: item.instructions.substring(0, 100) + '...',
    image: item.img,
    category: item.category,
  }));
});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setVisibleItems(state, action: PayloadAction<number>) {
        state.visibleItems = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
        state.selectedCategory = action.payload;
        state.visibleItems = 6;
      },
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuItems.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.items = action.payload;
        state.categories = Array.from(new Set(action.payload.map((item) => item.category)));
        state.selectedCategory = state.categories[0] || '';
        state.status = 'succeeded';
      })
      .addCase(fetchMenuItems.rejected, (state) => {
        state.status = 'failed';
      });
 },
});
    

export const { setVisibleItems, setSelectedCategory } = menuSlice.actions;
export default menuSlice.reducer;