import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";



const adminSlice = createSlice({
  name : 'admin',
  initialState: {
      adminUser: localStorage.getItem('adminUser') ? JSON.parse(localStorage.getItem('adminUser')) : null,
      loading: false,
      error: null,
      success: false,
      users:[]
    },
    reducers: {
      adminLogout: (state) => {
        state.adminUser = null;
        state.loading = false;
        state.error = null;
        state.success = false;
        localStorage.removeItem('token');
        toast.success('Admin logged out successfully!', { theme: 'colored' });
      },
      resetAdminState: (state) => {
        state.loading = false;
        state.error = null;
        state.success = false;
      },
      updateUserStart:(state)=>{
        state.loading = true
        state.error = null
        state.success = false
      },
      updateUserSuccess : (state,action)=>{
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map(user => (user._id === updatedUser._id ? updatedUser : user));
        toast.success('User updated successfully!', { theme: 'colored' });
      },
      updateUserFailure : (state,action)=>{
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, { theme: 'colored' });
      },
      setUsers: (state, action) => {
        state.users = action.payload; 
      }
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
            
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('adminUser',JSON.stringify(response.data.user))
            console.log('ress',response.data);
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



export const updateUser = (userData)=>async(dispatch)=>{
  dispatch(updateUserStart())
  try {
    const config = {
      headers : {
        'Content-Type': 'application/json'
      }
    }
    

    const response = await axios.put('http://localhost:5002/api/admin/updateUser', userData, config);
    console.log('resnjs',response.data);
    dispatch(updateUserSuccess(response.data))
  } catch (error) {
    console.error('Profile Update Error:', error);
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(updateUserFailure(errorMessage));
  }
}


export const { adminLogout,
              resetAdminState,
              updateUserStart,
              updateUserSuccess,
              updateUserFailure,
              setUsers
               } = adminSlice.actions;

export default adminSlice.reducer;