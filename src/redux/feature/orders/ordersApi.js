import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseURL from "../../../utils/baseUrl";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/orders`,  // Adjusted base URL path
        credentials: 'include',
    }),
    tagTypes: ['orders'], // Moved tagTypes outside baseQuery
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/',
                method: "POST",
                body: newOrder,
                credentials: 'include'
            }),
            // Optionally add invalidatesTags if you want to invalidate cache
            invalidatesTags: ['orders'],
        }),
        getOrderByEmail:(builder.query)({
            query:(email)=>({
                url:`/email/${email}`,

            }),
            providesTags:['Orders']
        })
    }),
});

export const { useCreateOrderMutation,useGetOrderByEmailQuery } = ordersApi;
export default ordersApi;
