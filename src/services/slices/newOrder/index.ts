
import { orderBurgerApi } from '../../../utils/burger-api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const orderBurger = createAsyncThunk(
  'order/addBurger',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response.order;
  }
);

export type TAddBurgerState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TAddBurgerState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const addBurgerSlice = createSlice({
  name: 'addBurger',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.error = null;
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrder } = addBurgerSlice.actions;
export const { getOrderRequest, getOrderModalData } = addBurgerSlice.selectors;
export const addBurgerSliceReducer = addBurgerSlice.reducer;
