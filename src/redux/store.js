import { configureStore } from "@reduxjs/toolkit";
import ProducerReducer from "./slices/ProducerSlice";
import ArtistReducer from "./slices/ArtistSlice";

export const store =  configureStore({
    reducer: {
        producer: ProducerReducer,
        artist: ArtistReducer,

    },
});

export default store;
