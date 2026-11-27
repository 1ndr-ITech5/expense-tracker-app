import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {logout} from "../userSlice.js";
import {toast} from "react-toastify";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/expenses`,
  prepareHeaders: (headers, { getState }) => {
    const stateUser = getState()?.user?.user;
    const localUser = JSON.parse(localStorage.getItem('user') || 'null');

    const token =
      stateUser?.token ||
      stateUser?.data?.token ||
      localUser?.token ||
      localUser?.data?.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  }
})

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
      toast.error(result?.error?.data?.message)
      api.dispatch(logout())
      api.dispatch(expenseApi.util.resetApiState());
  }

  return result;
}; 

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  tagTypes: ['Expense'],
  baseQuery: baseQueryWithAuth,

  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "",
        method: "GET"
      }),
      providesTags: ['Expense'],
    }),

    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: "",
        method: "POST",
        body: newExpense,
      }),
      invalidatesTags: ['Expense'],
    }),

    updateExpense: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ['Expense'],
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
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