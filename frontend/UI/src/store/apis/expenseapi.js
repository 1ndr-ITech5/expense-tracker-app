import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  tagTypes: ['Expense'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.user?.token || JSON.parse(localStorage.getItem('user'))?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => "expenses",
      providesTags: ['Expense'],
    }),

    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: "expenses",
        method: "POST",
        body: newExpense,
      }),
      invalidatesTags: ['Expense'],
    }),

    updateExpense: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `expenses/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ['Expense'],
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;