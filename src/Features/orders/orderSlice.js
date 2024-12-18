import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, updateOrder } from './ordersApi';

const initialState = {
  orders: [],
  status: 'idle',
  orderId: "",
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderId: (state,action) => {
      state.orderId = action.payload;
  }
  },
  extraReducers: (builder) => {
    builder
      // create order - for user
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
      })
      // update the order -- for admin
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        state.orders[index] = action.payload;
      })
  },
});

export const { orderId } = orderSlice.actions;

export const selectOrderId = (state) => state.orders.orderId

export default orderSlice.reducer;