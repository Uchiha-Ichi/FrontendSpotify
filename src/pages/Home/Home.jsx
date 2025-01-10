import styles from './Home.module.scss';
import Card from '../../Components/Card/Card.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllArtists } from "../../redux/artistSlice";
import { fetchSongs, fetchSongsForAccount, setCurrentSong, setCurrentArtist, setCurrentAlbum } from "../../redux/songSlice";
import { Link, useNavigate } from 'react-router-dom';
import { fetchAlbums } from "../../redux/albumSlice";
import { fetchTypes } from "../../redux/typeSilce";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const artists = useSelector((state) => state.artists.artists);
    const songs = useSelector((state) => state.songs.songs);
    const albums = useSelector((state) => state.albums.albums);
    const account = useSelector((state) => state.auth.login.currentAccount);

    useEffect(() => {
        if (account) {
            console.log(account.account_name)
            dispatch(fetchSongsForAccount(() => {
                console.log(songs)
            }));
        } else {
            dispatch(fetchSongs());
        }
        dispatch(fetchAllArtists());
        dispatch(fetchAlbums());
        dispatch(fetchTypes());
    }, [dispatch, account]);

    function getArtistName(song) {

        const artist = artists.find(artist => artist._id === song.id_accounts);
        const artistName = artist.account_name;
        return artistName;
    }
    function getArtistNamealbum(album) {

        const artist = artists.find(artist => artist._id === album.id_account);
        const artistName = artist.account_name;
        return artistName;
    }

    let displayedArtists = artists.slice(0, 7);
    let displayedSongs = songs.slice(0, 7);

    return (
        <div className={styles.mainContent}>
            <div className={styles.container}>
                <div className={styles.containerInfo}>
                    <h3>Top Artist</h3>
                    <Link to="/artist/all" className={styles.link}>Show All</Link>
                </div>
                <div className={styles.gridContainer}>
                    {displayedArtists.map((artist) => (
                        <Card
                            className={styles.gridCell}
                            key={artist._id}
                            title={artist.account_name}
                            info="Artist"
                            imgSrc={`./images/${artist._id.toString()}.jpg`}
                            onClick={() => {
                                dispatch(setCurrentArtist(artist))
                                navigate('/artist');
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.containerInfo}>
                    <h3>Top Song</h3>
                    <Link to="song/all" className={styles.link}>Show All</Link>
                </div>
                <div className={styles.gridContainer}>
                    {displayedSongs.map((song) => {
                        const artistName = getArtistName(song);
                        return (
                            <Card
                                className={styles.gridCell}
                                key={song._id}
                                title={song.name_song}
                                info={artistName}
                                imgSrc={`./images/${song._id.toString()}.jpg`}
                                onClick={() => dispatch(setCurrentSong(song))}
                            />
                        );
                    })}
                </div>

                <div className={styles.container}>
                    <div className={styles.containerInfo}>
                        <h3>Top Album</h3>
                        <Link to="album/all" className={styles.link}>Show All</Link>
                    </div>
                    <div className={styles.gridContainer}>
                        {albums.map((album) => {
                            // const artistName = getArtistName(album);
                            return (
                                <Card
                                    className={styles.gridCell}
                                    key={album._id}
                                    title={album.name_album}
                                    info={getArtistNamealbum(album)}
                                    imgSrc={`./images/${album._id.toString()}.jpg`}

                                    onClick={() => {
                                        dispatch(setCurrentAlbum(album));
                                        navigate('/album');
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
