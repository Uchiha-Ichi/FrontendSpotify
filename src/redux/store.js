import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import songsReducer from "./songSlice";
import searchReducer from "./searchSlice";
import albumsReducer from "./albumSlice";
import artistsReducer from "./artistSlice";
import playlistsReducer from "./playlistSlice";
import typesReducer from "./typeSilce";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        songs: songsReducer,
        search: searchReducer,
        albums: albumsReducer,
        artists: artistsReducer,
        playlists: playlistsReducer,
        types: typesReducer
    },
});
