import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
export const GetAuthDetails = createAsyncThunk(
  "admin/auth",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/auth/me`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const LogoutAdminThunk = createAsyncThunk(
  "admin/logout",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/logout`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const CreateAdminThunk = createAsyncThunk(
    "admin/register",
    async (formdata, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_HOST}api/admin/auth/register`,
          formdata,
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  

const initialState = {
    isAuthenticated: null,
    loading: false,
    errors: null,
    success: null,
  };
  
const adminSlice = createSlice({
name: "admin",
initialState,
reducers: {
  clearError: (state) => {
    state.errors = null;
    },
  clearSuccess: (state) => {
    state.success = null;
    },
    },
extraReducers: {
    [LogoutAdminThunk.pending]: (state) => {
        state.loading = true;
    },
    [LogoutAdminThunk.fulfilled]: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
    },
    [LogoutAdminThunk.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    [CreateAdminThunk.pending]: (state) => {
        state.loading = true;
    },
    [CreateAdminThunk.fulfilled]: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.success = action.payload.message;
        state.admin = [...state.admin, action.payload.admin];
    },
    [CreateAdminThunk.rejected]: (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.role = null;
        state.errors = JSON.parse(action.payload);
    },
},
});
export const { clearError, clearSuccess } = adminSlice.actions;
export default adminSlice.reducer;
                 