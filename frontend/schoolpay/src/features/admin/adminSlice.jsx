import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";


export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (filters, { rejectWithValue }) => {
    try {
      const params = {};
      if (filters.studentId) params.studentId = filters.studentId;
      if (filters.schoolId) params.schoolId = filters.schoolId;
      if (filters.from) params.from = filters.from;
      if (filters.to) params.to = filters.to;

      const res = await api.get("orders/transactions", { params });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    orders: [],       
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : action.payload?.data || [];
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
