import { useState, useEffect } from "react"
import styles from "./Player.module.scss"
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong } from "../../redux/songSlice";
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";
import { Link } from 'react-router-dom';


function Player() {
    const { currentSong, songs } = useSelector((state) => state.songs);
    const artists = useSelector((state) => state.artists.artists);
    const [audioSrc, setAudioSrc] = useState(null);
    const dispatch = useDispatch();
    // const [imgSrc, setImgSrc] = useState(null);
    useEffect(() => {
        if (currentSong) {
            const songId = currentSong._id;
            console.log("songId: " + songId);
            const downloadUrl = `http://localhost:8888/api/song/getSongById/${songId}`;
            //const imgUrl = `http://localhost:8888/api/song/getImageById/${songId}`;
            setAudioSrc(downloadUrl);
            //setImgSrc(imgUrl);
        }
    }, [currentSong]);

    function getArtistName(song) {

        const artist = artists.find(artist => artist._id === song.id_accounts);
        const artistName = artist.account_name;
        return artistName;
    }
    if (!currentSong) {
        return <div>Chưa chọn bài hát</div>;
    }
    const handleEnded = () => {
        const currentIndex = songs.findIndex((song) => song._id === currentSong._id);
        const nextIndex = currentIndex + 1; // Lấy bài tiếp theo

        if (nextIndex < songs.length) {
            // Nếu có bài tiếp theo trong playlist
            dispatch(setCurrentSong(songs[nextIndex])); // Cập nhật bài hát tiếp theo
        } else {
            // Nếu là bài hát cuối cùng, dừng nhạc
            const audio = document.getElementById('audio-player');
            audio.pause(); // Dừng nhạc
            audio.currentTime = 0; // Đặt lại thời gian phát
        }
    }
    const handleBack = () => {
        const currentIndex = songs.findIndex((song) => song._id === currentSong._id);
        const backIndex = currentIndex - 1;

        if (backIndex !== -1) {
            dispatch(setCurrentSong(songs[backIndex]));
        }
    }
    const handleNext = () => {
        const currentIndex = songs.findIndex((song) => song._id === currentSong._id);
        const nextIndex = currentIndex + 1;
        console.log(nextIndex);
        if (nextIndex < songs.length) {

            dispatch(setCurrentSong(songs[nextIndex]));
        } else {
            // Nếu là bài hát cuối cùng, dừng nhạc
            const audio = document.getElementById('audio-player');
            audio.pause(); // Dừng nhạc
            audio.currentTime = 0;
        }
    }
    return (
        <div className={styles.player}>
            <div className={styles.playerLeft}>
                <div className={styles.songContainer}>
                    <img className={styles.songImg}
                        src={`/images/${currentSong._id.toString()}.jpg`} alt="" />
                    <div className={styles.songInfo}>
                        <span>{currentSong.name_song}</span>
                        <span id={styles.artist} >{getArtistName(currentSong)}</span>
                    </div>
                    {/* <button><img src="../assets/icons/like.svg" alt="" /></button> */}
                </div>
            </div>
            {/* <div className={styles.mainControl}>
                <div className={styles.mainBtn}>
                    <button><img src="../assets/icons/shuffle.svg" alt="" /></button>
                    <button><img src="../assets/icons/skip-previous.svg" alt="" /></button>
                    <button><img src="../assets/icons/play.svg" alt="" /></button>
                    <button><img src="../assets/icons/skip-next.svg" alt="" /></button>
                    <button><img src="../assets/icons/repeat.svg" alt="" /></button>
                </div>
                <div className={styles.mainProgress}>
                    2:11
                    <label className={`${styles.slider} ${styles.songProgress}`}>
                        <input type="range" className={styles.level} />
                    </label>
                    2:50
                    <audio key={audioSrc} controls autoPlay loop={false} onEnded={handleEnded}
                        preload="auto">
                        <source src={audioSrc} type="audio/mp3" />
                        Trình duyệt của bạn không hỗ trợ thẻ audio.
                    </audio>   
                </div>
            </div>  */}
            <AudioPlayer audioSrc={audioSrc} handleEnded={handleEnded} handleNext={handleNext} handleBack={handleBack}></AudioPlayer>
            <div className={styles.playerRight}>
                <button><img src="../assets/icons/queue.svg" alt="" /></button>
                <Link to="/lyrics"><img width="24px" height="24px" src="../assets/icons/lyrics.svg" alt="" /></Link>
                <img src="../assets/icons/speaker.svg" alt="" />
                <label className={styles.slider}>
                    <input type="range" className={styles.level} />
                </label>
            </div>
        </div>
    )
}

export default Player