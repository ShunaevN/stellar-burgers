import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingridients';
import feedReducer from './slices/feeds';
import ordersReducer from './slices/orders';
import userReducer from './slices/user';
import { burgerConstructorReducer } from './slices/burgerConstructor';
import { addBurgerSliceReducer } from './slices/newOrder';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedReducer,
  orders: ordersReducer,
  user: userReducer,
  burgerConstructor: burgerConstructorReducer,
  addBurder: addBurgerSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
