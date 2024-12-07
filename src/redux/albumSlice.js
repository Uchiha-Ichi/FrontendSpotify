import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Thunk để gọi API bằng Axios
export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
    try {
        const response = await axios.get('http://localhost:8888/api/album/getAllAlbum');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message; // Xử lý lỗi
    }
});
export const fetchAlbumsForAccount = createAsyncThunk('albums/fetchAlbumsForAccount', async () => {
    try {
        const response = await axios.get('http://localhost:8888/api/album/getAlbumForAccount', { withCredentials: true, });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message; // Xử lý lỗi
    }
});
export const fetchAlbumsByAccount = createAsyncThunk('albums/fetchAlbumsByAccount', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:8888/api/album/getAlbumByAccount/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
export const addAlbum = createAsyncThunk("album/addAlbum", async (name_album, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:8888/api/album/addAlbum', {
            name_album
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
const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        albums: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.albums = action.payload;
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }).addCase(fetchAlbumsForAccount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAlbumsForAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.albums = action.payload;
            })
            .addCase(fetchAlbumsForAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }).addCase(fetchAlbumsByAccount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAlbumsByAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.albums = action.payload;
            })
            .addCase(fetchAlbumsByAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addAlbum.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addAlbum.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.albums = action.payload;
            })
            .addCase(addAlbum.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });;

    },
});

export default albumsSlice.reducer;
