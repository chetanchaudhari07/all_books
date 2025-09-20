import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/orders/orderSlice';
import adminReducer from '../features/admin/adminSlice';


export const store = configureStore({
    reducer: {
        auth:authReducer,
        orders:orderReducer,
        admin:adminReducer,
    },
});

export default store;
