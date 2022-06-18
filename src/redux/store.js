import { configureStore } from "@reduxjs/toolkit";
import ProducerReducer from "./slices/ProducerSlice";
import ArtistReducer from "./slices/ArtistSlice";
import AlbumReducer from "./slices/AlbumSlice";

export const store =  configureStore({
    reducer: {
        producer: ProducerReducer,
        artist: ArtistReducer,
        album: AlbumReducer,

    },
});

export default store;
