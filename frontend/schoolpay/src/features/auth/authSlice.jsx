import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

import api from '../../api/axios';




export const registerUser = createAsyncThunk(
    'auth/register',
    async (formData, thunkAPI) =>{
        try {
            const res = await api.post(`auth/register`,formData);
            return res.data;
;        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData,thunkAPI)=>{
        try {
           const res = await api.post(`auth/login`,formData);
           return res.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);

        }
    }
);

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:JSON.parse(localStorage.getItem('user')) || null,
        token:localStorage.getItem('token')|| null,
        loading:false,
        error:null,
    },
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },

    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.token = action.payload.token;
            localStorage.setItem('token',action.payload.token);
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload?.message || 'Registration Failed';
        })
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.token = action.payload.token;
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.token = action.payload?.message || 'Login failed';
        });

    },

});

export const {logout} = authSlice.actions;
export default authSlice.reducer;