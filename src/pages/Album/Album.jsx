import { useEffect } from "react";
import styles from "./Album.module.scss";
import SongContainer from "../../components/SongContainer/SongContainer.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong, fetchSongsFromAlbum } from "../../redux/songSlice.js";
function Album() {
  const dispatch = useDispatch();
  const { songs, currentAlbum } = useSelector((state) => state.songs);
  const artists = useSelector((state) => state.artists.artists);
  const albums = useSelector((state) => state.albums.albums);
  useEffect(() => {

    dispatch(fetchSongsFromAlbum(currentAlbum._id));
  }, [currentAlbum, dispatch]);

  function getArtistName(song) {
    console.log("song", song);
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
    <div className={styles.mainContent}>
      <div className={styles.header}>
        <img src={`./images/${currentAlbum._id.toString()}.jpg`} alt="Liked Songs" />
        <div className={styles.albumInfo}>
          <span className={styles.moreInfo}>{currentAlbum.name_album} </span>
          <span className={styles.moreInfo}>̣{songs.length} Songs</span>
        </div>
      </div>
      <div>
        <button>
          <img src="../assets/icons/play-color.svg" alt="Play Button" />
        </button>
        <div className={styles.gridContainer}>
          <div className={styles.gridHeader}>#</div>
          <div className={styles.gridHeader}>Title</div>
          <div className={styles.gridHeader}>Album</div>
          <div className={styles.gridHeader}>Date Added</div>
          <div className={styles.gridHeader}><img src="../assets/icons/time.svg" alt="" /></div>
          {songs && songs.length > 0 ? (
            songs.map((song, index) => {
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
                </>
              )
            })
          ) : (
            <p>No albums available</p> // Thông báo nếu không có albums
          )}

        </div>
      </div>
    </div>
  );
}

export default Album;
