import { createSlice } from '@reduxjs/toolkit';
import api from '../RTK/apiSlice';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    createOrder: (state, action) => {
      state.orders.push(action.payload); 
    },
    getOrdersByDate: (state, action) => {
      state.loading = true;
    },
    getOrdersByDateSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    getOrdersByDateError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.createOrder.matchFulfilled, (state, { payload }) => {
      state.orders.push(payload);
    });
    builder.addMatcher(api.endpoints.createOrder.matchRejected, (state, { error }) => {
      state.error = error.message;
    });
  },
});

export const { createOrder, getOrdersByDate, getOrdersByDateSuccess } = orderSlice.actions;
export default orderSlice.reducer;