
import { getOrdersApi, getOrderByNumberApi } from '../../../utils/burger-api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface OrderState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null
};

export const getOrders = createAsyncThunk('order/getOrders', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getAllOrders: (state) => state.orders,
    getOrdersLoading: (state) => state.isLoading
  },
  extraReducers(builder) {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { getAllOrders, getOrdersLoading } = orderSlice.selectors;
export default orderSlice.reducer;
