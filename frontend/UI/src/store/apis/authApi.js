import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    tagTypes: ['Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/user`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ['Auth']
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ['Auth']
        }),
        getUser: builder.query({
            query: () => ({
                url: '/user-info',
                method: "GET"
            }),
            providesTags: ['Auth']
        })
    })
})

export const {useRegisterUserMutation, useLoginUserMutation, useGetUserQuery} = authApi;