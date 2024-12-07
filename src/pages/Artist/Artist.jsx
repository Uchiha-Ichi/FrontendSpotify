import styles from "./Artist.module.scss"
import { useEffect, useState } from "react";
import SongContainer from "../../components/SongContainer/SongContainer.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong, fetchSongsFromArtist } from "../../redux/songSlice";
import ThreeDotsBtn from "../../components/ThreeDotsBtn/ThreeDotsBtn.jsx";
import { addSongToPlayList } from "../../redux/playlistSlice";
import { addSongToLove } from "../../redux/songSlice.js";
function Artist() {
    const dispatch = useDispatch();
    const { songs, currentArtist } = useSelector((state) => state.songs);
    const artists = useSelector((state) => state.artists.artists);
    const albums = useSelector((state) => state.albums.albums);
    const playlists = useSelector((state) => state.playlists.playlists);
    const account = useSelector((state) => state.auth.login.currentAccount);

    useEffect(() => {
        dispatch(fetchSongsFromArtist(currentArtist._id));
    }, [currentArtist, dispatch]);

    let [songThreeDots, setSongThreeDots] = useState(null);
    const Options = [
        { label: 'Add to Playlist', onClick: () => null },
    ];
    const OptionsPlayList = [
        { label: 'Loves', onClick: () => handleClickAddSongToLove(songThreeDots) },
        ...playlists.map((playlist) => ({
            label: playlist.name_playlist,
            onClick: () => handleClickAddSongToPlayList(playlist, songThreeDots),
        }))
    ];

    const handleClickAddSongToPlayList = (playlist, song) => {
        try {
            console.log('song', song);
            dispatch(addSongToPlayList({ id_playlist: playlist._id, id_song: song._id }));
        } catch (e) {
            alert(`${e}`);
        }
    };
    const handleClickAddSongToLove = (song) => {
        try {

            dispatch(addSongToLove(song._id));
        } catch (e) {
            alert(`${e}`);
        }
    };
    function getArtistName(song) {
        const artist = artists.find(artist => artist._id === song.id_accounts);
        const artistName = artist.account_name;
        return artistName;
    }

    function getAlbumName(song) {
        if (song.id_album !== null) {
            const album = albums.find(artist => artist._id === song.id_album);
            const albumName = album.name_album;
            return albumName;
        } else {
            return undefined
        }
    }
    function timePlay() {
        const randomMinutes = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
        const randomSeconds = Math.floor(Math.random() * (59 - 10 + 1)) + 10;
        const formattedSeconds = randomSeconds < 10 ? `0${randomSeconds}` : randomSeconds;
        return `${randomMinutes}:${formattedSeconds}`;
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    return (
        <>
            <div className={styles.heroContent}>
                <img src={`./images/${currentArtist._id.toString()}2.jpg`} alt="Artist" />
                <span className={styles.name}>{currentArtist.account_name}</span>
            </div>
            <div className={styles.mainContent}>
                <img src="../assets/icons/play-color.svg" alt="Play Button" />
                <h1>Popular Song</h1>
                <div className={styles.gridContainer}>
                    <div className={styles.gridHeader}>#</div>
                    <div className={styles.gridHeader}>Title</div>
                    <div className={styles.gridHeader}>Album</div>
                    <div className={styles.gridHeader}>Date Added</div>
                    <div className={styles.gridHeader}><img src="../assets/icons/time.svg" alt="" /></div>
                    <div className={styles.gridHeader}></div>
                    {songs && songs.length > 0 ? (
                        songs.map((song, index) => {
                            console.log(song, index);
                            return (
                                <>
                                    <div className={styles.gridCell}>{index + 1}</div>
                                    <SongContainer className={styles.gridCell}
                                        imgSrc={`./images/${song._id.toString()}.jpg`}
                                        title={song.name_song}
                                        artist={getArtistName(song)}
                                        onClick={() => dispatch(setCurrentSong(song))}
                                    />
                                    <div className={styles.gridCell}>{getAlbumName(song)}</div>
                                    <div className={styles.gridCell}>{formatDate(song.create_date)}</div>
                                    <div className={styles.gridCell}>{timePlay()}</div>
                                    {account ? (
                                        <ThreeDotsBtn options={Options} optionsPlaylist={OptionsPlayList} onOpen={() => setSongThreeDots(song)} class={styles.gridCell} />
                                    ) : (
                                        <div></div>
                                    )}
                                </>
                            )
                        })
                    ) : (
                        <p>No playlists available</p> // Thông báo nếu không có playlists
                    )}

                </div>


            </div>
        </>
    )
}
export default Artist