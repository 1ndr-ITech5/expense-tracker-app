import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import filterReducer from "./filterSlice";
import { expenseApi } from './apis/expenseApi.js';
import {authApi} from "./apis/authApi.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        filters: filterReducer,
        [expenseApi.reducerPath]: expenseApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expenseApi.middleware, authApi.middleware),
})