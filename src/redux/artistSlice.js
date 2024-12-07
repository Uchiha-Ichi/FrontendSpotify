import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAllArtists = createAsyncThunk('artists/fetchFiveArtists', async () => {
    const response = await axios.get('http://localhost:8888/v1/auth/getAllArtists');
    return response.data;
});

const artistsSlice = createSlice({
    name: 'artists',
    initialState: {
        artists: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllArtists.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllArtists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.artists = action.payload;
            })
            .addCase(fetchAllArtists.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default artistsSlice.reducer;
