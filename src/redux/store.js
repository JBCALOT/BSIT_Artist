import { configureStore } from "@reduxjs/toolkit";
import ProducerReducer from "./slices/ProducerSlice";
import ArtistReducer from "./slices/ArtistSlice";
import AlbumReducer from "./slices/AlbumSlice";
import TrackReducer from "./slices/TrackSlice";

export const store =  configureStore({
    reducer: {
        producer: ProducerReducer,
        artist: ArtistReducer,
        album: AlbumReducer,
        track: TrackReducer,

    },
});

export default store;
