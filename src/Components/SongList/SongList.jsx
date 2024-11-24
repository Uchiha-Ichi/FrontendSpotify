import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongs, setCurrentSong } from "../../redux/songSlice";

const SongList = () => {
    const dispatch = useDispatch();
    const { songs, currentSong, isLoading, error } = useSelector((state) => state.song);
    const [audioSrc, setAudioSrc] = useState(null); // state để chứa URL bài hát cần phát

    useEffect(() => {
        dispatch(fetchSongs()); // Lấy danh sách bài hát khi vào trang
    }, [dispatch]);

    const playSong = (songId) => {
        // Tìm bài hát theo ID
        const song = songs.find((s) => s._id === songId);

        if (song) {
            // Tạo URL để phát nhạc
            const downloadUrl = `http://localhost:8000/api/song/getSongById/${songId}`;

            // Cập nhật bài hát đang phát trong Redux store
            dispatch(setCurrentSong(song));

            // Cập nhật URL cho thẻ <audio> phát nhạc
            setAudioSrc(downloadUrl);
        }
    };

    return (
        <div>
            <h1>Danh sách bài hát</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {songs.map((song) => (
                    <li key={song._id}>
                        <div className="song-info">
                            <h3>{song.name_song}</h3>
                            <p>{song.description}</p>
                        </div>
                        <button onClick={() => playSong(song._id)}>Phát nhạc</button>
                    </li>
                ))}
            </ul>

            {/* Nếu có audioSrc, hiển thị player để phát nhạc */}
            {audioSrc && (
                <div>
                    <h2>Đang phát: {currentSong ? currentSong.name_song : 'Bài hát mới'}</h2>
                    {/* Cập nhật key của <audio> để tạo lại thẻ mỗi khi bài hát thay đổi */}
                    <audio key={audioSrc} controls autoPlay>
                        <source src={audioSrc} type="audio/mp3" />
                        Trình duyệt của bạn không hỗ trợ thẻ audio.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default SongList;
