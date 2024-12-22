import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  today: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  isLoading: false,
  total: 0,
  today: 0,
  error: null
};

export const getFeeds = createAsyncThunk(
  'feeds/getFeeds',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getAllOrders: (state) => state.orders,
    getOrdersLoading: (state) => state.isLoading,
    getTotal: (state) => state.total,
    getToday: (state) => state.today
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.today = action.payload.totalToday;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { getAllOrders, getOrdersLoading, getToday, getTotal } =
  feedSlice.selectors;
export default feedSlice.reducer;
