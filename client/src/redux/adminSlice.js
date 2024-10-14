import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";
import axios from "axios";

export const adminLogin = createAsyncThunk(
    'admin/login',
    async({email , password} , thunkAPI)=>{
        try {
            console.log('macmnsddfsf');
            const response = await axiosInstance.post('/admin/login',{email , password})
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
    name :'admin',
    initialState: {
        adminUser: JSON.parse(localStorage.getItem('adminUser')) || null,
        loading: false,
        error: null,
        success: false,
      },
      reducers:{
        adminLogout : (state)=>{
            state.adminUser = null;
            state.loading = false;
            state.error = null;
            state.success = false;
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
        },
        resetAdminState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
          }
      }
})


export const {adminLogout , resetAdminState} = adminSlice.actions;

export default adminSlice.reducer