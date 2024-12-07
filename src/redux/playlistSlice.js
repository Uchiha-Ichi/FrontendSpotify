import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk để gọi API bằng Axios
export const fetchPlaylists = createAsyncThunk('playlists/fetchPlaylists', async () => {
    try {
        const response = await axios.get('http://localhost:8888/api/playList/getPlaylist', { withCredentials: true, });
        console.log("playlist", response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message; // Xử lý lỗi
    }
});
export const addSongToPlayList = createAsyncThunk(
    "playlist/addSongToPlayList",
    async ({ id_playlist, id_song }, { rejectWithValue }) => {
        try {
            console.log("playlist", id_playlist);
            console.log("song", id_song);
            const response = await axios.post(
                'http://localhost:8888/api/playList/addSongToPlayList',
                {
                    id_playlist: id_playlist,
                    id_song: id_song
                }, // Body gửi lên server
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }


            );
            return response.data; // Trả về dữ liệu từ server
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); // Trả về lỗi
        }
    }
);
export const addPlaylist = createAsyncThunk("playlist/addPlaylist", async (name_playlist, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:8888/api/playList/addPlaylist', {
            name_playlist
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || "Search failed");
    }
});
export const changeNamePlaylist = createAsyncThunk("playlist/changeNamePlaylist", async ({ playlistName, playlist_id }, thunkAPI) => {
    try {
        console.log("playlistName", playlistName);
        console.log("playlistId", playlist_id);
        const response = await axios.post('http://localhost:8888/api/playList/changeNamePlaylist', {
            playlistName: playlistName,
            playlist_id: playlist_id,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || "change failed");
    }
});
const playlistSlice = createSlice({
    name: 'playlists',
    initialState: {
        playlists: [],
        status: 'idle',
        error: null,
        isLoading: false, // Thêm isLoading vào trong state
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylists.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPlaylists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.playlists = action.payload;
            })
            .addCase(fetchPlaylists.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addSongToPlayList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addSongToPlayList.fulfilled, (state) => {
                state.isLoading = false;

            })
            .addCase(addSongToPlayList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addPlaylist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addPlaylist.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addPlaylist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default playlistSlice.reducer;
