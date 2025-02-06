
import { getIngredientsApi } from '../../../utils/burger-api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  isLoading: boolean;
  error: string | null;
  ingredients: TIngredient[];
};

const initialState: TIngredientState = {
  isLoading: false,
  error: null,
  ingredients: []
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getAllIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { getAllIngredients, getIngredientsLoading } = slice.selectors;
export default slice.reducer;
