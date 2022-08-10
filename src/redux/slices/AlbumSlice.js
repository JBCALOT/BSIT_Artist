import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllAlbum = createAsyncThunk(
    "album/all",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}api/album/`,obj,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const AddAlbum = createAsyncThunk(
    "album/add",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_HOST}api/album/store`,obj.data,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token")},
          });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  
  export const EditAlbum = createAsyncThunk(
    "album/edit",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_HOST}api/album/update/${obj.id}`,obj.data,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const DeleteAlbum = createAsyncThunk(
    "album/delete",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_HOST}api/album/dlt/${obj.id}`,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  const initialState = {
    album: null,
    loading: false,
    //input_errors: null,
    errors: null,
    success: null,
  };

  const AlbumSlice = createSlice({
    name: "album",
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
      [GetAllAlbum.pending]: (state) => {
        state.loading = true;
      },
      [GetAllAlbum.fulfilled]: (state, action) => {
        state.loading = false;
        state.album = action.payload.album;
      },
      [GetAllAlbum.rejected]: (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      },
      [AddAlbum.pending]: (state) => {
        state.loading = true;
      },
      [AddAlbum.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.errors = null;
        state.album = [action.payload.album, ...state.album];
      },
      [AddAlbum.rejected]: (state, action) => {
        state.loading = false;
        state.success = null;
        state.errors = action.payload;
      },
      [EditAlbum.pending]: (state) => {
        state.loading = true;
      },
      [EditAlbum.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.errors = null;
        state.album = action.payload.album;
      },
      [EditAlbum.rejected]: (state, action) => {
        state.loading = false;
        state.success = null;
        state.errors = action.payload;
      },

      [DeleteAlbum.pending]: (state) => {
        state.loading = true;
      },
      [DeleteAlbum.fulfilled]: (state, action) => {
        const new_album = state.album;
        new_album.splice(
          new_album.findIndex((a) => a._id === action.payload.id),
          1
        );
        state.loading = false;
        state.success = action.payload.success;
        state.album = new_album;
        state.errors = null;
      },
      [DeleteAlbum.rejected]: (state, action) => {
        state.loading = false;
        state.succes = null;
        state.errors = action.payload;
      },
    },
});
export const { clearError, clearSuccess } = AlbumSlice.actions;
export default AlbumSlice.reducer;