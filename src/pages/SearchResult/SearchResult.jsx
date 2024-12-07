import { useState } from "react";
import Card from '../../components/Card/Card.jsx';
import styles from './SearchResult.module.scss';
import SongContainer from '../../components/SongContainer/SongContainer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong, setCurrentArtist } from "../../redux/songSlice";
import { useNavigate } from 'react-router-dom';
import ThreeDotsBtn from "../../components/ThreeDotsBtn/ThreeDotsBtn.jsx";
import { addSongToPlayList } from "../../redux/playlistSlice";
import { addSongToLove } from "../../redux/songSlice.js";
function SearchResult() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { songs, accounts } = useSelector((state) => state.search);
    const artists = useSelector((state) => state.artists.artists);
    const albums = useSelector((state) => state.albums.albums);
    const playlists = useSelector((state) => state.playlists.playlists);
    const account = useSelector((state) => state.auth.login.currentAccount);

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
        <div className={styles.mainContent}>
            <div className={styles.songResult}>
                <h3>Songs</h3>
                <div className={styles.gridContainer}>
                    <div className={styles.gridHeader}>#</div>
                    <div className={styles.gridHeader}>Title</div>
                    <div className={styles.gridHeader}>Album</div>
                    <div className={styles.gridHeader}>Date Added</div>
                    <div className={styles.gridHeader}><img src="../assets/icons/time.svg" alt="" /></div>
                    <div className={styles.gridHeader}></div>
                    {songs && songs.length > 0 ? (
                        songs.map((song, index) => {
                            return (
                                <>
                                    <div className={styles.gridCell}>{index + 1}</div>
                                    <SongContainer className={styles.gridCell}
                                        imgSrc={`./images/${song._id.toString()}.jpg`} title={song.name_song}
                                        artist={getArtistName(song)}
                                        onClick={() => dispatch(setCurrentSong(song))}
                                    />
                                    <div className={styles.gridCell}>{getAlbumName(song)}</div>
                                    <div className={styles.gridCell}>{formatDate(song.create_date)}</div>
                                    <div className={styles.gridCell}>{timePlay()}</div>
                                    {account ? (
                                        <ThreeDotsBtn options={Options} optionsPlaylist={OptionsPlayList} onOpen={() => setSongThreeDots(song)} class={styles.gridCell} />
                                    ) : (
                                        <div className={styles.gridCell}></div>
                                    )}
                                </>
                            )
                        })
                    ) : (
                        <p>No Songs Found</p>
                    )}

                </div>
            </div>
            <h3>Artist</h3>
            <div className={styles.artistContainer}>
                {accounts && accounts.length > 0 ? (
                    accounts.map((account) => {
                        return (
                            <>
                                <Card
                                    className={styles.gridCell}
                                    key={account._id}
                                    title={account.account_name}
                                    info="Artist"
                                    imgSrc={`./images/${account._id.toString()}.jpg`}

                                    onClick={() => {
                                        dispatch(setCurrentArtist(account))
                                        navigate('/artist');
                                    }}
                                />
                            </>
                        )
                    })
                ) : (
                    <p>No Artist available</p>
                )}
            </div>
        </div>
    )
}
export default SearchResult;