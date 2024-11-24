import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk để fetch bài hát
export const fetchSongs = createAsyncThunk("song/fetchSongs", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:8000/api/song/getAllSongs");
        return response.data; // Trả về dữ liệu bài hát
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data); // Trả lỗi nếu có
    }
});

// Slice để lưu trữ danh sách bài hát
const songSlice = createSlice({
    name: "song",
    initialState: {
        songs: [], // Danh sách bài hát
        currentSong: null, // Thông tin chi tiết bài hát đang phát
        isLoading: false,
        error: null,
    },
    reducers: {
        setCurrentSong: (state, action) => {
            // Cập nhật thông tin bài hát hiện tại
            state.currentSong = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.songs = action.payload;
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Export action setCurrentSong để sử dụng trong component
export const { setCurrentSong } = songSlice.actions;

export default songSlice.reducer;
