import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/axios";


export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("orders", payload, {
        withCredentials: true, 
      });
      const order = res.data?.order;
      return {
        order,
        orderId: order?._id,
      }; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const fetchAllStatuses = createAsyncThunk(
  "orders/fetchAllStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("orderstatus", {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], 
    statuses: [], 
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Order created successfully";
       if (action.payload?.order) {
          state.orders.push(action.payload.order);
        }

        
        if (action.payload?.orderId) {
          localStorage.setItem("currentOrderId", action.payload.orderId);
        } else {
          console.warn("orderId missing in payload:", action.payload);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    
    builder
      .addCase(fetchAllStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = action.payload;
      })
      .addCase(fetchAllStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = orderSlice.actions;
export default orderSlice.reducer;
