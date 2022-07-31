import { configureStore } from "@reduxjs/toolkit";
import ProducerReducer from "./slices/ProducerSlice";
import ArtistReducer from "./slices/ArtistSlice";
import AlbumReducer from "./slices/AlbumSlice";
import TrackReducer from "./slices/TrackSlice";
import UserReducer from "./slices/UserSlice"

export const store =  configureStore({
    reducer: {
        producer: ProducerReducer,
        artist: ArtistReducer,
        album: AlbumReducer,
        track: TrackReducer,
        user: UserReducer,

    },
});

export default store;
