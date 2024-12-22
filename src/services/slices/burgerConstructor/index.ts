import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { nanoid } from 'nanoid';

export type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type == 'bun'
          ? (state.bun = action.payload)
          : state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id == action.payload.id
      );
      if (ingredientIndex >= 0) {
        state.ingredients.splice(ingredientIndex, 1);
      }
    },

    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      [state.ingredients[index], state.ingredients[index - 1]] = [
        state.ingredients[index - 1],
        state.ingredients[index]
      ];
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      [state.ingredients[index], state.ingredients[index + 1]] = [
        state.ingredients[index + 1],
        state.ingredients[index]
      ];
    },
    clearConstructor: () => initialState
  },
  selectors: {
    constructorItemsSelector: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveDown,
  moveUp
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { constructorItemsSelector } = burgerConstructorSlice.selectors;
