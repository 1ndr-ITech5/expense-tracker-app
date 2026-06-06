import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice.js'
import { expenseApi } from './apis/expenseApi';

export const store = configureStore({
    reducer: {
        auth: userReducer,
        [expenseApi.reducerPath]: expenseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expenseApi.middleware)
})