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
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
        );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const LoginUserThunk = createAsyncThunk(
  "admin/login",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/auth/auth/login`,
        formdata
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const LogoutAdminThunk = createAsyncThunk(
  "admin/logout",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/auth/auth/logout`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
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
          `${process.env.REACT_APP_API_HOST}api/auth/auth/register`,
          formdata,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        );
        localStorage.setItem("token", response.data.token);
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
  
const userSlice = createSlice({
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
  [LoginUserThunk.pending]: (state) => {
    state.loading = true;
  },
  [LoginUserThunk.fulfilled]: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload.user;
    // localStorage.setItem("token", action.payload.token);
  },
  [LoginUserThunk.rejected]: (state, action) => {
    state.isAuthenticated = false;
    state.loading = false;
    state.errors = action.payload;
  },
  [LogoutAdminThunk.pending]: (state) => {
    state.loading = true;
  },
    [LogoutAdminThunk.fulfilled]: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
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
        state.user = action.payload.user;
    },
    [CreateAdminThunk.rejected]: (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.errors = JSON.parse(action.payload);
    },
},
});
export const { clearError, clearSuccess } = userSlice.actions;
export default userSlice.reducer;
                 