import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllProducer = createAsyncThunk(
    "producers/all",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}api/producer/`,obj,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const AddProducer = createAsyncThunk(
    "producer/add",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_HOST}api/producer/store`,obj.data,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  
  export const EditProducer = createAsyncThunk(
    "producer/edit",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_HOST}api/producer/update/${obj.id}`,
          obj.data,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const DeleteProducer = createAsyncThunk(
    "producer/delete",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_HOST}api/producer/dlt/${obj.id}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  const initialState = {
    producer: null,
    loading: false,
    //input_errors: null,
    errors: null,
    success: null,
  };

  const ProducerSlice = createSlice({
    name: "producer",
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
      [GetAllProducer.pending]: (state) => {
        state.loading = true;
      },
      [GetAllProducer.fulfilled]: (state, action) => {
        state.loading = false;
        state.producer = action.payload.producer;
      },
      [GetAllProducer.rejected]: (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      },
      [AddProducer.pending]: (state) => {
        state.loading = true;
      },
      [AddProducer.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.errors = null;
        state.producer = [action.payload.producer, ...state.producer];
      },
      [AddProducer.rejected]: (state, action) => {
        state.loading = false;
        state.success = null;
        state.errors = action.payload;
      },
      [EditProducer.pending]: (state) => {
        state.loading = true;
      },
      [EditProducer.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.errors = null;
        state.producer = action.payload.producer;
      },
      [EditProducer.rejected]: (state, action) => {
        state.loading = false;
        state.success = null;
        state.errors = action.payload;
      },

      [DeleteProducer.pending]: (state) => {
        state.loading = true;
      },
      [DeleteProducer.fulfilled]: (state, action) => {
        const new_prod = state.producer;
        new_prod.splice(
          new_prod.findIndex((a) => a._id === action.payload.id),
          1
        );
        state.loading = false;
        state.success = action.payload.success;
        state.admin = new_prod;
        state.errors = null;
      },
      [DeleteProducer.rejected]: (state, action) => {
        state.loading = false;
        state.succes = null;
        state.errors = action.payload;
      },
    },
});
export const { clearError, clearSuccess } = ProducerSlice.actions;
export default ProducerSlice.reducer;