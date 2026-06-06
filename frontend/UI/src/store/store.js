import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import filterReducer from "./filterSlice";
import { expenseApi } from './apis/expenseApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        filters: filterReducer,
        [expenseApi.reducerPath]: expenseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expenseApi.middleware)
})