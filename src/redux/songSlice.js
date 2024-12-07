import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk để fetch bài hát
export const fetchSongs = createAsyncThunk("songs/fetchSongs", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:8888/api/song/getAllSongs");
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data); // Trả lỗi nếu có
    }
});
export const fetchSongsFromPlaylist = createAsyncThunk(
    'songs/fetchSongsFromPlaylist',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8888/api/playList/getSongFromPlaylist/${id}`,
                { withCredentials: true }
            );
            return response.data; // Danh sách bài hát trả về từ API
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
export const fetchLovedSongs = createAsyncThunk('songs/fetchLovedSongs', async () => {
    try {
        const response = await axios.get('http://localhost:8888/api/song/getLovedSongbyIdAccount', { withCredentials: true, });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message; // Xử lý lỗi
    }
});

export const fetchSongsFromAlbum = createAsyncThunk(
    'songs/fetchSongsFromAlbum',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8888/api/song/getSongByAlbum/${id}`
            );
            return response.data; // Danh sách bài hát trả về từ API
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
export const fetchSongsFromArtist = createAsyncThunk(
    'songs/fetchSongsFromArtist',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8888/api/song/getSongsByIdAccount/${id}`
            );
            return response.data; // Danh sách bài hát trả về từ API
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const addSongToLove = createAsyncThunk(
    'songs/addSongToLove',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8888/api/song/addSongToLove/${id}`,
                { withCredentials: true }
            );
            return response.data; // Danh sách bài hát trả về từ API
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const addSongToAlbum = createAsyncThunk(
    'songs/addSongToAlbum',
    async ({ id_album, id_song }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8888/api/song/addSongtoAlbum',
                {
                    id_album: id_album,
                    id_song: id_song
                },
                { withCredentials: true }
            );
            return response.data; // Danh sách bài hát trả về từ API
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
export const removeSongFromPlaylist = createAsyncThunk(
    'songs/removeSongFromPlaylist',
    async ({ id_playlist, id_song }, { rejectWithValue }) => {
        console.log("id_playlist", id_playlist);
        console.log("id_song", id_song);
        try {
            const response = await axios.post(`http://localhost:8888/api/playList/removeSongFromPlaylist`,
                {
                    id_playlist: id_playlist,
                    id_song: id_song
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            return response.data; // Trả về dữ liệu từ server (có thể là playlist đã được cập nhật)
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); // Trả về lỗi
        }
    }
);
export const addSong = createAsyncThunk(
    'songs/addSong', async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8888/api/song/addSong`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            return response.data; // Trả về dữ liệu từ server (có thể là playlist đã được cập nhật)
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); // Trả về lỗi
        }
    }
)
export const addSongAndImg = createAsyncThunk(
    'songs/addSong', async ({ fileSong, fileImg }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("filePath", fileSong); // file nhạc
            formData.append("imgPath", fileImg);
            const response = await axios.post(`http://localhost:8888/api/song/addSongPathAndImgPath`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            return response.data; // Trả về dữ liệu từ server (có thể là playlist đã được cập nhật)
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); // Trả về lỗi
        }
    }
)

export const fetchSongsFromEmotions = createAsyncThunk(
    'songs/fetchSongsFromEmotions', async (sentence, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8888/api/song/get_emotions", { sentence: sentence }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
// Slice để lưu trữ danh sách bài hát
const songsSlice = createSlice({
    name: "songs",
    initialState: {
        songs: [], // Danh sách bài hát
        currentSong: null, // Thông tin chi tiết bài hát đang phát
        currentPlaylist: null,
        currentAlbum: null,
        currentLovedSong: null,
        currentArtist: null,
        currentEmotion: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setCurrentSong: (state, action) => {
            // Cập nhật thông tin bài hát hiện tại
            state.currentSong = action.payload;
        },
        setCurrentPlaylist: (state, action) => {
            state.currentPlaylist = action.payload;
            state.songs = []
        },
        setCurrentAlbum: (state, action) => {
            state.currentAlbum = action.payload;
            state.songs = []
        },
        setCurrentLovedSong: (state, action) => {
            state.currentLovedSong = action.payload;
            state.songs = []
        },
        setCurrentArtist: (state, action) => {
            state.currentArtist = action.payload;
            state.songs = []
        },
        setCurrentEmotion: (state, action) => {
            state.currentEmotion = action.payload;
            state.songs = []
        }
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
            })
            .addCase(fetchSongsFromPlaylist.pending, (state) => {
                state.isLoading = 'loading';
            })
            .addCase(fetchSongsFromPlaylist.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(fetchSongsFromPlaylist.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchSongsFromAlbum.pending, (state) => {
                state.isLoading = 'loading';
            })
            .addCase(fetchSongsFromAlbum.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(fetchSongsFromAlbum.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchLovedSongs.pending, (state) => {
                state.isLoading = 'loading';
            })
            .addCase(fetchLovedSongs.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(fetchLovedSongs.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchSongsFromArtist.pending, (state) => {
                state.isLoading = 'loading';
            })
            .addCase(fetchSongsFromArtist.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(fetchSongsFromArtist.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.payload;
            })
            .addCase(removeSongFromPlaylist.pending, (state) => {
                state.isLoading = 'loading';
            })
            .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(removeSongFromPlaylist.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchSongsFromEmotions.pending, (state) => {
                state.isLoading = 'loading';
            })
            .addCase(fetchSongsFromEmotions.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(fetchSongsFromEmotions.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.payload;
            })
            .addCase(addSongAndImg.pending, (state) => {
                state.isLoading = 'loading';
            })
            .addCase(addSongAndImg.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(addSongAndImg.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.payload;
            })
            .addCase(addSongToAlbum.pending, (state) => {
                state.isLoading = 'loading';
            })
            .addCase(addSongToAlbum.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(addSongToAlbum.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.payload;
            })
            ;

    },
});

// Export action setCurrentSong để sử dụng trong component
export const { setCurrentSong, setCurrentPlaylist, setCurrentAlbum, setCurrentLovedSong, setCurrentArtist } = songsSlice.actions;
export default songsSlice.reducer;
