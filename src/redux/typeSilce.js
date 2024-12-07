import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTypes = createAsyncThunk('types/fetchTypes', async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:8888/api/type/getAllTypes');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data); // Xử lý lỗi
    }
});

const typesSlice = createSlice({
    name: 'types',
    initialState: {
        types: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.types = action.payload;
            })
            .addCase(fetchTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
}
);
export default typesSlice.reducer;