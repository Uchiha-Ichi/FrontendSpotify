import { useState, useRef, useEffect } from "react";
import styles from "./Playlist.module.scss";
import SongContainer from "../../components/SongContainer/SongContainer.jsx";
import CenterPopup from "../../components/CenterPopup/CenterPopup.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong, fetchSongsFromPlaylist, removeSongFromPlaylist } from "../../redux/songSlice";
import { fetchPlaylists } from "../../redux/playlistSlice";
import ThreeDotsBtn from "../../components/ThreeDotsBtn/ThreeDotsBtn.jsx";
import { addSongToPlayList, changeNamePlaylist } from "../../redux/playlistSlice";
import { addSongToLove } from "../../redux/songSlice.js";
function Playlist() {
  const dispatch = useDispatch();
  const { songs, currentPlaylist } = useSelector((state) => state.songs);
  const artists = useSelector((state) => state.artists.artists);
  const albums = useSelector((state) => state.albums.albums);
  const playlists = useSelector((state) => state.playlists.playlists);
  let playListName = currentPlaylist.name_playlist.toString();
  const [name, setName] = useState(playListName);
  const [originalName, setOriginalName] = useState(playListName);
  const [isEditing, setIsEditing] = useState(false);
  // const popupRef = useRef(null);
  let [songThreeDots, setSongThreeDots] = useState(null);
  // const [triggerEffect, setTriggerEffect] = useState(false);
  const Options = [
    { label: 'Add to Playlist', onClick: () => null },
    { label: 'Remove from this playlist', onClick: () => handleRemoveSongFromPlaylist(songThreeDots) },
  ];
  const OptionsPlayList = [
    { label: 'Loves', onClick: () => handleClickAddSongToLove(songThreeDots) },
    ...playlists.map((playlist) => ({
      label: playlist.name_playlist,
      onClick: () => handleClickAddSongToPlayList(playlist, songThreeDots),
    }))
  ];

  const handleRemoveSongFromPlaylist = (song) => {
    try {
      if (!song._id) {
        alert('Please select a song');
      }
      dispatch(removeSongFromPlaylist({ id_playlist: currentPlaylist._id, id_song: song._id }));
    } catch (e) {
      alert(`${e}`);
    }
  }

  const handleClickAddSongToPlayList = (playlist, song) => {
    try {
      if (playlist !== currentPlaylist) {
        console.log('song', song);
        dispatch(addSongToPlayList({ id_playlist: playlist._id, id_song: song._id }));
      }
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



  useEffect(() => {
    const playlist = playlists.find(playlist => playlist._id === currentPlaylist._id);

    if (playlist) {
      setName(playlist.name_playlist);
      setOriginalName(playlist.name_playlist)
    }

    dispatch(fetchSongsFromPlaylist(currentPlaylist._id));
    // const handleClickOutside = (e) => {
    //   // console.log('Clicked outside, closing popup');
    //   if (popupRef.current &&
    //     !popupRef.current.contains(e.target)
    //   ) {
    //     console.log('Clicked outside, closing popup');
    //     handleCancel();
    //   }
    // };
    // document.addEventListener('mousedown', handleClickOutside);

    // return () => {
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };
  }, [currentPlaylist]);

  const handleClick = () => {
    setOriginalName(name);
    setIsEditing(true);
  };

  const handleSave = async () => {
    //dispatchchangename
    const idPlaylist = currentPlaylist._id
    await dispatch(changeNamePlaylist({ playlistName: name, playlist_id: idPlaylist }))
    await dispatch(fetchPlaylists());
    // setTriggerEffect((prev) => !prev);
    setIsEditing(false);
  };


  const handleCancel = () => {
    setIsEditing(false);
    setName(originalName);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };
  function getArtistName(song) {

    const artist = artists.find(artist => artist._id === song.id_accounts);
    const artistName = artist.account_name;
    return artistName;
  }
  function getAlbumName(song) {
    if (song.id_album !== null) {
      const album = albums.find(artist => artist._id === song.id_album);
      if (album) {
        return album.name_album; // Trả về name_album nếu album tồn tại
      }
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
        <img src="../assets/img/playlist.png" alt="Liked Songs" />
        <div className={styles.playlistInfo}>
          <span className={styles.moreInfo}>Playlist </span>
          <h1 onClick={handleClick}>{name}</h1>
          <span className={styles.moreInfo}>̣{songs.length} Songs</span>
        </div>
        {isEditing && (
          <CenterPopup
            name={name}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        )}

        {isEditing && <div onClick={handleCancel}></div>}
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
          <div></div>
          {songs && songs.length > 0 ? (
            songs.map((song, index) => {
              return (
                <>
                  <div className={styles.gridCell} >{index + 1}</div>
                  <SongContainer className={styles.gridCell}
                    imgSrc={`./images/${song._id.toString()}.jpg`}
                    title={song.name_song}
                    artist={getArtistName(song)}
                    onClick={() => dispatch(setCurrentSong(song))}
                  />
                  <div className={styles.gridCell}>{getAlbumName(song)}</div>
                  <div className={styles.gridCell}>{formatDate(song.create_date)}</div>
                  <div className={styles.gridCell}>{timePlay()}</div>
                  <ThreeDotsBtn options={Options} optionsPlaylist={OptionsPlayList} onOpen={() => setSongThreeDots(song)} class={styles.gridCell} />
                </>
              )
            })
          ) : (
            <p></p> // Thông báo nếu không có playlists
          )}

        </div>
      </div>
    </div>
  );
}

export default Playlist;
