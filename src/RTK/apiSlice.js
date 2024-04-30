
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5013/api/' }), 
  endpoints: (builder) => ({
  
    createOrder: builder.mutation({
        query: (order) => ({
          url: 'orders',
          method: 'POST',
          body: order,
        }),
      }),
    getOrdersByDate: builder.query({
      query: (date) => `orders/byDate?date=${date}`,

    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersByDateQuery } = api;
export default api;