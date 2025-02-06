import { createStore } from "@reduxjs/toolkit"
import { initialState } from "../services/slices/user";
import store, { rootReducer } from "../services/store"
import userReducer from '../services/slices/user';

describe('Проверка инициализации rootReducer', () => {
    beforeEach(() => {
        let store = createStore(rootReducer);
    });
    it('инициализации rootReducer и проверка initialState', () => {
        
        expect(store.getState().user).toEqual(initialState);
    })

    it('инициализации rootReducer c undefined состоянием', () => {
        let action = { type: 'UNKNOWN_ACTION' };
        store.dispatch(action);
        expect(store.getState().user).toEqual(userReducer(undefined, action));
    })
})