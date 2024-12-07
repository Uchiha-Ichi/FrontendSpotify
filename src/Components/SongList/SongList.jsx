import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongs, setCurrentSong } from "../../redux/songSlice";

const SongList = () => {
    const dispatch = useDispatch();
    const { songs, currentSong, isLoading, error } = useSelector((state) => state.song);
    const [audioSrc, setAudioSrc] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        dispatch(fetchSongs()); // Lấy danh sách bài hát khi vào trang
    }, [dispatch]);

    const playSong = (songId) => {
        // Tìm bài hát theo ID
        const song = songs.find((s) => s._id === songId);

        if (song) {
            // Tạo URL để phát nhạc
            const downloadUrl = `http://localhost:8888/api/song/getSongById/${songId}`;
            const imgUrl = `http://localhost:8888/api/song/getImageById/${songId}`;
            // Cập nhật bài hát đang phát trong Redux store
            dispatch(setCurrentSong(song));
            // Cập nhật URL cho thẻ <audio> phát nhạc
            setAudioSrc(downloadUrl);
            setImgSrc(imgUrl);
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
            {audioSrc && currentSong && (
                <div>
                    <h2>Đang phát: {currentSong.name_song}</h2>
                    {imgSrc && (
                        <img
                            src={imgSrc}
                            alt="Album cover"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    )}
                    {/* Cập nhật key của <audio> để tạo lại thẻ mỗi khi bài hát thay đổi */}
                    <audio key={audioSrc} controls autoPlay loop
                        preload="auto">
                        <source src={audioSrc} type="audio/mp3" />
                        Trình duyệt của bạn không hỗ trợ thẻ audio.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default SongList;
