import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";


export const adminLogin = createAsyncThunk(
    'admin/login',
    async({email , password} , thunkAPI)=>{
        try {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
            };



            const response = await axios.post('http://localhost:5002/api/admin/login', { email, password }, config); 
            
            localStorage.setItem('adminToken',response.data.token)
            localStorage.setItem('adminUser',JSON.stringify(response.data.user))

            return response.data
        } catch (error) {
            const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            'Admin login failed.';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const adminSlice = createSlice({
    name : 'admin',
    initialState: {
        adminUser: localStorage.getItem('adminUser') ? JSON.parse(localStorage.getItem('adminUser')) : null,
        loading: false,
        error: null,
        success: false,
      },
      reducers: {
        adminLogout: (state) => {
          state.adminUser = null;
          state.loading = false;
          state.error = null;
          state.success = false;
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          toast.success('Admin logged out successfully!', { theme: 'colored' });
        },
        resetAdminState: (state) => {
          state.loading = false;
          state.error = null;
          state.success = false;
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(adminLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
          })
          .addCase(adminLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.adminUser = action.payload.user;
            state.error = null;
            state.success = true;
          })
          .addCase(adminLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            
          });
      },
})

export const { adminLogout, resetAdminState } = adminSlice.actions;

export default adminSlice.reducer;