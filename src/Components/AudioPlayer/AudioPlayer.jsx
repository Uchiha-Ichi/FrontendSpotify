import { useRef, useState, useEffect } from "react";
import styles from "./AudioPlayer.module.scss";

const AudioPlayer = ({ audioSrc, handleEnded, handleNext, handleBack }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // useEffect(() => {
    //     const audio = audioRef.current;

    //     const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    //     const handleLoadedMetadata = () => setDuration(audio.duration);

    //     audio.addEventListener("timeupdate", handleTimeUpdate);
    //     audio.addEventListener("loadedmetadata", handleLoadedMetadata);


    //     return () => {
    //         audio.removeEventListener("timeupdate", handleTimeUpdate);
    //         audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    //     };
    // }, []);

    // useEffect(() => {
    //     if (audioRef.current) {
    //         audioRef.current.load();
    //         audioRef.current.play();
    //         setIsPlaying(true);
    //     }
    // }, [audioSrc]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        // Event handlers
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            audio.play(); // Play audio khi metadata đã tải xong
            setIsPlaying(true);
        };

        // Add event listeners
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        // Load và phát audio khi `audioSrc` thay đổi
        audio.load();

        // Cleanup
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [audioSrc]);
    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        audio.currentTime = (e.target.value / 100) * duration;
    };

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    return (
        <div className={styles.mainControl}>
            <div className={styles.mainBtn}>
                <button><img src="../assets/icons/shuffle.svg" alt="" /></button>
                <button onClick={handleBack}><img src="../assets/icons/skip-previous.svg" alt="" /></button>
                <button onClick={togglePlayPause}>
                    <img
                        src={isPlaying ? "../assets/icons/pause.png" : "../assets/icons/play.svg"}
                        alt={isPlaying ? "Pause" : "Play"}
                    />
                </button>
                <button onClick={handleNext}><img src="../assets/icons/skip-next.svg" alt="" /></button>
                <button><img src="../assets/icons/repeat.svg" alt="" /></button>
            </div>
            <div className={styles.mainProgress}>
                <span>{formatTime(currentTime)}</span>
                <label className={`${styles.slider} ${styles.songProgress}`}>
                    <input
                        type="range"
                        className={styles.level}
                        value={(currentTime / duration) * 100 || 0}
                        onChange={handleSeek}
                    />
                </label>
                <span>{formatTime(duration)}</span>
                <audio
                    ref={audioRef}
                    key={audioSrc}
                    preload="auto"
                    onEnded={handleEnded}
                >
                    <source src={audioSrc} type="audio/mp3" />
                    Trình duyệt của bạn không hỗ trợ thẻ audio.
                </audio>
            </div>
        </div>
    );
};

export default AudioPlayer;
