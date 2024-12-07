import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchSongs = createAsyncThunk(
    "search/searchSongs",
    async (searchTerm, thunkAPI) => {
        try {
            console.log(searchTerm);
            const response = await axios.post(
                "http://localhost:8888/api/search/search",
                { key: searchTerm },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response?.data || "Search failed");
        }
    }
);
const searchSlice = createSlice({
    name: "search", // Thay đổi tên slice thành "search"
    initialState: {
        songs: [],
        accounts: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchSongs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchSongs.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log("song", action.payload.results.songs);
                // Lưu trữ cả bài hát và tài khoản vào state
                state.songs = action.payload.results.songs || [];
                state.accounts = action.payload.results.accounts || [];
            })
            .addCase(searchSongs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default searchSlice.reducer;
