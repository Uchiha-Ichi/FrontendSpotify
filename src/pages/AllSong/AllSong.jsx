import styles from "./AllSong.module.scss"
import Card from '../../Components/Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllArtists } from "../../redux/artistSlice";
import { fetchSongs, setCurrentSong } from "../../redux/songSlice";


function AllSong() {
    const dispatch = useDispatch();

    const artists = useSelector((state) => state.artists.artists);
    const songs = useSelector((state) => state.songs.songs);

    useEffect(() => {
        dispatch(fetchAllArtists());
        dispatch(fetchSongs());
    }, [dispatch]);

    function getArtistName(song) {
        const artist = artists.find(artist => artist._id === song.id_accounts);
        const artistName = artist.account_name;
        return artistName;
    }
    const displayedSongs = songs;
    return (
        <div className={styles.gridContainer}>
            {displayedSongs.map((song) => {
                console.log(song.id_accounts);
                const artistName = getArtistName(song);
                //console.log(artistName);
                return (
                    <Card
                        className={styles.gridCell}
                        key={song._id}
                        title={song.name_song}
                        info={artistName}
                        imgSrc={`/images/${song._id.toString()}.jpg`}
                        onClick={() => dispatch(setCurrentSong(song))}
                    />
                );
            })}
        </div>
    )
}

export default AllSong