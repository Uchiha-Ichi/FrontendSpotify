import styles from "./ArtistAll.module.scss"
import Card from '../../Components/Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllArtists } from "../../redux/artistSlice";
import { setCurrentArtist } from "../../redux/songSlice";
import { useNavigate } from 'react-router-dom';
function ArtistAll() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const artists = useSelector((state) => state.artists.artists);
    useEffect(() => {
        dispatch(fetchAllArtists());
    }, [dispatch]);
    return (
        <div className={styles.gridContainer}>
            {artists.map((artist) => (
                <Card
                    className={styles.gridCell}
                    key={artist._id}
                    title={artist.account_name}
                    info="Artist"
                    imgSrc={`/images/${artist._id.toString()}.jpg`}

                    onClick={() => {
                        dispatch(setCurrentArtist(artist))
                        navigate('/artist');
                    }}
                />
            ))}
        </div>

    )
}
export default ArtistAll