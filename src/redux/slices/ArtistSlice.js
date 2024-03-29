import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllArtist = createAsyncThunk(
    "artist/all",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_HOST}api/artist/`,obj,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const GetAllArtistGuest = createAsyncThunk(
    "artistguest/all",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}api/artist/guest/`,obj,);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const AddArtist = createAsyncThunk(
    "artist/add",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_HOST}api/artist/store`,obj.data,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  
  export const EditArtist = createAsyncThunk(
    "artist/edit",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_HOST}api/artist/update/${obj.id}`,
          obj.data,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const DeleteArtist = createAsyncThunk(
    "artist/delete",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_HOST}api/artist/dlt/${obj.id}`,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const GetArtistDetails = createAsyncThunk(
    "artist/details",
    async (obj, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_HOST}api/artist/${obj.id}`
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  const initialState = {
    artist: null,
    loading: false,
    errors: null,
    success: null,
  };

  const ArtistSlice = createSlice({
    name: "artist",
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
      [GetAllArtist.pending]: (state) => {
        state.loading = true;
      },
      [GetAllArtist.fulfilled]: (state, action) => {
        state.loading = false;
        state.artist = action.payload.artist;
      },
      [GetAllArtist.rejected]: (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      },
      [GetAllArtistGuest.pending]: (state) => {
        state.loading = true;
      },
      [GetAllArtistGuest.fulfilled]: (state, action) => {
        state.loading = false;
        state.artist = action.payload.artist;
      },
      [GetAllArtistGuest.rejected]: (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      },
      [AddArtist.pending]: (state) => {
        state.loading = true;
      },
      [AddArtist.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.errors = null;
        state.artist = [action.payload.artist, ...state.artist];
      },
      [AddArtist.rejected]: (state, action) => {
        state.loading = false;
        state.success = null;
        state.errors = action.payload;
      },
      [EditArtist.pending]: (state) => {
        state.loading = true;
      },
      [EditArtist.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.errors = null;
        state.artist = action.payload.artist;
      },
      [EditArtist.rejected]: (state, action) => {
        state.loading = false;
        state.success = null;
        state.errors = action.payload;
      },

      [DeleteArtist.pending]: (state) => {
        state.loading = true;
      },
      [DeleteArtist.fulfilled]: (state, action) => {
        const new_artist = state.artist;
        new_artist.splice(
          new_artist.findIndex((a) => a._id === action.payload.id),
          1
        );
        state.loading = false;
        state.success = action.payload.success;
        state.artist = new_artist;
        state.errors = null;
      },
      [DeleteArtist.rejected]: (state, action) => {
        state.loading = false;
        state.success = null;
        state.errors = action.payload;
      },
      [GetArtistDetails.pending]: (state) => {
        state.loading = true;
      },
      [GetArtistDetails.fulfilled]: (state, action) => {
        state.loading = false;
        state.artist = action.payload.artist;
      },
      [GetArtistDetails.rejected]: (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      },
    },
});
export const { clearError, clearSuccess } = ArtistSlice.actions;
export default ArtistSlice.reducer;