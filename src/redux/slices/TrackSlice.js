import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllTracks = createAsyncThunk(
    "track/all",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}api/track/`,obj,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const AddTrack = createAsyncThunk(
    "track/add",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_HOST}api/track/store`,obj.data,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  
  export const EditTrack = createAsyncThunk(
    "track/edit",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_HOST}api/track/update/${obj.id}`,
          obj.data,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const DeleteTrack = createAsyncThunk(
    "track/delete",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_HOST}api/track/dlt/${obj.id}`,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  const initialState = {
    track: null,
    loading: false,
    //input_errors: null,
    errors: null,
    success: null,
  };

  const TrackSlice = createSlice({
    name: "track",
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
      [GetAllTracks.pending]: (state) => {
        state.loading = true;
      },
      [GetAllTracks.fulfilled]: (state, action) => {
        state.loading = false;
        state.track = action.payload.track;
      },
      [GetAllTracks.rejected]: (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      },
      [AddTrack.pending]: (state) => {
        state.loading = true;
      },
      [AddTrack.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.errors = null;
        state.track = action.payload.track;
        
      },
      [AddTrack.rejected]: (state, action) => {
        state.loading = false;
        state.success = null;
        state.errors = action.payload;
      },
      [EditTrack.pending]: (state) => {
        state.loading = true;
      },
      [EditTrack.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.errors = null;
        state.track = action.payload.track;
      },
      [EditTrack.rejected]: (state, action) => {
        state.loading = false;
        state.success = null;
        state.errors = action.payload;
      },

      [DeleteTrack.pending]: (state) => {
        state.loading = true;
      },
      [DeleteTrack.fulfilled]: (state, action) => {
        const new_track = state.track;
        new_track.splice(
          new_track.findIndex((t) => t._id === action.payload.id),
          1
        );
        state.loading = false;
        state.success = action.payload.success;
        state.track = new_track;
        state.errors = null;
      },
      [DeleteTrack.rejected]: (state, action) => {
        state.loading = false;
        state.succes = null;
        state.errors = action.payload;
      },
    },
});
export const { clearError, clearSuccess } = TrackSlice.actions;
export default TrackSlice.reducer;