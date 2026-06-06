import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState()?.auth?.user?.token ||
        JSON.parse(localStorage.getItem('user') || 'null')?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => 'expenses',
    }),
  }),
});

export const { useGetExpensesQuery } = expenseApi;